/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint react/require-default-props: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
/* eslint camelcase: 0 */
import React, { Component, createRef } from 'react';
import { PropTypes } from 'prop-types';

import { LIKE, EQ } from '../comparison';
import { FILTER_TYPE, FILTER_DELAY } from '../const';

function getDefaultValue(props) {
  if (props.filterState && typeof props.filterState.filterVal !== 'undefined') {
    return props.filterState.filterVal;
  }
  return props.defaultValue;
}

class TextFilter extends Component {
  inputRef = createRef()

  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      value: getDefaultValue(props)
    };
  }

  componentDidMount() {
    const { onFilter, getFilter, column } = this.props;
    const defaultValue = this.inputRef.current.value;

    if (defaultValue) {
      onFilter(column, FILTER_TYPE.TEXT, true)(defaultValue);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal) => {
        this.setState(() => ({ value: filterVal }));
        onFilter(column, FILTER_TYPE.TEXT)(filterVal);
      });
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  componentDidUpdate(prevProps) {
    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.applyFilter(this.props.defaultValue);
    }
  }

  componentWillUnmount() {
    this.cleanTimer();
  }

  handleClick = (e) => {
    const { onClick } = this.props;
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  }

  filter = (e) => {
    const { onFilter, column, delay } = this.props;
    e.stopPropagation();
    this.cleanTimer();
    const filterValue = e.target.value;
    this.setState(() => ({ value: filterValue }));
    this.timeout = setTimeout(() => {
      onFilter(column, FILTER_TYPE.TEXT)(filterValue);
    }, delay);
  }

  cleanTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  applyFilter(filterText) {
    const { onFilter, column } = this.props;
    this.setState(() => ({ value: filterText }));
    onFilter(column, FILTER_TYPE.TEXT)(filterText);
  }

  cleanFiltered() {
    const { defaultValue: value, onFilter, column } = this.props;
    this.setState(() => ({ value }));
    onFilter(column, FILTER_TYPE.TEXT)(value);
  }

  render() {
    const {
      id,
      placeholder,
      column: { dataField, text },
      style,
      className,
      onFilter,
      caseSensitive,
      defaultValue,
      getFilter,
      filterState,
      ...rest
    } = this.props;
    const { value } = this.state;

    const elmId = `text-filter-column-${dataField}${id ? `-${id}` : ''}`;

    return (
      <label
        className="filter-label"
        htmlFor={ elmId }
      >
        <span className="sr-only">
          Filter by
          {text}
        </span>
        <input
          { ...rest }
          // ref={ (n) => this.input = n }
          ref={ this.inputRef }
          type="text"
          id={ elmId }
          className={ `filter text-filter form-control ${className}` }
          style={ style }
          onChange={ this.filter }
          onClick={ this.handleClick }
          placeholder={ placeholder || `Enter ${text}...` }
          value={ value }
        />
      </label>
    );
  }
}

TextFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  id: PropTypes.string,
  filterState: PropTypes.object,
  comparator: PropTypes.oneOf([LIKE, EQ]),
  defaultValue: PropTypes.string,
  delay: PropTypes.number,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  caseSensitive: PropTypes.bool,
  getFilter: PropTypes.func
};

TextFilter.defaultProps = {
  delay: FILTER_DELAY,
  filterState: {},
  defaultValue: '',
  caseSensitive: false,
  id: null
};

export default TextFilter;
