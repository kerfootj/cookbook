import { Button, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';

import { withFirebase } from '../../Components/Firebase';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null
};

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	isInvalid() {
		const { username, email, passwordOne, passwordTwo } = this.state;
		return passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
	}

	onSubmit(e) {
		const { email, passwordOne } = this.state;
		const { firebase, history } = this.props;

		firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				console.log(authUser);
				this.setState({ ...INITIAL_STATE });
				history.push('/');
			})
			.catch(error => {
				console.log(error);
				this.setState({ error });
			});

		e.preventDefault();
	}

	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { error } = this.state;
		return (
			<form onSubmit={e => this.onSubmit(e)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							name='username'
							helperText='Username'
							onChange={e => this.handleInputChange(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							name='email'
							helperText='Email'
							onChange={e => this.handleInputChange(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							type='password'
							name='passwordOne'
							helperText='Password'
							onChange={e => this.handleInputChange(e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							type='password'
							name='passwordTwo'
							helperText='Confirm Password'
							onChange={e => this.handleInputChange(e)}
						/>
					</Grid>
					<Grid item>
						<Button
							disabled={this.isInvalid()}
							type='submit'
							variant='contained'
							color='primary'
						>
							Sign Up
						</Button>
					</Grid>
				</Grid>
				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

export default withRouter(withFirebase(SignUp));
