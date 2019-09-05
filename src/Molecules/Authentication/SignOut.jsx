import { Button } from '@material-ui/core';
import React from 'react';
import { withFirebase } from '../../Atoms/Firebase';

const SignOutButton = ({ firebase }) => (
	<Button variant='outlined' onClick={firebase.doSignOut}>
		Sign Out
	</Button>
);

export default withFirebase(SignOutButton);
