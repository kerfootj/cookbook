import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SignInForm from '../Molecules/Authentication/SignInForm';
import Avatar from '../Atoms/Avatar';
import SignUpForum from '../Molecules/Authentication/SignUpForum';
import { withFirebase } from '../Atoms/Firebase';

const styles = theme => ({
  buttons: {
    marginLeft: theme.spacing(),
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      color: 'hsla(0,0%,100%,.75)',
      borderColor: 'hsla(0,0%,100%,.75)',
    },
  },
});

class Auth extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({ currentUser: PropTypes.shape({}) }),
    }),
    open: PropTypes.bool,
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    firebase: null,
    open: false,
    classes: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      open: { signUp: props.open, signIn: false },
    };
  }

  handleClick = name => {
    this.setState({ open: { [name]: true } });
  };

  handleClose = () => {
    this.setState({ open: {} });
  };

  handleSwitchForm = () => {
    this.setState(prev => ({
      open: {
        signUp: !prev.open.signUp,
        signIn: !prev.open.signIn,
      },
    }));
  };

  renderForm = () => {
    const { open } = this.state;

    if (open.signUp) {
      return (
        <SignUpForum
          changeForm={() => {
            this.setState({ create: false });
          }}
        />
      );
    }

    if (open.signIn) {
      return (
        <SignInForm
          changeForm={() => {
            this.setState({ create: true });
          }}
        />
      );
    }

    return undefined;
  };

  render() {
    const { firebase, classes } = this.props;
    const { open } = this.state;

    const authenticated =
      ((firebase || {}).auth || {}).currentUser || undefined;

    if (authenticated) {
      return (
        <Avatar
          src={authenticated.photoURL}
          size="large"
          name={authenticated.displayName}
          display="left"
        />
      );
    }

    return (
      <>
        <Button
          className={classes.buttons}
          variant="text"
          onClick={() => this.handleClick('signUp')}
        >
          Sign Up
        </Button>
        <Button
          className={classes.buttons}
          variant="outlined"
          onClick={() => this.handleClick('signIn')}
        >
          Sign In
        </Button>
        <>
          <Dialog
            maxWidth="xs"
            open={!authenticated && (open.signIn || open.signUp)}
            onClose={() => {
              this.setState({ open: {} });
            }}
          >
            <DialogContent>{this.renderForm()}</DialogContent>
            <DialogActions>
              <div style={{ width: '100%' }}>
                <Button color="primary" onClick={this.handleSwitchForm}>
                  {open.signUp ? 'Log in instead' : 'Create account'}
                </Button>
                <Button
                  style={{ float: 'right' }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleClose}
                >
                  Close
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </>
      </>
    );
  }
}

export default withStyles(styles)(withFirebase(Auth));
