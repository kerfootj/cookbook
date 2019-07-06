import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CookBook from './CookBook';
import { Link } from 'react-router-dom';
import SignOut from './Authentication/SignOut';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
	nav: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	},
	user: {
		position: 'relative',
		marginLeft: 0
	},
	link: {
		textDecoration: 'none',
		all: 'inherit'
	}
};

class NavBar extends Component {
	renderButtons() {
		const { authUser, classes } = this.props;

		if (!authUser) {
			return (
				<div className={classes.user}>
					<Grid container spacing={1}>
						<Grid item>
							<Button variant='contained' color='secondary'>
								<Link to='/signup' className={classes.link}>
									Sign Up
								</Link>
							</Button>
						</Grid>
						<Grid item>
							<Button variant='contained' color='secondary'>
								<Link to='/login' className={classes.link}>
									Log In
								</Link>
							</Button>
						</Grid>
					</Grid>
				</div>
			);
		}

		return <SignOut />;
	}

	render() {
		const { classes } = this.props;
		return (
			<AppBar color='default' className={classes.nav}>
				<Toolbar>
					<div className={classes.title}>
						<Button color='primary'>
							<Link to='/' component={CookBook} className={classes.link}>
								My Cook Book
							</Link>
						</Button>
					</div>
					{this.renderButtons()}
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(NavBar);
