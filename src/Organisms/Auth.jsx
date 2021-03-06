import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import UserMenu from 'Organisms/UserMenu';
import SignInForm from 'Molecules/Authentication/SignInForm';
import SignUpForum from 'Molecules/Authentication/SignUpForum';
import { withFirebase } from 'Atoms/Firebase';
import Avatar from '../Atoms/Avatar';

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
  name: {
    paddingRight: theme.spacing(1),
    color: 'white',
    cursor: 'pointer',
  },
  avatar: {
    cursor: 'pointer',
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
      open: { signUp: props.open, signIn: false, anchorEl: null },
    };
  }

  handleClick = name => {
    this.setState({ open: { [name]: true } });
  };

  handleToggleMenu = event => {
    this.setState({ anchorEl: event ? event.currentTarget : null });
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
    const { open, anchorEl } = this.state;

    const authenticated =
      ((firebase || {}).auth || {}).currentUser || undefined;

    if (authenticated) {
      return (
        <>
          <Avatar
            onClick={this.handleToggleMenu}
            src={authenticated.photoURL}
            imgProps={{
              className: classes.avatar,
              size: 'large',
            }}
            name={authenticated.displayName}
            nameProps={{ className: classes.name, display: 'left' }}
          />
          <UserMenu
            anchorEl={anchorEl}
            onClose={() => this.handleToggleMenu(null)}
          />
        </>
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
