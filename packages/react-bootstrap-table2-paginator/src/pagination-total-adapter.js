/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import pageResolver from './page-resolver';
import PaginationTotal from './pagination-total';

// eslint-disable-next-line max-len
const paginationTotalAdapter = (WrappedComponent) => class PaginationTotalAdapter extends pageResolver(Component) {
  render() {
    const [from, to] = this.calculateFromTo();
    return (
      <WrappedComponent
        from={ from }
        to={ to }
        dataSize={ this.props.dataSize }
        paginationTotalRenderer={ this.props.paginationTotalRenderer }
      />
    );
  }
};

export const PaginationTotalWithAdapter = paginationTotalAdapter(PaginationTotal);
export default paginationTotalAdapter;
