import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SignInForm from '../Molecules/Authentication/SignInForm';
import SignUpForum from '../Molecules/Authentication/SignUpForum';

class Auth extends Component {
  static propTypes = {
    buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
    create: PropTypes.bool,
    open: PropTypes.bool,
  };

  static defaultProps = {
    create: false,
    open: false,
  };

  constructor(props) {
    super(props);
    this.state = { open: props.open, create: props.create };
  }

  renderForm = () => {
    const { create } = this.state;
    if (create) {
      return (
        <SignUpForum
          changeForm={() => {
            this.setState({ create: false });
          }}
        />
      );
    }
    return (
      <SignInForm
        changeForm={() => {
          this.setState({ create: true });
        }}
      />
    );
  };

  renderAltButton = () => {
    const { create } = this.state;
    return (
      <Button
        color="primary"
        onClick={() => {
          this.setState({ create: !create });
        }}
      >
        {create ? 'Log in instead' : 'Create account'}
      </Button>
    );
  };

  render() {
    const { buttonText } = this.props;
    const { open } = this.state;
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({ open: true });
          }}
        >
          {buttonText}
        </Button>
        <Dialog
          maxWidth="xs"
          open={open}
          onClose={() => {
            this.setState({ open: false });
          }}
        >
          <DialogContent>{this.renderForm()}</DialogContent>
          <DialogActions>
            <div style={{ width: '100%' }}>
              {this.renderAltButton()}
              <Button
                style={{ float: 'right' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({ open: false });
                }}
              >
                Close
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Auth;
