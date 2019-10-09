import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';

class Gallery extends Component {
	render() {
		const { items } = this.props;
		return (
			<ImageGallery
				items={items}
				renderPlayPauseButton={() => {}}
				renderFullscreenButton={() => {}}
			/>
		);
	}
}

export default Gallery;
