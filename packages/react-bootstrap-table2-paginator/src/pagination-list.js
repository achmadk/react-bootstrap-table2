/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import PageButton from './page-button';

const PaginatonList = ({ pages, pageButtonRenderer, onPageChange }) => (
  <ul className="pagination react-bootstrap-table-page-btns-ul">
    {
      pages.map((pageProps) => {
        if (pageButtonRenderer) {
          return pageButtonRenderer({
            ...pageProps,
            onPageChange
          });
        }
        return (
          <PageButton
            key={ pageProps.page }
            { ...pageProps }
            onPageChange={ onPageChange }
          />
        );
      })
    }
  </ul>
);

PaginatonList.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    page: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.number,
      PropTypes.string
    ]),
    active: PropTypes.bool,
    disable: PropTypes.bool,
    title: PropTypes.string
  })).isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageButtonRenderer: PropTypes.func
};

PaginatonList.defaultProps = {
  pageButtonRenderer: null
};

export default PaginatonList;
