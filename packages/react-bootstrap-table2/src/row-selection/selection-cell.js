/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import _ from '../utils';
import { BootstrapContext } from '../contexts/bootstrap';

class SelectionCell extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      rowIndex, selected, disabled, rowKey, tabIndex, selectColumnStyle
    } = this.props;
    const shouldUpdate = rowIndex !== nextProps.rowIndex
      || selected !== nextProps.selected
      || disabled !== nextProps.disabled
      || rowKey !== nextProps.rowKey
      || tabIndex !== nextProps.tabIndex
      || selectColumnStyle !== nextProps.selectColumnStyle;

    return shouldUpdate;
  }

  handleClick = (e) => {
    const {
      mode: inputType,
      rowKey,
      selected,
      onRowSelect,
      disabled,
      rowIndex
    } = this.props;
    e.stopPropagation();
    if (disabled) return;

    const checked = inputType === Const.ROW_SELECT_SINGLE
      ? true
      : !selected;

    onRowSelect(rowKey, checked, rowIndex, e);
  }

  render() {
    const {
      rowKey,
      mode: inputType,
      selected,
      disabled,
      tabIndex,
      rowIndex,
      selectionRenderer,
      selectColumnStyle
    } = this.props;

    const attrs = {};
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    attrs.style = _.isFunction(selectColumnStyle)
      ? selectColumnStyle({
        checked: selected,
        disabled,
        rowIndex,
        rowKey
      })
      : selectColumnStyle;

    return (
      <BootstrapContext.Consumer>
        {
          ({ bootstrap4 }) => (
            <td className="selection-cell" onClick={ this.handleClick } { ...attrs }>
              {
                selectionRenderer ? selectionRenderer({
                  mode: inputType,
                  checked: selected,
                  disabled,
                  rowIndex,
                  rowKey
                }) : (
                  <input
                    type={ inputType }
                    checked={ selected }
                    disabled={ disabled }
                    className={ bootstrap4 ? 'selection-input-4' : '' }
                    onChange={ () => {} }
                  />
                )
              }
            </td>
          )
        }
      </BootstrapContext.Consumer>
    );
  }
}

SelectionCell.propTypes = {
  mode: PropTypes.string.isRequired,
  rowKey: PropTypes.any,
  selected: PropTypes.bool,
  onRowSelect: PropTypes.func,
  disabled: PropTypes.bool,
  rowIndex: PropTypes.number,
  tabIndex: PropTypes.number,
  clickToSelect: PropTypes.bool,
  selectionRenderer: PropTypes.func,
  selectColumnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

export default SelectionCell;
