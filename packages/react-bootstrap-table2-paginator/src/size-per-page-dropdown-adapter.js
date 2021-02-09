/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import pageResolver from './page-resolver';
import SizePerPageDropDown from './size-per-page-dropdown';

const sizePerPageDropdownAdapter = (WrappedComponent) => class SizePerPageDropdownAdapter extends pageResolver(Component) {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = { dropdownOpen: false };

  toggleDropDown = () => {
    this.setState(({ dropdownOpen }) => ({ dropdownOpen: !dropdownOpen }));
  }

  closeDropDown = () => {
    this.setState(() => ({ dropdownOpen: false }));
  }

  handleChangeSizePerPage = (sizePerPage) => {
    this.props.onSizePerPageChange(sizePerPage);
    this.closeDropDown();
  }

  render() {
    const {
      tableId,
      bootstrap4,
      sizePerPageList,
      currSizePerPage,
      hideSizePerPage,
      sizePerPageRenderer,
      sizePerPageOptionRenderer
    } = this.props;
    const { dropdownOpen: open } = this.state;

    if (sizePerPageList.length > 1 && !hideSizePerPage) {
      if (sizePerPageRenderer) {
        return sizePerPageRenderer({
          options: this.calculateSizePerPageStatus(),
          currSizePerPage: `${currSizePerPage}`,
          onSizePerPageChange: this.handleChangeSizePerPage
        });
      }
      return (
        <WrappedComponent
          { ...this.props }
          currSizePerPage={ `${currSizePerPage}` }
          options={ this.calculateSizePerPageStatus() }
          optionRenderer={ sizePerPageOptionRenderer }
          onSizePerPageChange={ this.handleChangeSizePerPage }
          onClick={ this.toggleDropDown }
          onBlur={ this.closeDropDown }
          open={ open }
          tableId={ tableId }
          bootstrap4={ bootstrap4 }
        />
      );
    }
    return null;
  }
};

export const SizePerPageDropdownWithAdapter = sizePerPageDropdownAdapter(SizePerPageDropDown);
export default sizePerPageDropdownAdapter;
