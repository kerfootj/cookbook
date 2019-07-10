import { CircularProgress, withStyles } from '@material-ui/core';

import React from 'react';

const styles = {
	image: {
		marginTop: 16,
		display: 'block',
		maxWidth: 300,
		width: '100%',
		height: 'auto'
	},
	boarderDashed: {
		border: '1px dashed #021a40'
	},
	boarderSolid: {
		border: '1px solid #021a40'
	}
};

const ImageUpload = ({ classes, image, uploading }) => {
	return (
		<div style={{ position: 'relative' }}>
			<img
				src={
					image
						? `https://i.imgur.com/${image.id}.jpg`
						: 'https://i.imgur.com/6MEHGTJ.jpg'
				}
				alt='upload'
				className={
					image
						? `${classes.image} ${classes.boarderSolid}`
						: `${classes.image} ${classes.boarderDashed}`
				}
			/>
			{uploading && (
				<CircularProgress
					color='primary'
					style={{ position: 'absolute', left: '37%', top: '43%' }}
				/>
			)}
		</div>
	);
};

export default withStyles(styles)(ImageUpload);
