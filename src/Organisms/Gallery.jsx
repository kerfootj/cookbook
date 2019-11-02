import 'react-image-gallery/styles/scss/image-gallery.scss';
import './gallery.css';

import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

const Gallery = ({ items }) => (
  <ImageGallery
    items={items}
    showPlayButton={false}
    renderFullscreenButton={() => {}}
  />
);

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
};

Gallery.defaultProps = {
  items: [],
};

export default Gallery;
