/* eslint-disable react/no-did-update-set-state */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
/* eslint camelcase: 0 */
import React from 'react';
import EventEmitter from 'events';
import Const from './const';
import { alignPage } from './page';

const StateContext = React.createContext();

// function updateStateFromProps(props) {
//   let currPage;
//   let currSizePerPage;
//   const { options } = props.pagination;
//   const sizePerPageList = options.sizePerPageList || Const.SIZE_PER_PAGE_LIST;

//   // initialize current page
//   if (typeof options.page !== 'undefined') {
//     currPage = options.page;
//   } else if (typeof options.pageStartIndex !== 'undefined') {
//     currPage = options.pageStartIndex;
//   } else {
//     currPage = Const.PAGE_START_INDEX;
//   }

//   // initialize current sizePerPage
//   if (typeof options.sizePerPage !== 'undefined') {
//     currSizePerPage = options.sizePerPage;
//   } else if (typeof sizePerPageList[0] === 'object') {
//     currSizePerPage = sizePerPageList[0].value;
//   } else {
//     const [currSizePerPageList] = sizePerPageList;
//     currSizePerPage = currSizePerPageList;
//   }

//   return {
//     currPage,
//     dataSize: options.totalSize,
//     currSizePerPage
//   };
// }

class StateProvider extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChangePage = this.handleChangePage.bind(this);
    // this.handleDataSizeChange = this.handleDataSizeChange.bind(this);
    // this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);

    let currPage;
    let currSizePerPage;
    const { options } = props.pagination;
    const sizePerPageList = options.sizePerPageList || Const.SIZE_PER_PAGE_LIST;

    // initialize current page
    if (typeof options.page !== 'undefined') {
      currPage = options.page;
    } else if (typeof options.pageStartIndex !== 'undefined') {
      currPage = options.pageStartIndex;
    } else {
      currPage = Const.PAGE_START_INDEX;
    }

    // initialize current sizePerPage
    if (typeof options.sizePerPage !== 'undefined') {
      currSizePerPage = options.sizePerPage;
    } else if (typeof sizePerPageList[0] === 'object') {
      currSizePerPage = sizePerPageList[0].value;
    } else {
      const [currSizePerPageList] = sizePerPageList;
      currSizePerPage = currSizePerPageList;
    }

    this.currPage = currPage;
    this.dataSize = options.totalSize;
    this.currSizePerPage = currSizePerPage;
    // this.state = updateStateFromProps(props);
    this.dataChangeListener = new EventEmitter();
    this.dataChangeListener.on('filterChanged', this.handleDataSizeChange);
  }

  // componentDidUpdate() {
  //   const { custom } = this.props?.pagination?.options ?? { custom: false };

  //   // user should align the page when the page is not fit to the data size when remote enable
  //   if (this.isRemotePagination() || custom) {
  //     if (typeof this.props.pagination.options.page !== 'undefined') {
  //       this.currPage = this.props.pagination.options.page;
  //     }
  //     if (typeof this.props.pagination.options.sizePerPage !== 'undefined') {
  //       this.currSizePerPage = this.props.pagination.options.sizePerPage;
  //     }
  //     if (typeof this.props.pagination.options.totalSize !== 'undefined') {
  //       this.dataSize = this.props.pagination.options.totalSize;
  //     }
  //     // if (this.props?.pagination?.options?.page !== prevProps?.pagination?.options?.page) {
  //     //   this.setState({ currPage: this.props.pagination.options.page });
  //     // }
  //     // if (this.props?.pagination?.options?.sizePerPage !== prevProps?.pagination?.options?.sizePerPage) {
  //     //   this.setState({ currSizePerPage: this.props.pagination.options.sizePerPage });
  //     // }
  //     // if (this.props?.pagination?.options?.totalSize !== prevProps?.pagination?.options?.totalSize) {
  //     //   this.setState({ dataSize: this.props.pagination.options.totalSize });
  //     // }
  //   }
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { custom } = nextProps?.pagination?.options ?? { custom: false };

    // user should align the page when the page is not fit to the data size when remote enable
    if (this.isRemotePagination() || custom) {
      if (typeof nextProps.pagination.options.page !== 'undefined') {
        this.currPage = nextProps.pagination.options.page;
      }
      if (typeof nextProps.pagination.options.sizePerPage !== 'undefined') {
        this.currSizePerPage = nextProps.pagination.options.sizePerPage;
      }
      if (typeof nextProps.pagination.options.totalSize !== 'undefined') {
        this.dataSize = nextProps.pagination.options.totalSize;
      }
      // if (nextProps?.pagination?.options?.page !== prevProps?.pagination?.options?.page) {
      //   this.setState({ currPage: nextProps.pagination.options.page });
      // }
      // if (nextProps?.pagination?.options?.sizePerPage !== prevProps?.pagination?.options?.sizePerPage) {
      //   this.setState({ currSizePerPage: nextProps.pagination.options.sizePerPage });
      // }
      // if (nextProps?.pagination?.options?.totalSize !== prevProps?.pagination?.options?.totalSize) {
      //   this.setState({ dataSize: nextProps.pagination.options.totalSize });
      // }
    }
  }

  handleDataSizeChange = (newDataSize) => {
    const { pagination: { options } } = this.props;
    // this.setState(({ dataSize, currPage, currSizePerPage }) => {
    //   const pageStartIndex = typeof options.pageStartIndex === 'undefined'
    //     ? Const.PAGE_START_INDEX : options.pageStartIndex;
    //   return {
    //     currPage: alignPage(
    //       newDataSize,
    //       dataSize,
    //       currPage,
    //       currSizePerPage,
    //       pageStartIndex
    //     ),
    //     dataSize: newDataSize
    //   };
    // }, () => {
    //   this.forceUpdate();
    // });
    // const { dataSize, currPage, currSizePerPage } = this.state;
    // const { dataSize, currPage, currSizePerPage } = this;
    const pageStartIndex = typeof options.pageStartIndex === 'undefined'
      ? Const.PAGE_START_INDEX : options.pageStartIndex;
    this.currPage = alignPage(
      newDataSize,
      this.dataSize,
      this.currPage,
      this.currSizePerPage,
      pageStartIndex
    );
    this.dataSize = newDataSize;
    this.forceUpdate();
  }

  handleChangePage = (currPage) => {
    const { currSizePerPage } = this;
    // const { currSizePerPage } = this.state;
    const { pagination: { options } } = this.props;

    if (options.onPageChange) {
      options.onPageChange(currPage, currSizePerPage);
    }

    this.currPage = currPage;
    // this.setState({ currPage }, () => {
    //   // eslint-disable-next-line no-shadow
    //   const { currPage, currSizePerPage } = this.state;
    //   if (this.isRemotePagination()) {
    //     this.paginationRemoteEmitter.emit('paginationChange', currPage, currSizePerPage);
    //     return;
    //   }
    //   this.forceUpdate();
    // });

    if (this.isRemotePagination()) {
      this.paginationRemoteEmitter.emit('paginationChange', currPage, currSizePerPage);
      return;
    }
    this.forceUpdate();
  }

  handleChangeSizePerPage = (currSizePerPage, currPage) => {
    const { pagination: { options } } = this.props;

    if (options.onSizePerPageChange) {
      options.onSizePerPageChange(currSizePerPage, currPage);
    }

    this.currPage = currPage;
    this.currSizePerPage = currSizePerPage;
    // this.setState({ currPage, currSizePerPage }, () => {
    //   // eslint-disable-next-line no-shadow
    //   const { currPage, currSizePerPage } = this.state;
    //   if (this.isRemotePagination()) {
    //     this.paginationRemoteEmitter.emit('paginationChange', currPage, currSizePerPage);
    //     return;
    //   }
    //   this.forceUpdate();
    // });

    if (this.isRemotePagination()) {
      this.paginationRemoteEmitter.emit('paginationChange', currPage, currSizePerPage);
      return;
    }
    this.forceUpdate();
  }

  getPaginationProps = () => {
    const { pagination: { options }, bootstrap4, tableId } = this.props;
    // const { currPage, currSizePerPage, dataSize } = this.state;
    const { currPage, currSizePerPage, dataSize } = this;
    const withFirstAndLast = typeof options.withFirstAndLast === 'undefined'
      ? Const.With_FIRST_AND_LAST : options.withFirstAndLast;
    const alwaysShowAllBtns = typeof options.alwaysShowAllBtns === 'undefined'
      ? Const.SHOW_ALL_PAGE_BTNS : options.alwaysShowAllBtns;
    const hideSizePerPage = typeof options.hideSizePerPage === 'undefined'
      ? Const.HIDE_SIZE_PER_PAGE : options.hideSizePerPage;
    const hidePageListOnlyOnePage = typeof options.hidePageListOnlyOnePage === 'undefined'
      ? Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE : options.hidePageListOnlyOnePage;
    const pageStartIndex = typeof options.pageStartIndex === 'undefined'
      ? Const.PAGE_START_INDEX : options.pageStartIndex;
    return {
      ...options,
      bootstrap4,
      tableId,
      page: currPage,
      sizePerPage: currSizePerPage,
      pageStartIndex,
      hidePageListOnlyOnePage,
      hideSizePerPage,
      alwaysShowAllBtns,
      withFirstAndLast,
      dataSize,
      sizePerPageList: options.sizePerPageList || Const.SIZE_PER_PAGE_LIST,
      paginationSize: options.paginationSize || Const.PAGINATION_SIZE,
      showTotal: options.showTotal,
      pageListRenderer: options.pageListRenderer,
      pageButtonRenderer: options.pageButtonRenderer,
      sizePerPageRenderer: options.sizePerPageRenderer,
      paginationTotalRenderer: options.paginationTotalRenderer,
      sizePerPageOptionRenderer: options.sizePerPageOptionRenderer,
      firstPageText: options.firstPageText || Const.FIRST_PAGE_TEXT,
      prePageText: options.prePageText || Const.PRE_PAGE_TEXT,
      nextPageText: options.nextPageText || Const.NEXT_PAGE_TEXT,
      lastPageText: options.lastPageText || Const.LAST_PAGE_TEXT,
      prePageTitle: options.prePageTitle || Const.PRE_PAGE_TITLE,
      nextPageTitle: options.nextPageTitle || Const.NEXT_PAGE_TITLE,
      firstPageTitle: options.firstPageTitle || Const.FIRST_PAGE_TITLE,
      lastPageTitle: options.lastPageTitle || Const.LAST_PAGE_TITLE,
      onPageChange: this.handleChangePage,
      onSizePerPageChange: this.handleChangeSizePerPage
    };
  }

  get paginationRemoteEmitter() {
    const { remoteEmitter } = this.props;
    return this.remoteEmitter || remoteEmitter;
  }

  isRemotePagination = () => {
    const e = {};
    this.remoteEmitter.emit('isRemotePagination', e);
    return e.result;
  };

  setPaginationRemoteEmitter = (remoteEmitter) => {
    this.remoteEmitter = remoteEmitter;
  }

  render() {
    const paginationProps = this.getPaginationProps();
    const pagination = {
      ...this.props.pagination,
      options: paginationProps
    };

    return (
      <StateContext.Provider
        value={ {
          paginationProps,
          paginationTableProps: {
            pagination,
            setPaginationRemoteEmitter: this.setPaginationRemoteEmitter,
            dataChangeListener: this.dataChangeListener
          }
        } }
      >
        { this.props.children }
      </StateContext.Provider>
    );
  }
}

export default () => ({
  Provider: StateProvider,
  Consumer: StateContext.Consumer
});
