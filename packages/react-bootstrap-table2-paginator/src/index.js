/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import createBaseContext from './state-context';
import createDataContext from './data-context';
import PaginationListStandalone from './pagination-list-standalone';
import SizePerPageDropdownStandalone from './size-per-page-dropdown-standalone';
import PaginationTotalStandalone from './pagination-total-standalone';

export default (options = {}) => ({
  createContext: createDataContext,
  options
});

const { Provider, Consumer } = createBaseContext();

const CustomizableProvider = (props) => (
  <Provider { ...props }>
    <Consumer>{ (paginationProps) => props.children(paginationProps) }</Consumer>
  </Provider>
);

CustomizableProvider.propTypes = {
  children: PropTypes.func.isRequired
};

export const PaginationProvider = CustomizableProvider;
export { PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone };
