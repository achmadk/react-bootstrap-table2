/* eslint-disable react/jsx-props-no-spreading */
/* eslint react/prop-types: 0 */
import React from 'react';

export default (WrappedComponent) => ({
  page,
  sizePerPage,
  ...rest
}) => (
  <WrappedComponent
    { ...rest }
    currPage={ page }
    currSizePerPage={ sizePerPage }
  />
);
