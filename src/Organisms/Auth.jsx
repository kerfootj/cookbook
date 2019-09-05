import { Button, Modal, Paper, withStyles } from '@material-ui/core';
import React, { Component } from 'react';

import SignInForm from '../Molecules/Authentication/SignInForm';
import SignUpForum from '../Molecules/Authentication/SignUpForum';

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

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false, create: props.create };
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
		const { open } = this.state;
		return (
			<>
				<Button
					variant='contained'
					color='primary'
					onClick={() => {
						this.setState({ open: true });
					}}
				>
					{buttonText}
				</Button>
				<Modal
					open={open}
					onClose={() => {
						this.setState({ open: false });
					}}
				>
					<Paper className={classes.modal}>{this.renderForm()}</Paper>
				</Modal>
			</>
		);
	}
}

export default withStyles(styles)(Auth);
