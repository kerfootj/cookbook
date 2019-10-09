import React from 'react';
import loadingGif from '../Pictures/burger.gif';
import { withStyles } from '@material-ui/styles';

const styles = {
	container: {
		minWidth: '100%'
	},
	image: {
		display: 'block',
		margin: 'auto',
		paddingTop: '2em'
	}
};

const Loading = ({ classes }) => {
	return (
		<div className={classes.container}>
			<img src={loadingGif} alt='loading' className={classes.image} />
		</div>
	);
};

export default withStyles(styles)(Loading);
