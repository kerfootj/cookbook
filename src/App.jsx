import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { indigo, purple } from '@material-ui/core/colors';

import CookBook from './Apps/CookBook';
import NavBar from './Apps/NavBar';
import NewRecipe from './Apps/NewRecipe';
import PrivateRoute from './Components/PrivateRoute';
import SignIn from './Apps/SignIn';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: indigo[500]
		},
		secondary: {
			main: purple[500]
		}
	}
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authed: false
		};
	}
	render() {
		const { authed } = this.state;
		return (
			<ThemeProvider theme={theme}>
				<Router>
					<NavBar />
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
							<Route exact path='/' component={CookBook} />
							<Route path='/login' component={SignIn} />
							<PrivateRoute authed={authed} path='/recipe' component={NewRecipe} />
						</Switch>
					</div>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;
