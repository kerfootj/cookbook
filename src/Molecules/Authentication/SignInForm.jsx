import { Button, Grid, TextField, withStyles } from '@material-ui/core';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Atoms/Firebase';

const styles = {
  socialContainer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  divider: {
    margin: '10px 0px 10px',
  },
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignIn extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({
        currentUser: PropTypes.shape({ uid: PropTypes.string }),
      }),
      doSignInWithEmailAndPassword: PropTypes.func.isRequired,
      doSignInWithGoogle: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  isInvalid = () => {
    const { email, password } = this.state;
    return password === '' || email === '';
  };

  onSubmitEmail = e => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        const authUser = firebase.auth.currentUser;
        this.setState({ ...INITIAL_STATE });
        this.updateUser(authUser);
        history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  };

  onSubmitGoogle = () => {
    const { firebase, history } = this.props;
    firebase
      .doSignInWithGoogle()
      .then(() => {
        const authUser = firebase.auth.currentUser;
        this.setState({ ...INITIAL_STATE });
        this.updateUser(authUser);
        history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  updateUser = authUser => {
    axios.post('https://joel-cookbook-server.herokuapp.com/user', {
      uid: authUser.uid,
      name: authUser.displayName,
      photo: authUser.photoURL,
    });
  };

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;
    return (
      <>
        <div className={classes.socialContainer}>
          <FacebookLoginButton
            align="center"
            // eslint-disable-next-line no-alert
            onClick={() => alert("Sorry Facebook isn't supported yet")}
          />
          <TwitterLoginButton
            align="center"
            // eslint-disable-next-line no-alert
            onClick={() => alert("Sorry Twitter isn't supported yet")}
          />
          <GoogleLoginButton
            align="center"
            onClick={e => this.onSubmitGoogle(e)}
          />
        </div>
        <hr className={classes.divider} />
        <form onSubmit={e => this.onSubmitEmail(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                autoFocus
                fullWidth
                variant="outlined"
                name="email"
                placeholder="Email"
                onChange={e => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                disabled={this.isInvalid()}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
          {error && <p>{error.message}</p>}
        </form>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(withFirebase(SignIn)));
