/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpandCell extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      rowIndex, expanded, rowKey, tabIndex
    } = this.props;
    const shouldUpdate = rowIndex !== nextProps.rowIndex
      || expanded !== nextProps.expanded
      || rowKey !== nextProps.rowKey
      || tabIndex !== nextProps.tabIndex;

    return shouldUpdate;
  }

  handleClick = (e) => {
    const {
      rowKey, expanded, onRowExpand, rowIndex
    } = this.props;
    e.stopPropagation();
    onRowExpand(rowKey, !expanded, rowIndex, e);
  }

  render() {
    const {
      expanded, expandable, expandColumnRenderer, tabIndex, rowKey
    } = this.props;
    const attrs = {};
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    return (
      <td className="expand-cell" onClick={ this.handleClick } { ...attrs }>
        {
          expandColumnRenderer ? expandColumnRenderer({
            expandable,
            expanded,
            rowKey
          }) : (expandable ? (expanded ? '(-)' : '(+)') : '')
        }
      </td>
    );
  }
}

ExpandCell.propTypes = {
  rowKey: PropTypes.any,
  expanded: PropTypes.bool.isRequired,
  expandable: PropTypes.bool.isRequired,
  onRowExpand: PropTypes.func.isRequired,
  expandColumnRenderer: PropTypes.func,
  rowIndex: PropTypes.number,
  tabIndex: PropTypes.number
};

export default ExpandCell;
