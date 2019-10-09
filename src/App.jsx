import { Link, Route, HashRouter as Router, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Cookbook from './Pages/Cookbook';
import Helmet from 'react-helmet';
import NavBar from './Organisms/NavBar';
import NewRecipe from './Pages/NewRecipe';
import PrivateRoute from './Atoms/PrivateRoute';
import Recipe from './Pages/Recipe';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { withFirebase } from './Atoms/Firebase/index';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1565c0'
		},
		secondary: {
			main: '#37474f'
		}
	},
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'none'
			}
		}
	}
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authUser: null
		};
	}

	componentDidMount() {
		const { firebase } = this.props;
		this.listener = firebase.auth.onAuthStateChanged(authUser => {
			authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
		});
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		const { authUser } = this.state;
		return (
			<ThemeProvider theme={theme}>
				<Helmet bodyAttributes={{ style: 'background-color : #f0f0f0' }} />
				<Router basename='/'>
					<NavBar authUser={authUser} />
					<div>
						<nav>
							<ul>
								<li>
									<Link to='/' component={Cookbook}>
										Home
									</Link>
								</li>
								<li>
									<Link to='/login'>Log In</Link>
								</li>
							</ul>
						</nav>
						<Switch>
							<Route exact path={process.env.PUBLIC_URL + '/'} component={Cookbook} />
							<Route
								path={process.env.PUBLIC_URL + '/recipe/:recipeId'}
								component={Recipe}
							/>
							<PrivateRoute
								authUser={authUser}
								path={process.env.PUBLIC_URL + '/new'}
								component={NewRecipe}
							/>
						</Switch>
					</div>
				</Router>
			</ThemeProvider>
		);
	}
}

export default withFirebase(App);
