/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import PropTypes from 'prop-types';

export default () => {
  const ColumnManagementContext = React.createContext();

  class ColumnManagementProvider extends React.Component {
    render() {
      let toggleColumn;
      const { columns, toggles, children } = this.props;
      if (toggles) {
        toggleColumn = columns.filter((column) => toggles[column.dataField]);
      } else {
        toggleColumn = columns.filter((column) => !column.hidden);
      }
      return (
        <ColumnManagementContext.Provider value={ { columns: toggleColumn } }>
          { children }
        </ColumnManagementContext.Provider>
      );
    }
  }

  ColumnManagementProvider.propTypes = {
    columns: PropTypes.array.isRequired,
    toggles: PropTypes.object
  };

  ColumnManagementProvider.defaultProps = {
    toggles: null
  };

  return {
    Provider: ColumnManagementProvider,
    Consumer: ColumnManagementContext.Consumer
  };
};
