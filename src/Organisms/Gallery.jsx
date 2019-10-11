import 'react-image-gallery/styles/scss/image-gallery.scss';

import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';

class Gallery extends Component {
	render() {
		const { items } = this.props;
		return (
			<ImageGallery items={items} showPlayButton={false} renderFullscreenButton={() => {}} />
		);
	}
}

export default Gallery;
