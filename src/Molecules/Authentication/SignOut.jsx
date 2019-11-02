import { Button } from '@material-ui/core';
import React from 'react';
import { withFirebase } from '../../Atoms/Firebase';
import PropTypes from 'prop-types';

const SignOutButton = ({ firebase }) => (
  <Button variant="outlined" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignOutButton);
