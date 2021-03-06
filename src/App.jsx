import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import Cookbook from './Pages/Cookbook';
import NavBar from './Organisms/NavBar';
import PrivateRoute from './Atoms/PrivateRoute';
import Recipe from './Pages/Recipe';
import RecipeForm from './Organisms/RecipeForm';
import { withFirebase } from './Atoms/Firebase';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#24292e',
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
      auth: PropTypes.shape({
        onAuthStateChanged: PropTypes.func,
        currentUser: PropTypes.shape({ getIdToken: PropTypes.func }),
      }),
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
      if (authUser) {
        firebase.auth.currentUser.getIdToken().then(token => {
          axios.defaults.headers.common.Authorization = token;
        });
      }
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
          <NavBar />
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Cookbook}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/recipes`}
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
