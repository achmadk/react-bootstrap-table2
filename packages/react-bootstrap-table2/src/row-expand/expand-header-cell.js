/* eslint react/require-default-props: 0 */
/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpansionHeaderCell extends Component {
  handleCheckBoxClick = (e) => {
    const { isAnyExpands, onAllRowExpand } = this.props;

    onAllRowExpand(e, !isAnyExpands);
  }

  render() {
    const { isAnyExpands, expandHeaderColumnRenderer } = this.props;
    const attrs = {
      onClick: this.handleCheckBoxClick
    };

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <th className="expand-cell-header" data-row-selection { ...attrs }>
        {
          expandHeaderColumnRenderer
            ? expandHeaderColumnRenderer({ isAnyExpands })
            : (isAnyExpands ? '(-)' : '(+)')
        }
      </th>
    );
  }
}

ExpansionHeaderCell.propTypes = {
  isAnyExpands: PropTypes.bool.isRequired,
  onAllRowExpand: PropTypes.func.isRequired,
  expandHeaderColumnRenderer: PropTypes.func
};

export default ExpansionHeaderCell;
