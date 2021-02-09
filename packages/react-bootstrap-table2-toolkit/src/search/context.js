/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-continue: 0 */
/* eslint no-lonely-if: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';

export default (options = {
  searchFormatted: false,
  afterSearch: null,
  onColumnMatch: null
}) => (
  _,
  isRemoteSearch,
  handleRemoteSearchChange
) => {
  const SearchContext = React.createContext();

  class SearchProvider extends React.Component {
    constructor(props) {
      super(props);
      const { searchText } = props;
      let initialData = props.data;
      if (isRemoteSearch() && searchText !== '') {
        handleRemoteSearchChange(searchText);
      } else {
        initialData = this.search(props);
        this.triggerListener(initialData, true);
      }
      this.state = { data: initialData };
    }

    getSnapshotBeforeUpdate(prevProps) {
      if (isRemoteSearch()) {
        if (prevProps.searchText !== this.props.searchText) {
          return 'handleRemoteSearchChange';
        }
        if (!_.isEqual(prevProps.data, this.props.data)) {
          return 'setState';
        }
        return null;
      }
      if (prevProps.searchText !== this.props.searchText) {
        return 'triggerListener';
      }
      if (!_.isEqual(prevProps.data, this.props.data)) {
        return 'triggerListener';
      }
      return null;
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(_prevProps, _prevState, snapshot) {
    // static getDerivedStateFromProps(prevProps) {
      if (snapshot !== null) {
        // eslint-disable-next-line default-case
        switch (snapshot) {
          case 'handleRemoteSearchChange':
            handleRemoteSearchChange(this.props.searchText);
            break;
          case 'triggerListener':
            // eslint-disable-next-line no-case-declarations
            const result = this.search(this.props);
            this.triggerListener(result);
            this.setState({
              data: result
            });
            break;
          case 'setState':
            this.setState({ data: this.props.data });
            break;
        }
      }
      // if (prevProps.searchText !== this.props.searchText) {
      //   if (isRemoteSearch()) {
      //     handleRemoteSearchChange(this.props.searchText);
      //   } else {
      //     const result = this.search(this.props);
      //     this.triggerListener(result);
      //     this.setState({
      //       data: result
      //     });
      //   }
      // } else {
      //   if (isRemoteSearch()) {
      //     this.setState({ data: this.props.data });
      //   } else if (!_.isEqual(this.props.data, prevProps.data)) {
      //     const result = this.search(this.props);
      //     this.triggerListener(result);
      //     this.setState({
      //       data: result
      //     });
      //   }
      // }
    }

    getSearched() {
      const { data } = this.state;
      return data;
    }

    triggerListener = (result, skipInit) => {
      const { dataChangeListener } = this.props;
      if (options.afterSearch && !skipInit) {
        options.afterSearch(result);
      }
      if (dataChangeListener) {
        dataChangeListener.emit('filterChanged', result.length);
      }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //   if (nextProps.searchText !== this.props.searchText) {
    //     if (isRemoteSearch()) {
    //       handleRemoteSearchChange(nextProps.searchText);
    //     } else {
    //       const result = this.search(nextProps);
    //       this.triggerListener(result);
    //       this.setState({
    //         data: result
    //       });
    //     }
    //   } else {
    //     if (isRemoteSearch()) {
    //       this.setState({ data: nextProps.data });
    //     } else if (!_.isEqual(nextProps.data, this.props.data)) {
    //       const result = this.search(nextProps);
    //       this.triggerListener(result);
    //       this.setState({
    //         data: result
    //       });
    //     }
    //   }
    // }

    search = (props = this.props) => {
      const { data, columns } = props;
      const searchText = props.searchText.toLowerCase();
      return data.filter((row, ridx) => {
        for (let cidx = 0; cidx < columns.length; cidx += 1) {
          const column = columns[cidx];
          if (column.searchable === false) continue;
          let targetValue = _.get(row, column.dataField);
          if (column.formatter && options.searchFormatted) {
            targetValue = column.formatter(targetValue, row, ridx, column.formatExtraData);
          } else if (column.filterValue) {
            targetValue = column.filterValue(targetValue, row);
          }
          if (options.onColumnMatch) {
            if (options.onColumnMatch({
              searchText,
              value: targetValue,
              column,
              row
            })) {
              return true;
            }
          } else {
            if (targetValue !== null && typeof targetValue !== 'undefined') {
              targetValue = targetValue.toString().toLowerCase();
              if (targetValue.indexOf(searchText) > -1) {
                return true;
              }
            }
          }
        }
        return false;
      });
    }

    render() {
      const { data } = this.state;
      const { children } = this.props;
      return (
        <SearchContext.Provider value={ { data } }>
          { children }
        </SearchContext.Provider>
      );
    }
  }

  SearchProvider.propTypes = {
    data: PropTypes.array.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.array.isRequired,
    searchText: PropTypes.string,
    dataChangeListener: PropTypes.object
  };

  return {
    Provider: SearchProvider,
    Consumer: SearchContext.Consumer
  };
};
