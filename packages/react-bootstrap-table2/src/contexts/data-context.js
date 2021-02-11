/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint camelcase: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default () => {
  const DataContext = React.createContext();

  class DataProvider extends Component {
    getData = (filterProps, searchProps, sortProps, paginationProps) => {
      if (paginationProps) return paginationProps.data;
      if (sortProps) return sortProps.data;
      if (searchProps) return searchProps.data;
      if (filterProps) return filterProps.data;
      return this.props.data;
    }

    render() {
      const { children, data } = this.props;
      return (
        <DataContext.Provider
          value={ {
            data,
            getData: this.getData
          } }
        >
          { children }
        </DataContext.Provider>
      );
    }
  }

  DataProvider.propTypes = {
    data: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired
  };

  return {
    Provider: DataProvider,
    Consumer: DataContext.Consumer
  };
};
