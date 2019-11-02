import { Button, Modal, Paper, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignInForm from '../Molecules/Authentication/SignInForm';
import SignUpForum from '../Molecules/Authentication/SignUpForum';

const styles = theme => ({
  paper: {
    [theme.breakpoints.up('xs')]: {
      top: '5%',
      left: '5%',
      right: '5%',
      padding: '1em',
      marginBottom: '5%',
    },
    [theme.breakpoints.up('md')]: {
      top: `${50}%`,
      left: `${50}%`,
      transform: `translate(-${50}%, -${50}%)`,
      padding: '2em',
    },
    position: 'absolute',

    border: '1px solid #000',
    outline: 'none',
  },
  modal: {
    overflow: 'scroll',
  },
  signIn: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 350,
    },
  },
  signUp: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 450,
    },
  },
});

class Auth extends Component {
  static propTypes = {
    buttonText: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
    create: PropTypes.bool,
    open: PropTypes.bool,
  };

  static defaultProps = {
    classes: {},
    create: false,
    open: false,
  };

  constructor(props) {
    super(props);
    this.state = { open: props.open, create: props.create };
  }

  renderForm() {
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
  }

  render() {
    const { buttonText, classes } = this.props;
    const { create, open } = this.state;
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
        <Modal
          className={classes.modal}
          open={open}
          onClose={() => {
            this.setState({ open: false });
          }}
        >
          <Paper
            className={`${classes.paper} ${
              create ? classes.signUp : classes.signIn
            }`}
          >
            {this.renderForm()}
          </Paper>
        </Modal>
      </>
    );
  }
}

export default withStyles(styles)(Auth);
