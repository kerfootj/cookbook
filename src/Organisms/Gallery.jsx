import 'react-image-gallery/styles/scss/image-gallery.scss';
import './gallery.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

class Gallery extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        original: PropTypes.string,
        thumbnail: PropTypes.string,
      })
    ),
  };

  render() {
    const { items } = this.props;
    return (
      <ImageGallery
        items={items}
        showPlayButton={false}
        renderFullscreenButton={() => {}}
      />
    );
  }
}

export default Gallery;
