import { Button, Modal, Paper, withStyles } from '@material-ui/core';

import React from 'react';
import SignInForm from '../CompositeComponents/Authentication/SignInForm';

const styles = {
	modal: {
		top: `${50}%`,
		left: `${50}%`,
		transform: `translate(-${50}%, -${50}%)`,
		position: 'absolute',
		width: 500,
		border: '2px solid #000',
		outline: 'none'
	}
};

const SignIn = ({ classes, buttonText }) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant='contained' color='secondary' onClick={handleOpen}>
				{buttonText}
			</Button>
			<Modal open={open} onClose={handleClose}>
				<Paper className={classes.modal}>
					<SignInForm />
				</Paper>
			</Modal>
		</>
	);
};
export default withStyles(styles)(SignIn);
