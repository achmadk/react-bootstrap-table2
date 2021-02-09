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
  componentDidUpdate(nextProps) {
    super.componentDidUpdate(nextProps);
    const { currSizePerPage } = this.state;
    const { custom, onPageChange } = nextProps.pagination.options;

    const pageStartIndex = typeof nextProps.pagination.options.pageStartIndex !== 'undefined'
      ? nextProps.pagination.options.pageStartIndex : Const.PAGE_START_INDEX;

    // user should align the page when the page is not fit to the data size when remote enable
    if (!this.isRemotePagination() && !custom) {
      const newPage = alignPage(
        nextProps.data.length,
        this.props.data.length,
        this.state.currPage,
        currSizePerPage,
        pageStartIndex
      );

      if (this.state.currPage !== newPage) {
        if (onPageChange) {
          onPageChange(newPage, currSizePerPage);
        }
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ currPage: newPage });
      }
    }
    if (nextProps.onDataSizeChange && nextProps.data.length !== this.props.data.length) {
      nextProps.onDataSizeChange({ dataSize: nextProps.data.length });
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
