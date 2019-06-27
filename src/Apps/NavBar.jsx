import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CookBook from './CookBook';
import { Link } from 'react-router-dom';
import LogIn from './LogIn';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';

const styles = {
	nav: {
		flexGrow: 1
	},
	title: {
		flexGrow: 1
	},
	login: {
		position: 'relative',
		marginLeft: 0
	},
	link: {
		textDecoration: 'none',
		all: 'inherit'
	}
};

class NavBar extends Component {
	state = {};

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

					<Button variant='contained' color='secondary' className={classes.login}>
						<Link to='/login' component={LogIn} className={classes.link}>
							Login
						</Link>
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(NavBar);
