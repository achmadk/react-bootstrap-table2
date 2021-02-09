/* eslint camelcase: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default () => {
  const DataContext = React.createContext();

  class DataProvider extends Component {
    // eslint-disable-next-line react/state-in-constructor, react/destructuring-assignment
    state = { data: this.props.data };

    static getDerivedStateFromProps(nextProps) {
      return { data: nextProps.data };
    }

    componentDidUpdate(_, prevState) {
      const { data } = this.state;
      if (prevState.data !== data) {
        this.updateData(data);
      }
    }

    getData = (filterProps, searchProps, sortProps, paginationProps) => {
      const { data } = this.props;
      if (paginationProps) return paginationProps.data;
      if (sortProps) return sortProps.data;
      if (searchProps) return searchProps.data;
      if (filterProps) return filterProps.data;
      return data;
    }

    updateData(newData) {
      this.setState({ data: newData });
    }

    render() {
      const { data } = this.state;
      const { children } = this.props;
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
