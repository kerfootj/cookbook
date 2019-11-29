import { Button, Grid, withStyles, Typography } from '@material-ui/core';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { withFirebase } from '../../Atoms/Firebase';
import {
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
  errorText: {
    color: '#f44336',
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
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        submit: false,
        google: false,
      },
    };
  }

  isInvalid = () => {
    const { email, password } = this.state;
    return password === '' || email === '';
  };

  handleSubmitEmail = async event => {
    const { email, password } = this.state;
    const { firebase } = this.props;

    event.preventDefault();

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
      const authUser = firebase.auth.currentUser;
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
    const { email } = this.state;
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
              <EmailTextField
                autoFocus
                email={email}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordTextField onChange={this.handleInputChange} />
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

export default withStyles(styles)(withFirebase(SignIn));
