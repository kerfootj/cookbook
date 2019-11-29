import { Button, Grid, withStyles } from '@material-ui/core';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import * as yup from 'yup';
import { withFirebase } from '../../Atoms/Firebase';
import TextField, {
  EmailTextField,
  PasswordTextField,
} from '../../Atoms/textfields/TextFields';

const styles = {
  socialContainer: {
    flexGrow: 1,
    textAlign: 'center',
  },
  divider: {
    margin: '10px 0px 10px',
  },
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
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: {},
    };
  }

  isInvalid = () => {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      valid,
    } = this.state;
    return (
      !valid ||
      passwordOne === '' ||
      passwordTwo === '' ||
      email === '' ||
      firstName === '' ||
      lastName === ''
    );
  };

  validatePasswords = async () => {
    const { passwordOne, passwordTwo } = this.state;

    // Validate password
    if (!passwordOne) return;
    try {
      await yup
        .string()
        .min(8, 'Password must be at least 8 charaters long')
        .required('A password is required')
        .validate(passwordOne);
      this.setState(prev => ({ error: { ...prev.error, pw1: false } }));
    } catch (error) {
      this.setState(prev => ({
        valid: false,
        error: { ...prev.error, pw1: error.message },
      }));
      return;
    }

    // Validate confirm password
    if (!passwordTwo) return;
    try {
      await yup
        .string()
        .matches(new RegExp(passwordOne), "Passwords don't match")
        .required('Please confirm your password')
        .validate(passwordTwo);
      this.setState(prev => ({
        valid: true,
        error: { ...prev.error, pw2: false },
      }));
    } catch (error) {
      this.setState(prev => ({
        valid: false,
        error: { ...prev.error, pw2: error.message },
      }));
    }
  };

  handleSubmitEmail = async event => {
    const { email, passwordOne, firstName, lastName } = this.state;
    const { firebase } = this.props;

    event.preventDefault();

    try {
      await firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      const authUser = firebase.auth.currentUser;
      authUser.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      this.updateUser(authUser);
    } catch (error) {
      this.setState(prev => ({ error: { ...prev.error, submit: true } }));
    }
  };

  handleSubmitGoogle = async () => {
    const { firebase } = this.props;
    try {
      await firebase.doSignInWithGoogle();
      const authUser = firebase.auth.currentUser;
      this.updateUser(authUser);
    } catch (error) {
      this.setState(prev => ({ error: { ...prev.error, google: true } }));
    }
  };

  updateUser = authUser => {
    axios.post('https://joel-cookbook-server.herokuapp.com/user', {
      uid: authUser.uid,
      name: authUser.displayName,
      photo: authUser.photoURL,
    });
  };

  handleInputChange = event => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value }, () => {
      if (name === 'passwordTwo') {
        this.validatePasswords();
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { email, error } = this.state;
    return (
      <div className={classes.container}>
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
          <GoogleLoginButton align="center" onClick={this.handleSubmitGoogle}>
            <span>Sign up with Google</span>
          </GoogleLoginButton>
        </div>
        <hr className={classes.divider} />
        <form onSubmit={this.handleSubmitEmail}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                fullWidth
                name="firstName"
                placeholder="First Name"
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <EmailTextField email={email} onChange={this.handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <PasswordTextField
                autoComplete="new-password"
                name="passwordOne"
                error={!!error.pw1}
                helperText={error.pw1}
                onChange={this.handleInputChange}
                onBlur={this.validatePasswords}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordTextField
                autoComplete="new-password"
                name="passwordTwo"
                placeholder="Confirm Password"
                error={!!error.pw2}
                helperText={error.pw2}
                onChange={this.handleInputChange}
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
          </Grid>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(withFirebase(SignUpForm));
