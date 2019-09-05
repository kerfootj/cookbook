import { Button, Grid, TextField, Typography } from '@material-ui/core';
import {
	FacebookLoginButton,
	GoogleLoginButton,
	TwitterLoginButton
} from 'react-social-login-buttons';
import React, { Component } from 'react';

import { withFirebase } from '../../Atoms/Firebase/';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null
};

class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	isInvalid() {
		const { username, email, passwordOne, passwordTwo } = this.state;
		return passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
	}

	onSubmitEmail(e) {
		const { email, passwordOne, username } = this.state;
		const { firebase, history } = this.props;

		firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(() => {
				let authUser = firebase.auth.currentUser;
				authUser.updateProfile({
					displayName: username
				});
				this.setState({ ...INITIAL_STATE });
				history.push('/');
			})
			.catch(error => {
				console.log(error);
				this.setState({ error });
			});
		e.preventDefault();
	}

	onSubmitGoogle(e) {
		const { firebase, history } = this.props;
		firebase
			.doSignInWithGoogle()
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				history.push('/');
			})
			.catch(error => {
				console.log(error);
				this.setState({ error });
			});
	}

	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { changeForm } = this.props;
		const { error } = this.state;
		return (
			<>
				<div style={{ flexGrow: 1, textAlign: 'center' }}>
					<FacebookLoginButton
						align='center'
						onClick={() => alert("Sorry Facebook isn't supported yet")}
					>
						<span>Sign up with Facebook</span>
					</FacebookLoginButton>
					<TwitterLoginButton
						align='center'
						onClick={() => alert("Sorry Twitter isn't supported yet")}
					>
						<span>Sign up with Twitter</span>
					</TwitterLoginButton>
					<GoogleLoginButton align='center' onClick={e => this.onSubmitGoogle(e)}>
						<span>Sign up with Google</span>
					</GoogleLoginButton>
				</div>

				<br />
				<hr />
				<br />

				<form onSubmit={e => this.onSubmit(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant='outlined'
								name='username'
								placeholder='Username'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant='outlined'
								name='email'
								placeholder='Email'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant='outlined'
								type='password'
								name='passwordOne'
								placeholder='Password'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								variant='outlined'
								type='password'
								name='passwordTwo'
								placeholder='Confirm Password'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								fullWidth
								disabled={this.isInvalid()}
								type='submit'
								variant='contained'
								color='primary'
							>
								Create Account
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body1'>Already have an account?</Typography>
							<Button
								fullWidth
								variant='contained'
								color='secondary'
								onClick={changeForm}
							>
								Sign In
							</Button>
						</Grid>
					</Grid>
					{error && <p>{error.message}</p>}
				</form>
			</>
		);
	}
}

export default withRouter(withFirebase(SignUpForm));
