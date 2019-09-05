import { AppBar, Button, Grid, Toolbar, withStyles } from '@material-ui/core';
import React, { Component } from 'react';

import Auth from './Auth';
import Cookbook from '../Pages/Cookbook';
import { Link } from 'react-router-dom';
import SignOut from '../Molecules/Authentication/SignOut';

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
		all: 'inherit',
		color: '#202020'
	},
	logo: {
		width: '28px',
		height: 'auto',
		paddingRight: '9px'
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
							<Auth buttonText='Sign Up' create={true} />
						</Grid>
						<Grid item>
							<Auth buttonText='Log In' create={false} />
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
						<Button color='secondary'>
							<Link to='/' component={Cookbook} className={classes.link}>
								<img
									src={`${process.env.PUBLIC_URL}/favicon.ico`}
									alt='logo'
									className={classes.logo}
								/>
								<b>My Cookbook</b>
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
