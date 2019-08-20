import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { blue, indigo } from '@material-ui/core/colors';

import CookBook from './Apps/CookBook';
import Helmet from 'react-helmet';
import NavBar from './Apps/NavBar';
import NewRecipe from './Apps/NewRecipe';
import PrivateRoute from './Components/PrivateRoute';
import Recipe from './Apps/Recipe';
import SignIn from './Apps/SignIn';
import SignUp from './CompositeComponents/Authentication/SignUp';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { withFirebase } from './Components/Firebase';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: indigo[500]
		},
		secondary: {
			main: blue[700]
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
				<Router>
					<NavBar authUser={authUser} />
					<div>
						<nav>
							<ul>
								<li>
									<Link to='/' component={CookBook}>
										Home
									</Link>
								</li>
								<li>
									<Link to='/login'>Log In</Link>
								</li>
							</ul>
						</nav>
						<Switch>
							<Route exact path={process.env.PUBLIC_URL + '/'} component={CookBook} />
							<Route path={process.env.PUBLIC_URL + '/signup'} component={SignUp} />
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
