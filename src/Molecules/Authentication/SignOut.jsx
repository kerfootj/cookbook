import { Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../../Atoms/Firebase';

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
