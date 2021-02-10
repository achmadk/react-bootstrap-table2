/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint camelcase: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default () => {
  const DataContext = React.createContext();

  class DataProvider extends Component {
    // eslint-disable-next-line react/sort-comp
    #data = this.props.data
    // eslint-disable-next-line react/state-in-constructor, react/destructuring-assignment
    // state = { data: this.props.data };

    // componentDidUpdate(prevProps) {
    //   if (!_.isEqual(this.props.data, prevProps.data)) {
    //     // eslint-disable-next-line react/no-did-update-set-state
    //     this.setState({ data: this.props.data });
    //   }
    // }
    get data() {
      return this.#data;
    }

    set data(value) {
      this.#data = value;
    }

    getData = (filterProps, searchProps, sortProps, paginationProps) => {
      if (paginationProps) return paginationProps.data;
      if (sortProps) return sortProps.data;
      if (searchProps) return searchProps.data;
      if (filterProps) return filterProps.data;
      return this.data;
    }

    render() {
      const { children } = this.props;
      return (
        <DataContext.Provider
          value={ {
            data: this.data,
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
