import * as yup from 'yup';

import {
  Button,
  Grid,
  TextField,
  withStyles,
  Typography,
} from '@material-ui/core';
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
  errorText: {
    color: '#f44336',
  },
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: {
    email: false,
    submit: false,
    google: false,
  },
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

  validateEmail = async () => {
    const { email } = this.state;
    try {
      await yup
        .string()
        .email()
        .required()
        .validate(email);
      this.setState(prev => ({ error: { ...prev.error, email: false } }));
    } catch (error) {
      this.setState(prev => ({ error: { ...prev.error, email: true } }));
    }
  };

  handleSubmitEmail = async event => {
    event.preventDefault();

    const { email, password } = this.state;
    const { firebase } = this.props;

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
      const authUser = firebase.auth.currentUser;

      this.setState({ ...INITIAL_STATE });
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
      this.setState({ ...INITIAL_STATE });
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

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderErrorMessage = () => {
    const { classes } = this.props;
    const {
      error: { submit, google },
    } = this.state;

    if (!submit) return undefined;

    let text;
    if (submit) {
      text = 'Incorrect Email or Password';
    } else if (google) {
      text = "Couldn't sign into Google";
    }

    return (
      <Typography
        className={classes.errorText}
        variant="body2"
        display="block"
        gutterBottom
      >
        {text}
      </Typography>
    );
  };

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
          <GoogleLoginButton align="center" onClick={this.handleSubmitGoogle} />
        </div>
        <hr className={classes.divider} />
        {this.renderErrorMessage()}
        <form onSubmit={this.handleSubmitEmail}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                autoFocus
                fullWidth
                variant="outlined"
                name="email"
                placeholder="Email"
                error={error.email}
                helperText={
                  error.email ? 'Please enter a valid email address' : undefined
                }
                onChange={this.handleInputChange}
                onBlur={this.validateEmail}
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(withRouter(withFirebase(SignIn)));
