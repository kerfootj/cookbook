import { Button, Modal, Paper, withStyles } from '@material-ui/core';

import React from 'react';
import SignInForm from '../CompositeComponents/Authentication/SignInForm';

const styles = theme => ({
	modal: {
		[theme.breakpoints.up('xs')]: {
			top: `${10}%`,
			left: `${10}%`,
			transform: `translate(-${5}%, -${5}%)`
		},
		[theme.breakpoints.up('sm')]: {
			top: `${50}%`,
			left: `${50}%`,
			transform: `translate(-${50}%, -${50}%)`
		},
		position: 'absolute',
		padding: '2em',
		maxWidth: 350,
		border: '1px solid #000',
		outline: 'none'
	}
});

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
