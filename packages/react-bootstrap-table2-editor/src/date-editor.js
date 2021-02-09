/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-return-assign: 0 */
import React, { Component, createRef } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class DateEditor extends Component {
  date = createRef()

  componentDidMount() {
    const { defaultValue, didMount } = this.props;
    this.date.current.valueAsDate = new Date(defaultValue);
    this.date.current.focus();
    if (didMount) didMount();
  }

  getValue() {
    return this.date.curent?.value;
  }

  render() {
    const {
      defaultValue, didMount, className, ...rest
    } = this.props;
    const editorClass = cs('form-control editor edit-date', className);
    return (
      <input
        ref={ this.date }
        type="date"
        className={ editorClass }
        { ...rest }
      />
    );
  }
}

DateEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.string,
  didMount: PropTypes.func
};
DateEditor.defaultProps = {
  className: '',
  defaultValue: '',
  didMount: undefined
};
export default DateEditor;
