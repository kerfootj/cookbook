import React, { Component } from 'react';

import { Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextTruncate from 'react-text-truncate';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = {
	card: {
		maxWidth: 300,
		height: 430
	},
	media: {
		height: 300,
		width: 300
	},
	title: {
		fontSize: '1rem',
		fontWeight: 600
	},
	body: {
		height: 50
	},
	description: {
		fontSize: '0.8rem',
		color: '#595959'
	},
	footer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		height: 25,
		width: 25
	},
	name: {
		paddingLeft: '0.5em',
		color: '#333333'
	}
};

class ImageCard extends Component {
	render() {
		const { classes, imageUrl, title, description, name, profilePic } = this.props;
		return (
			<Card className={classes.card}>
				<CardMedia className={classes.media} image={imageUrl} />
				<CardContent>
					<Typography className={classes.title} gutterBottom variant='h5' component='h2'>
						{title}
					</Typography>
					<div className={classes.body}>
						<Typography
							className={classes.description}
							variant='body1'
							color='inherit'
							component='span'
						>
							<TextTruncate
								line={2}
								truncateText=' …'
								text={description}
							></TextTruncate>
						</Typography>
					</div>
					<div className={classes.footer}>
						<Avatar
							src={profilePic ? profilePic : 'https://i.imgur.com/oTPg6oz.jpg'}
							className={classes.avatar}
						/>
						<Typography className={classes.name} variant='caption' component='span'>
							{name}
						</Typography>
					</div>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(ImageCard);
