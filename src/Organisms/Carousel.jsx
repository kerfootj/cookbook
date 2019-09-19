import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
	displayed: {
		width: '100%',
		height: '100%',
		objectFit: 'cover'
	},
	row: {
		display: 'flex'
	},
	column: {
		flex: '20%',
		padding: 4,
		height: 70,
		overflow: 'hidden'
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover'
	}
};

class Carousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: new Array(5).fill(props.images[0])
		};
	}
	renderThumbNails = () => {
		const { classes } = this.props;
		const { images } = this.state;
		return images.map(image => (
			<div className={classes.column}>
				<img className={classes.image} src={image} alt='' />
			</div>
		));
	};

	render() {
		const { alt, classes, images } = this.props;
		return (
			<>
				<img className={classes.displayed} alt={alt} src={images[0]} />
				<div className={classes.row}>{this.renderThumbNails()}</div>
			</>
		);
	}
}

Carousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Carousel);
