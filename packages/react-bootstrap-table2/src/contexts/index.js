/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint camelcase: 0 */
/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import EventEmitter from 'events';
import _ from '../utils';
import createDataContext from './data-context';
import createColumnMgtContext from './column-context';
import createSortContext from './sort-context';
import SelectionContext from './selection-context';
import RowExpandContext from './row-expand-context';
import remoteResolver from '../props-resolver/remote-resolver';
import { BootstrapContext } from './bootstrap';
import dataOperator from '../store/operators';

const withContext = (Base) => class BootstrapTableContainer extends remoteResolver(Component) {
  constructor(props) {
    super(props);
    this.DataContext = createDataContext();

    if (props.registerExposedAPI) {
      const exposedAPIEmitter = new EventEmitter();
      exposedAPIEmitter.on('get.table.data', (payload) => payload.result = this.table.getData());
      exposedAPIEmitter.on('get.selected.rows', (payload) => payload.result = this.selectionContext.getSelected());
      exposedAPIEmitter.on('get.filtered.rows', (payload) => {
        if (this.searchContext) {
          payload.result = this.searchContext.getSearched();
        } else if (this.filterContext) {
          payload.result = this.filterContext.getFiltered();
        } else {
          payload.result = this.table.getData();
        }
      });
      props.registerExposedAPI(exposedAPIEmitter);
    }

    if (props.columns.filter((col) => col.sort).length > 0) {
      this.SortContext = createSortContext(
        dataOperator, this.isRemoteSort, this.handleRemoteSortChange
      );
    }

    if (
      props.columnToggle
        || props.columns.filter((col) => col.hidden).length > 0
    ) {
      this.ColumnManagementContext = createColumnMgtContext();
    }

    if (props.selectRow) {
      this.SelectionContext = SelectionContext;
    }

    if (props.expandRow) {
      this.RowExpandContext = RowExpandContext;
    }

    if (props.cellEdit && props.cellEdit.createContext) {
      this.CellEditContext = props.cellEdit.createContext(
        _, dataOperator, this.isRemoteCellEdit, this.handleRemoteCellChange
      );
    }

    if (props.filter) {
      this.FilterContext = props.filter.createContext(
        _, this.isRemoteFiltering, this.handleRemoteFilterChange
      );
    }

    if (props.pagination) {
      this.PaginationContext = props.pagination.createContext();
    }

    if (props.search && props.search.searchContext) {
      this.SearchContext = props.search.searchContext(
        _, this.isRemoteSearch, this.handleRemoteSearchChange
      );
    }

    if (props.setDependencyModules) {
      props.setDependencyModules(_);
    }

    if (props.setPaginationRemoteEmitter) {
      props.setPaginationRemoteEmitter(this.remoteEmitter);
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  componentDidUpdate(prevProps) {
    if (this.props.columns.filter((col) => col.sort).length <= 0) {
      this.SortContext = null;
    } else if (!this.SortContext) {
      this.SortContext = createSortContext(
        dataOperator, this.isRemoteSort, this.handleRemoteSortChange
      );
    }
    if (!this.props.pagination && prevProps.pagination) {
      this.PaginationContext = null;
    }
    if (this.props.pagination && !prevProps.pagination) {
      this.PaginationContext = this.props.pagination.createContext(
        this.isRemotePagination, this.handleRemotePageChange
      );
    }
    if (!this.props.cellEdit && prevProps.cellEdit) {
      this.CellEditContext = null;
    }
    if (this.props.cellEdit && !prevProps.cellEdit) {
      this.CellEditContext = this.props.cellEdit.createContext(
        _, dataOperator, this.isRemoteCellEdit, this.handleRemoteCellChange
      );
    }
  }

  renderBase = () => (
    rootProps,
    filterProps,
    searchProps,
    sortProps,
    paginationProps,
    columnToggleProps
  ) => (
    <Base
      ref={ (n) => this.table = n }
      { ...this.props }
      { ...sortProps }
      { ...filterProps }
      { ...searchProps }
      { ...paginationProps }
      { ...columnToggleProps }
      data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
    />
  );

  renderWithColumnManagementCtx = (base, baseProps) => {
    const { columnToggle } = this.props;
    return (
      rootProps,
      filterProps,
      searchProps,
      sortProps,
      paginationProps
    ) => (
      <this.ColumnManagementContext.Provider
        { ...baseProps }
        toggles={ columnToggle ? columnToggle.toggles : null }
      >
        <this.ColumnManagementContext.Consumer>
          {
              (columnToggleProps) => base(
                rootProps,
                filterProps,
                searchProps,
                sortProps,
                paginationProps,
                columnToggleProps
              )
            }
        </this.ColumnManagementContext.Consumer>
      </this.ColumnManagementContext.Provider>
    );
  }

  renderWithSelectionCtx = (base, baseProps) => {
    const { selectRow } = this.props;
    return (
      rootProps,
      filterProps,
      searchProps,
      sortProps,
      paginationProps
    ) => (
      <this.SelectionContext.Provider
        { ...baseProps }
        ref={ (n) => this.selectionContext = n }
        selectRow={ selectRow }
        data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
      >
        {
            base(
              rootProps,
              filterProps,
              searchProps,
              sortProps,
              paginationProps
            )
          }
      </this.SelectionContext.Provider>
    );
  }

  renderWithRowExpandCtx = (base, baseProps) => {
    const { expandRow } = this.props;
    return (
      rootProps,
      filterProps,
      searchProps,
      sortProps,
      paginationProps
    ) => (
      <this.RowExpandContext.Provider
        { ...baseProps }
        ref={ (n) => this.rowExpandContext = n }
        expandRow={ expandRow }
        data={ rootProps.getData(filterProps, searchProps, sortProps, paginationProps) }
      >
        {
            base(
              rootProps,
              filterProps,
              searchProps,
              sortProps,
              paginationProps
            )
          }
      </this.RowExpandContext.Provider>
    );
  }

  renderWithPaginationCtx = (base) => {
    const {
      pagination, bootstrap4, onDataSizeChange, id
    } = this.props;
    return (
      rootProps,
      filterProps,
      searchProps,
      sortProps
    ) => (
      <this.PaginationContext.Provider
        ref={ (n) => this.paginationContext = n }
        pagination={ pagination }
        data={ rootProps.getData(filterProps, searchProps, sortProps) }
        bootstrap4={ bootstrap4 }
        isRemotePagination={ this.isRemotePagination }
        remoteEmitter={ this.remoteEmitter }
        onDataSizeChange={ onDataSizeChange }
        tableId={ id }
      >
        <this.PaginationContext.Consumer>
          {
              (paginationProps) => base(
                rootProps,
                filterProps,
                searchProps,
                sortProps,
                paginationProps
              )
            }
        </this.PaginationContext.Consumer>
      </this.PaginationContext.Provider>
    );
  }

  renderWithSortCtx = (base, baseProps) => {
    const { defaultSorted, defaultSortDirection, sort } = this.props;
    return (
      rootProps,
      filterProps,
      searchProps
    ) => (
      <this.SortContext.Provider
        { ...baseProps }
        ref={ (n) => this.sortContext = n }
        defaultSorted={ defaultSorted }
        defaultSortDirection={ defaultSortDirection }
        sort={ sort }
        data={ rootProps.getData(filterProps, searchProps) }
      >
        <this.SortContext.Consumer>
          {
              (sortProps) => base(
                rootProps,
                filterProps,
                searchProps,
                sortProps
              )
            }
        </this.SortContext.Consumer>
      </this.SortContext.Provider>
    );
  }

  renderWithSearchCtx = (base, baseProps) => {
    const { search, dataChangeListener } = this.props;
    return (
      rootProps,
      filterProps
    ) => (
      <this.SearchContext.Provider
        { ...baseProps }
        ref={ (n) => this.searchContext = n }
        data={ rootProps.getData(filterProps) }
        searchText={ search.searchText }
        dataChangeListener={ dataChangeListener }
      >
        <this.SearchContext.Consumer>
          {
              (searchProps) => base(
                rootProps,
                filterProps,
                searchProps
              )
            }
        </this.SearchContext.Consumer>
      </this.SearchContext.Provider>
    );
  }

  renderWithFilterCtx = (base, baseProps) => {
    const { filter, dataChangeListener } = this.props;
    return (rootProps) => (
      <this.FilterContext.Provider
        { ...baseProps }
        ref={ (n) => this.filterContext = n }
        data={ rootProps.getData() }
        filter={ filter.options || {} }
        dataChangeListener={ dataChangeListener }
      >
        <this.FilterContext.Consumer>
          {
              (filterProps) => base(
                rootProps,
                filterProps
              )
            }
        </this.FilterContext.Consumer>
      </this.FilterContext.Provider>
    );
  }

  renderWithCellEditCtx = (base, baseProps) => {
    const { selectRow, cellEdit } = this.props;
    return (rootProps) => (
      <this.CellEditContext.Provider
        { ...baseProps }
        ref={ (n) => this.cellEditContext = n }
        selectRow={ selectRow }
        cellEdit={ cellEdit }
        data={ rootProps.getData() }
      >
        { base(rootProps) }
      </this.CellEditContext.Provider>
    );
  }

  render() {
    const { keyField, columns, bootstrap4 } = this.props;
    const baseProps = { keyField, columns };

    let base = this.renderBase();

    if (this.ColumnManagementContext) {
      base = this.renderWithColumnManagementCtx(base, baseProps);
    }

    if (this.SelectionContext) {
      base = this.renderWithSelectionCtx(base, baseProps);
    }

    if (this.RowExpandContext) {
      base = this.renderWithRowExpandCtx(base, baseProps);
    }

    if (this.PaginationContext) {
      base = this.renderWithPaginationCtx(base, baseProps);
    }

    if (this.SortContext) {
      base = this.renderWithSortCtx(base, baseProps);
    }

    if (this.SearchContext) {
      base = this.renderWithSearchCtx(base, baseProps);
    }

    if (this.FilterContext) {
      base = this.renderWithFilterCtx(base, baseProps);
    }

    if (this.CellEditContext) {
      base = this.renderWithCellEditCtx(base, baseProps);
    }

    return (
      <BootstrapContext.Provider value={ { bootstrap4 } }>
        <this.DataContext.Provider
          { ...baseProps }
          data={ this.props.data }
        >
          <this.DataContext.Consumer>
            {
                base
              }
          </this.DataContext.Consumer>
        </this.DataContext.Provider>
      </BootstrapContext.Provider>
    );
  }
};

export default withContext;
