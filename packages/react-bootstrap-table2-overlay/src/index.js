/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/static-property-placement */
/* eslint no-return-assign: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay-ts';

export default (options) => (loading) => class TableLoadingOverlayWrapper extends React.Component {
    static propTypes = {
      children: PropTypes.element.isRequired
    }

    overlayRef = React.createRef()

    componentDidMount() {
      if (loading) {
        const wrapper = this.overlayRef.current;
        const masker = wrapper.current.firstChild;
        const headerDOM = wrapper.current.parentElement.querySelector('thead');
        const bodyDOM = wrapper.current.parentElement.querySelector('tbody');
        const captionDOM = wrapper.current.parentElement.querySelector('caption');

        let marginTop = window.getComputedStyle(headerDOM).height;
        if (captionDOM) {
          marginTop = parseFloat(marginTop.replace('px', ''));
          marginTop += parseFloat(window.getComputedStyle(captionDOM).height.replace('px', ''));
          marginTop = `${marginTop}px`;
        }

        masker.style.marginTop = marginTop;
        masker.style.height = window.getComputedStyle(bodyDOM).height;
      }
    }

    render() {
      return (
        <LoadingOverlay
          // ref={ (n) => this.overlay = n }
          ref={ this.overlayRef }
          { ...options }
          active={ loading }
        >
          { this.props.children }
        </LoadingOverlay>
      );
    }
};
