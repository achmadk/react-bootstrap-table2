/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

class TextAreaEditor extends Component {
  componentDidMount() {
    const { defaultValue, didMount, autoSelectText } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
    if (autoSelectText) this.text.select();
    if (didMount) didMount();
  }

  getValue() {
    return this.text.value;
  }

  handleKeyDown = (e) => {
    const { onKeyDown } = this.props;
    if (e.keyCode === 13 && !e.shiftKey) return;
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  render() {
    const {
      defaultValue, didMount, className, autoSelectText, ...rest
    } = this.props;
    const editorClass = cs('form-control editor edit-textarea', className);
    return (
      <textarea
        ref={ (node) => this.text = node }
        type="textarea"
        className={ editorClass }
        { ...rest }
        onKeyDown={ this.handleKeyDown }
      />
    );
  }
}

TextAreaEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onKeyDown: PropTypes.func,
  autoSelectText: PropTypes.bool,
  didMount: PropTypes.func
};
TextAreaEditor.defaultProps = {
  className: '',
  defaultValue: '',
  autoSelectText: false,
  onKeyDown: undefined,
  didMount: undefined
};
export default TextAreaEditor;
