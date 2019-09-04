import { Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Cookbook from './Cookbook';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import SignOut from '../CompositeComponents/Authentication/SignOut';
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
							<SignIn buttonText='Log In' />
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
							<Link to='/' component={Cookbook} className={classes.link}>
								My Cookbook
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
