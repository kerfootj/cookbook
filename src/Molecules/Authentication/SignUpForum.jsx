import {
  Button,
  Grid,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import React, { Component } from 'react';

import axios from 'axios';
import { withFirebase } from '../../Atoms/Firebase/';
import { withRouter } from 'react-router-dom';

const styles = {
  socialContainer: {
    flexGrow: 1,
    textAlign: 'center',
  },
};

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({
        currentUser: PropTypes.shape({ updateProfile: PropTypes.func }),
      }),
      doCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
      doSignInWithGoogle: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }),
    changeForm: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
  };

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  isInvalid() {
    const { firstName, lastName, email, passwordOne, passwordTwo } = this.state;
    return (
      passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        firstName === '',
      lastName === ''
    );
  }

  onSubmitEmail(e) {
    const { email, passwordOne, firstName, lastName } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        let authUser = firebase.auth.currentUser;
        authUser.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        this.setState({ ...INITIAL_STATE });
        this.updateUser(authUser);
        history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  }

  onSubmitGoogle(e) {
    const { firebase, history } = this.props;
    firebase
      .doSignInWithGoogle()
      .then(() => {
        let authUser = firebase.auth.currentUser;
        this.setState({ ...INITIAL_STATE });
        this.updateUser(authUser);
        history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  updateUser(authUser) {
    axios.post('https://joel-cookbook-server.herokuapp.com/user', {
      uid: authUser.uid,
      name: authUser.displayName,
      photo: authUser.photoURL,
    });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, changeForm } = this.props;
    const { error } = this.state;
    return (
      <>
        <div className={classes.socialContainer}>
          <FacebookLoginButton
            align="center"
            // eslint-disable-next-line no-alert
            onClick={() => alert("Sorry Facebook isn't supported yet")}
          >
            <span>Sign up with Facebook</span>
          </FacebookLoginButton>
          <TwitterLoginButton
            align="center"
            // eslint-disable-next-line no-alert
            onClick={() => alert("Sorry Twitter isn't supported yet")}
          >
            <span>Sign up with Twitter</span>
          </TwitterLoginButton>
          <GoogleLoginButton
            align="center"
            onClick={e => this.onSubmitGoogle(e)}
          >
            <span>Sign up with Google</span>
          </GoogleLoginButton>
        </div>

        <br />
        <hr />
        <br />

        <form onSubmit={e => this.onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                name="firstName"
                placeholder="First Name"
                onChange={e => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                name="lastName"
                placeholder="Last Name"
                onChange={e => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                fullWidth
                variant="outlined"
                name="email"
                placeholder="Email"
                onChange={e => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                type="password"
                name="passwordOne"
                placeholder="Password"
                onChange={e => this.handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                type="password"
                name="passwordTwo"
                placeholder="Confirm Password"
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
                Create Account
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Already have an account?</Typography>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={changeForm}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
          {error && <p>{error.message}</p>}
        </form>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(withFirebase(SignUpForm)));
