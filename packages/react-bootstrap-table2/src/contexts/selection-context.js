/* eslint camelcase: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import _ from '../utils';

import dataOperator from '../store/operators';
import { getSelectionSummary } from '../store/selection';

const SelectionContext = React.createContext();
class SelectionProvider extends React.Component {
  constructor(props) {
    super(props);
    // this.selected = props.selectRow.selected || [];
    this.state = {
      selected: props?.selectRow?.selected ?? []
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      selected: nextProps?.selectRow?.selected ?? []
    };
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  componentDidUpdate(nextProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (nextProps.selectRow !== this.props?.selectRow) {
      // this.selected = nextProps.selectRow.selected || this.selected;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(({ selected }) => ({
        selected: nextProps?.selectRow?.selected ?? selected
      }));
    }
  }

  // exposed API
  getSelected() {
    // return this.selected;
    // eslint-disable-next-line react/destructuring-assignment
    return this.state.selected;
  }

  handleRowSelect = (rowKey, checked, rowIndex, e) => {
    const { data, keyField, selectRow: { mode, onSelect } } = this.props;
    const { selected } = this.state;
    const { ROW_SELECT_SINGLE } = Const;

    // let currSelected = [...this.selected];
    let currSelected = [...selected];

    let result = true;
    if (onSelect) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      result = onSelect(row, checked, rowIndex, e);
    }

    if (result === true || result === undefined) {
      if (mode === ROW_SELECT_SINGLE) { // when select mode is radio
        currSelected = [rowKey];
      } else if (checked) { // when select mode is checkbox
        currSelected.push(rowKey);
      } else {
        currSelected = currSelected.filter((value) => value !== rowKey);
      }
    }
    // this.selected = currSelected;
    this.setState({
      selected: currSelected
    }, () => {
      this.forceUpdate();
    });
  }

  handleAllRowsSelect = (e, isUnSelect) => {
    const {
      data,
      keyField,
      selectRow: {
        onSelectAll,
        nonSelectable
      }
    } = this.props;
    // const { selected } = this;
    const { selected } = this.state;

    let currSelected;

    if (!isUnSelect) {
      currSelected = selected.concat(dataOperator.selectableKeys(data, keyField, nonSelectable));
    } else {
      currSelected = selected.filter((s) => typeof data.find((d) => _.get(d, keyField) === s) === 'undefined');
    }

    let result;
    if (onSelectAll) {
      result = onSelectAll(
        !isUnSelect,
        dataOperator.getSelectedRows(
          data,
          keyField,
          isUnSelect ? selected : currSelected
        ),
        e
      );
      if (Array.isArray(result)) {
        currSelected = result;
      }
    }
    // this.selected = currSelected;
    this.setState({
      selected: currSelected
    }, () => {
      this.forceUpdate();
    });
  }

  render() {
    const {
      data, keyField, selectRow, children
    } = this.props;
    const { selected } = this.state;
    const {
      allRowsSelected,
      allRowsNotSelected
    } = getSelectionSummary(
      data,
      keyField,
      selected
    );

    let checkedStatus;

    // checkbox status depending on selected rows counts
    if (allRowsSelected) checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
    else if (allRowsNotSelected) checkedStatus = Const.CHECKBOX_STATUS_UNCHECKED;
    else checkedStatus = Const.CHECKBOX_STATUS_INDETERMINATE;

    return (
      <SelectionContext.Provider
        value={ {
          ...selectRow,
          // selected: this.selected,
          selected,
          onRowSelect: this.handleRowSelect,
          onAllRowsSelect: this.handleAllRowsSelect,
          allRowsSelected,
          allRowsNotSelected,
          checkedStatus
        } }
      >
        { children }
      </SelectionContext.Provider>
    );
  }
}

SelectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired
};

export default {
  Provider: SelectionProvider,
  Consumer: SelectionContext.Consumer
};
