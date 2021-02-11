/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import { filters } from './filter';
import { LIKE, EQ } from './comparison';
import { FILTER_TYPE } from './const';

export default (
  _,
  isRemoteFiltering,
  handleFilterChange
) => {
  const FilterContext = React.createContext();

  class FilterProvider extends React.Component {
    constructor(props) {
      super(props);
      this.currFilters = {};
      this.clearFilters = {};
      this.isEmitDataChange = false;
    }

    // eslint-disable-next-line react/sort-comp
    #data = this.props.data

    get data() {
      return this.props.data;
    }

    set data(value) {
      this.#data = value;
    }

    componentDidMount() {
      if (isRemoteFiltering() && Object.keys(this.currFilters).length > 0) {
        handleFilterChange(this.currFilters);
      }
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.data, prevProps.data) && !isRemoteFiltering()) {
        this.doFilter(this.props, this.isEmitDataChange);
      }
    }

    onFilter = (column, filterType, initialize = false) => (filterVal) => {
      // watch out here if migration to context API, #334
      const currFilters = { ...this.currFilters };
      this.clearFilters = {};
      const { dataField, filter } = column;

      const needClearFilters = !_.isDefined(filterVal)
        || filterVal === ''
        || filterVal.length === 0;

      if (needClearFilters) {
        delete currFilters[dataField];
        this.clearFilters = { [dataField]: { clear: true, filterVal } };
      } else {
        // select default comparator is EQ, others are LIKE
        const {
          comparator = (filterType === FILTER_TYPE.SELECT ? EQ : LIKE),
          caseSensitive = false
        } = filter.props;
        currFilters[dataField] = {
          filterVal, filterType, comparator, caseSensitive
        };
      }

      this.currFilters = currFilters;

      if (isRemoteFiltering()) {
        if (!initialize) {
          handleFilterChange(this.currFilters);
        }
        return;
      }
      this.doFilter();
    }

    onExternalFilter = (column, filterType) => (value) => {
      this.onFilter(column, filterType)(value);
    }

    getFiltered() {
      // eslint-disable-next-line react/destructuring-assignment
      return this.data;
    }

    doFilter = (props = this.props, ignoreEmitDataChange = false) => {
      const {
        dataChangeListener, data, columns, filter
      } = props;
      const result = filters(data, columns, _)(this.currFilters, this.clearFilters);
      if (filter.afterFilter) {
        filter.afterFilter(result, this.currFilters);
      }
      this.data = result;
      if (dataChangeListener && !ignoreEmitDataChange) {
        this.isEmitDataChange = true;
        dataChangeListener.emit('filterChanged', result.length);
      } else {
        this.isEmitDataChange = false;
        this.forceUpdate();
      }
    }

    render() {
      const { children } = this.props;
      return (
        <FilterContext.Provider value={ {
          data: this.data,
          onFilter: this.onFilter,
          onExternalFilter: this.onExternalFilter,
          currFilters: this.currFilters
        } }
        >
          { children }
        </FilterContext.Provider>
      );
    }
  }

  FilterProvider.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    dataChangeListener: PropTypes.object
  };

  return {
    Provider: FilterProvider,
    Consumer: FilterContext.Consumer
  };
};
