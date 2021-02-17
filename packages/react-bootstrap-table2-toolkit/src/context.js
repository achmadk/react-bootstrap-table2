/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import statelessDecorator from './statelessOp';

import createSearchContext from './search/context';

const ToolkitContext = React.createContext();

class ToolkitProvider extends statelessDecorator(React.Component) {
  _ = null;

  state = {
    searchText: typeof this.props.search === 'object' ? (this.props.search.defaultSearch || '') : '',
    columnToggle: this.props?.columns
      ?.reduce((obj, column) => {
        obj[column.dataField] = !column.hidden;
        return obj;
      }, {}) ?? null
  }

  componentDidUpdate(prevProps) {
    if (prevProps?.columnToggle !== this.props?.columnToggle) {
      const columnToggle = this.props?.columns
        ?.reduce((obj, column) => {
          obj[column.dataField] = !column.hidden;
          return obj;
        }, {}) ?? null;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ columnToggle });
    }
  }

  onSearch = (searchText) => {
    if (searchText !== this.state.searchText) {
      this.setState({ searchText });
    }
  }

  onClear = () => {
    this.setState({ searchText: '' });
  }

  onColumnToggle = (dataField, forceValue) => {
    const selectedColumn = this.props.columns
      ?.find((column) => column.dataField === dataField) ?? null;
    this.setState(({ columnToggle }) => {
      const fallbackValue = !columnToggle?.[dataField] ?? selectedColumn?.hidden ?? false;
      const value = typeof forceValue === 'boolean' ? forceValue : fallbackValue;
      return {
        columnToggle: {
          ...columnToggle,
          [dataField]: value
        }
      };
    });
  }

  /**
   *
   * @param {*} _
   * this function will be called only one time when table render
   * react-bootstrap-table-next/src/context/index.js will call this cb for passing the _ module
   * Please consider to extract a common module to handle _ module.
   * this is just a quick fix
   */
  setDependencyModules = (_) => {
    this._ = _;
  }

  render() {
    const baseProps = {
      keyField: this.props.keyField,
      columns: this.props.columns,
      data: this.props.data,
      bootstrap4: this.props.bootstrap4,
      setDependencyModules: this.setDependencyModules,
      registerExposedAPI: this.registerExposedAPI
    };
    if (this.props.search) {
      baseProps.search = {
        searchContext: createSearchContext(this.props.search),
        searchText: this.state.searchText
      };
    }
    if (this.props.columnToggle) {
      baseProps.columnToggle = {
        toggles: this.state.columnToggle
      };
    }
    return (
      <ToolkitContext.Provider value={ {
        searchProps: {
          searchText: this.state.searchText,
          onSearch: this.onSearch,
          onClear: this.onClear
        },
        csvProps: {
          onExport: this.handleExportCSV
        },
        columnToggleProps: {
          columns: this.props.columns,
          toggles: this.state.columnToggle,
          onColumnToggle: this.onColumnToggle
        },
        baseProps
      } }
      >
        { this.props.children }
      </ToolkitContext.Provider>
    );
  }
}

ToolkitProvider.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  bootstrap4: PropTypes.bool,
  search: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      defaultSearch: PropTypes.string,
      searchFormatted: PropTypes.bool
    })
  ]),
  exportCSV: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      fileName: PropTypes.string,
      separator: PropTypes.string,
      ignoreHeader: PropTypes.bool,
      ignoreFooter: PropTypes.bool,
      noAutoBOM: PropTypes.bool,
      blobType: PropTypes.string,
      exportAll: PropTypes.bool,
      onlyExportFiltered: PropTypes.bool,
      onlyExportSelection: PropTypes.bool
    })
  ])
};

ToolkitProvider.defaultProps = {
  search: false,
  exportCSV: false,
  bootstrap4: true
};

export default {
  Provider: ToolkitProvider,
  Consumer: ToolkitContext.Consumer
};
