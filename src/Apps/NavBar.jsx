import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CookBook from './CookBook';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';

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
	state = {};

	render() {
		const { classes } = this.props;
		return (
			<AppBar color='default' className={classes.nav}>
				<Toolbar>
					<div className={classes.title}>
						<Button color='primary'>
							<Link to='/z' component={CookBook} className={classes.link}>
								My Cook Book
							</Link>
						</Button>
					</div>

					<Button variant='contained' color='secondary' className={classes.user}>
						<Link to='/login' component={SignIn} className={classes.link}>
							Login
						</Link>
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(NavBar);
