import { Button } from '@material-ui/core';
import React from 'react';
import { withFirebase } from '../../Components/Firebase';

const SignOutButton = ({ firebase }) => <Button onClick={firebase.doSignOut}>Sign Out</Button>;

export default withFirebase(SignOutButton);
