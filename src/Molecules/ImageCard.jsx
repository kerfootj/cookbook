import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextTruncate from 'react-text-truncate';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = {
	card: {
		maxWidth: 345,
		height: 430
	},
	media: {
		height: 300,
		width: 345
	}
};

class ImageCard extends Component {
	render() {
		const { classes, imageUrl, title, description } = this.props;
		return (
			<Card className={classes.card}>
				<CardMedia className={classes.media} image={imageUrl} title={title} />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{title}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='span'>
						<TextTruncate line={3} truncateText='…' text={description}></TextTruncate>
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(ImageCard);
