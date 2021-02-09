/* eslint-disable prefer-rest-params */
/* eslint camelcase: 0 */
/* eslint no-return-assign: 0 */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';

function handleDebounce(func, wait, immediate) {
  let timeout;

  return () => {
    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(this, arguments);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait || 0);

    if (callNow) {
      func.appy(this, arguments);
    }
  };
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.searchText
    };
    this.inputRef = createRef();
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  static getDerivedStateFromProps(props, state) {
    if (props.searchText !== state.searchText) {
      return { value: props.searchText };
    }
    return null;
  }

  onChangeValue = (e) => {
    this.setState({ value: e.target.value });
  }

  onKeyup = () => {
    const { delay, onSearch } = this.props;
    const debounceCallback = handleDebounce(() => {
      onSearch(this.inputRef.current?.value ?? '');
    }, delay);
    debounceCallback();
  }

  render() {
    const {
      className,
      style,
      placeholder,
      tableId,
      srText
    } = this.props;
    const { value } = this.state;

    return (
      <label
        htmlFor={ `search-bar-${tableId}` }
        className="search-label"
      >
        <span id={ `search-bar-${tableId}-label` } className="sr-only">
          { srText }
        </span>
        <input
          ref={ this.inputRef }
          id={ `search-bar-${tableId}` }
          type="text"
          style={ style }
          aria-labelledby={ `search-bar-${tableId}-label` }
          onKeyUp={ () => this.onKeyup() }
          onChange={ this.onChangeValue }
          className={ `form-control ${className}` }
          value={ value }
          placeholder={ placeholder || SearchBar.defaultProps.placeholder }
        />
      </label>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  delay: PropTypes.number,
  searchText: PropTypes.string,
  tableId: PropTypes.string,
  srText: PropTypes.string
};

SearchBar.defaultProps = {
  className: '',
  style: {},
  placeholder: 'Search',
  delay: 250,
  searchText: '',
  tableId: '0',
  srText: 'Search this table'
};

export default SearchBar;
