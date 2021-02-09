/* eslint camelcase: 0 */
/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

export default (
  dataOperator,
  isRemoteSort,
  handleSortChange
) => {
  const SortContext = React.createContext();

  class SortProvider extends React.Component {
    constructor(props) {
      super(props);
      let sortOrder;
      let sortColumn;
      const { defaultSorted, defaultSortDirection, sort } = props;

      if (defaultSorted && defaultSorted.length > 0) {
        sortOrder = defaultSorted[0].order || defaultSortDirection;
        sortColumn = this.initSort(defaultSorted[0].dataField, sortOrder);
      } else if (sort && sort.dataField && sort.order) {
        sortOrder = sort.order;
        sortColumn = this.initSort(sort.dataField, sortOrder);
      }
      this.state = { sortOrder, sortColumn };
    }

    componentDidMount() {
      const { sortOrder, sortColumn } = this.state;
      if (isRemoteSort() && sortOrder && sortColumn) {
        handleSortChange(sortColumn.dataField, sortOrder);
      }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    static getDerivedStateFromProps(nextProps) {
      if (nextProps?.sort?.dataField && nextProps?.sort?.order) {
        const { sort, columns } = nextProps;
        return {
          sortOrder: sort.order,
          sortColumn: columns.find((col) => col.dataField === sort.dataField)
        };
      }
      return null;
    }

    handleSort = (column) => {
      const { defaultSortDirection } = this.props;
      const sortOrder = dataOperator.nextOrder(column, this.state, defaultSortDirection);

      if (column.onSort) {
        column.onSort(column.dataField, sortOrder);
      }

      if (isRemoteSort()) {
        handleSortChange(column.dataField, sortOrder);
      }
      this.setState(() => ({
        sortOrder,
        sortColumn: column
      }));
    }

    initSort(sortField, sortOrder) {
      let sortColumn;
      const { columns } = this.props;
      const [sortColumns] = columns.filter((col) => col.dataField === sortField);
      if (sortColumns.length > 0) {
        sortColumn = sortColumns;

        if (sortColumn.onSort) {
          sortColumn.onSort(sortField, sortOrder);
        }
      }
      return sortColumn;
    }

    render() {
      let { data } = this.props;
      const { children } = this.props;
      const { sort } = this.props;
      const { sortOrder, sortColumn } = this.state;
      if (!isRemoteSort() && sortColumn) {
        const sortFunc = sortColumn.sortFunc ? sortColumn.sortFunc : (sort && sort.sortFunc);
        data = dataOperator.sort(data, sortOrder, { ...sortColumn, sortFunc });
      }

      return (
        <SortContext.Provider
          value={ {
            data,
            sortOrder,
            onSort: this.handleSort,
            sortField: sortColumn ? sortColumn.dataField : null
          } }
        >
          { children }
        </SortContext.Provider>
      );
    }
  }

  SortProvider.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
    defaultSorted: PropTypes.arrayOf(PropTypes.shape({
      dataField: PropTypes.string.isRequired,
      order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]).isRequired
    })),
    sort: PropTypes.shape({
      dataField: PropTypes.string,
      order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]),
      sortFunc: PropTypes.func
    }),
    defaultSortDirection: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC])
  };

  return {
    Provider: SortProvider,
    Consumer: SortContext.Consumer
  };
};
