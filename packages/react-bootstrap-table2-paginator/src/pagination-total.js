import React from 'react';
import PropTypes from 'prop-types';

const PaginationTotal = (props) => {
  const {
    paginationTotalRenderer, from, to, dataSize
  } = props;
  if (paginationTotalRenderer) {
    return paginationTotalRenderer(from, to, dataSize);
  }
  return (
    <span className="react-bootstrap-table-pagination-total">
      &nbsp;Showing rows
      {' '}
      { from }
      {' '}
      to&nbsp;
      { to }
      {' '}
      of&nbsp;
      { dataSize }
    </span>
  );
};

PaginationTotal.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  dataSize: PropTypes.number.isRequired,
  paginationTotalRenderer: PropTypes.func
};

PaginationTotal.defaultProps = {
  paginationTotalRenderer: undefined
};

export default PaginationTotal;
