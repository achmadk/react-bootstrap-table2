/* eslint-disable react/jsx-props-no-spreading */
/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import Const from './const';
import Pagination from './pagination';
import { getByCurrPage, alignPage } from './page';
import createBaseContext from './state-context';

const { Provider } = createBaseContext();

const PaginationDataContext = React.createContext();

class PaginationDataProvider extends Provider {
  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(this.props);
    const { currSizePerPage } = prevState;
    const { custom, onPageChange } = this.props.pagination.options;

    const pageStartIndex = typeof this.props.pagination.options.pageStartIndex !== 'undefined'
      ? this.props.pagination.options.pageStartIndex : Const.PAGE_START_INDEX;

    // user should align the page when the page is not fit to the data size when remote enable
    if (!this.isRemotePagination() && !custom) {
      const newPage = alignPage(
        this.props.data.length,
        prevProps.data.length,
        prevState.currPage,
        currSizePerPage,
        pageStartIndex
      );

      if (prevState.currPage !== newPage) {
        if (onPageChange) {
          onPageChange(newPage, currSizePerPage);
        }
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ currPage: newPage });
      }
    }
    if (this.props.onDataSizeChange && this.props.data.length !== prevProps.data.length) {
      this.props.onDataSizeChange({ dataSize: this.props.data.length });
    }
  }

  isRemotePagination = () => this.props.isRemotePagination();

  renderDefaultPagination = () => {
    if (!this.props.pagination.options.custom) {
      const {
        page: currPage,
        sizePerPage: currSizePerPage,
        dataSize,
        ...rest
      } = this.getPaginationProps();
      return (
        <Pagination
          { ...rest }
          key="pagination"
          dataSize={ dataSize || this.props.data.length }
          currPage={ currPage }
          currSizePerPage={ currSizePerPage }
        />
      );
    }
    return null;
  }

  render() {
    let { data } = this.props;
    const { pagination: { options } } = this.props;
    const { currPage, currSizePerPage } = this.state;
    const pageStartIndex = typeof options.pageStartIndex === 'undefined'
      ? Const.PAGE_START_INDEX : options.pageStartIndex;

    data = this.isRemotePagination()
      ? data
      : getByCurrPage(
        data,
        currPage,
        currSizePerPage,
        pageStartIndex
      );

    return (
      <PaginationDataContext.Provider
        value={ { data, setPaginationRemoteEmitter: this.setPaginationRemoteEmitter } }
      >
        { this.props.children }
        { this.renderDefaultPagination() }
      </PaginationDataContext.Provider>
    );
  }
}

PaginationDataProvider.propTypes = {
  data: PropTypes.array.isRequired,
  remoteEmitter: PropTypes.object.isRequired,
  isRemotePagination: PropTypes.func.isRequired
};

export default () => ({
  Provider: PaginationDataProvider,
  Consumer: PaginationDataContext.Consumer
});
