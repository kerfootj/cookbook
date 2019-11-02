import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Helmet from 'react-helmet';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Cookbook from './Pages/Cookbook';
import NavBar from './Organisms/NavBar';
import PrivateRoute from './Atoms/PrivateRoute';
import Recipe from './Pages/Recipe';
import RecipeForm from './Organisms/RecipeForm';
import { withFirebase } from './Atoms/Firebase/index';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#37474f',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

class App extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({ onAuthStateChanged: PropTypes.func }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ authUser: authUser || null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Helmet
          bodyAttributes={{ style: 'background-color : #f0f0f0; margin : 0px' }}
        />
        <Router basename="/">
          <NavBar authUser={authUser} />
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Cookbook}
            />
            <PrivateRoute
              exact
              authUser={authUser}
              path={`${process.env.PUBLIC_URL}/recipe/new`}
              component={RecipeForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/recipe/:recipeId/edit`}
              component={RecipeForm}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/recipe/:recipeId`}
              component={Recipe}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default withFirebase(App);
