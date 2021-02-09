/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
/* eslint camelcase: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import dataOperator from '../store/operators';
import _ from '../utils';

const RowExpandContext = React.createContext();

class RowExpandProvider extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    expanded: this.props.expandRow.expanded || [],
    // eslint-disable-next-line react/destructuring-assignment
    isClosing: this.props.expandRow.isClosing || []
  };

  static getDerivedStateFromProps(props) {
    return {
      expanded: props?.expandRow?.expanded ?? [],
      isClosing: props?.expandRow?.isClosing ?? []
    };
  }

  componentDidUpdate() {
    const { expanded } = this.state;
    if (this.props.expandRow) {
      let nextExpanded = [...(this.props?.expandRow?.expanded ?? expanded)];
      const { nonExpandable = [] } = this.props.expandRow;
      nextExpanded = nextExpanded.filter((rowId) => !_.contains(nonExpandable, rowId));
      const isClosing = expanded.reduce((acc, cur) => {
        if (!_.contains(nextExpanded, cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      this.setState(() => ({
        expanded: nextExpanded,
        isClosing
      }));
    } else {
      this.setState(() => ({
        expanded
      }));
    }
  }

  onClosed = (closedRow) => {
    // eslint-disable-next-line max-len
    this.setState(({ isClosing }) => ({ isClosing: isClosing.filter((value) => value !== closedRow) }));
  };

  handleRowExpand = (rowKey, expanded, rowIndex, e) => {
    const { expanded: expandedState, isClosing: isClosingState } = this.state;
    const { data, keyField, expandRow: { onExpand, onlyOneExpanding, nonExpandable } } = this.props;
    if (nonExpandable && _.contains(nonExpandable, rowKey)) {
      return;
    }

    let currExpanded = [...expandedState];
    let isClosing = [...isClosingState];

    if (expanded) {
      if (onlyOneExpanding) {
        isClosing = isClosing.concat(currExpanded);
        currExpanded = [rowKey];
      } else currExpanded.push(rowKey);
    } else {
      isClosing.push(rowKey);
      currExpanded = currExpanded.filter((value) => value !== rowKey);
    }

    if (onExpand) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      onExpand(row, expanded, rowIndex, e);
    }
    this.setState(() => ({ expanded: currExpanded, isClosing }));
  };

  handleAllRowExpand = (e, expandAll) => {
    const {
      data,
      keyField,
      expandRow: {
        onExpandAll,
        nonExpandable
      }
    } = this.props;
    const { expanded } = this.state;

    let currExpanded;

    if (expandAll) {
      currExpanded = expanded.concat(dataOperator.expandableKeys(data, keyField, nonExpandable));
    } else {
      currExpanded = expanded.filter((s) => typeof data.find((d) => _.get(d, keyField) === s) === 'undefined');
    }

    if (onExpandAll) {
      onExpandAll(expandAll, dataOperator.getExpandedRows(data, keyField, currExpanded), e);
    }

    this.setState(() => ({ expanded: currExpanded }));
  };

  render() {
    const {
      data, keyField, expandRow, children
    } = this.props;
    const { expanded, isClosing } = this.state;
    return (
      <RowExpandContext.Provider
        value={ {
          ...expandRow,
          nonExpandable: expandRow.nonExpandable,
          expanded,
          isClosing,
          onClosed: this.onClosed,
          isAnyExpands: dataOperator.isAnyExpands(data, keyField, expanded),
          onRowExpand: this.handleRowExpand,
          onAllRowExpand: this.handleAllRowExpand
        } }
      >
        { children }
      </RowExpandContext.Provider>
    );
  }
}

RowExpandProvider.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired
};

export default {
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer
};
