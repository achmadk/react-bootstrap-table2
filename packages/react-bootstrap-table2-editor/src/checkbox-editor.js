/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-return-assign: 0 */
import React, { Component, createRef } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class CheckBoxEditor extends Component {
  checkbox = createRef()

  constructor(props) {
    super(props);
    this.state = {
      checked: props.defaultValue.toString() === props.value.split(':')[0]
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      checked: props.defaultValue.toString() === props.value.split(':')[0]
    };
  }

  componentDidMount() {
    const { didMount } = this.props;
    this.checkbox.current?.focus();
    if (didMount) didMount();
  }

  handleChange = (e) => {
    const { onChange } = this.props;
    if (onChange) onChange(e);
    const { target } = e;
    this.setState(() => ({ checked: target.checked }));
  }

  getValue() {
    const { value } = this.props;
    const [positive, negative] = value.split(':');
    return this.checkbox.current?.checked ? positive : negative;
  }

  render() {
    const {
      defaultValue, didMount, className, ...rest
    } = this.props;
    const { checked } = this.state;
    const editorClass = cs('editor edit-chseckbox checkbox', className);
    return (
      <input
        ref={ this.checkbox }
        type="checkbox"
        className={ editorClass }
        { ...rest }
        checked={ checked }
        onChange={ this.handleChange }
      />
    );
  }
}

CheckBoxEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  value: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  didMount: PropTypes.func
};
CheckBoxEditor.defaultProps = {
  className: '',
  value: 'on:off',
  defaultValue: false,
  onChange: undefined,
  didMount: undefined
};
export default CheckBoxEditor;
