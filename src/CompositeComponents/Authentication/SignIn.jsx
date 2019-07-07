import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withFirebase } from '../../Components/Firebase';
import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	isInvalid() {
		const { email, password } = this.state;
		return password === '' || email === '';
	}

	onSubmit(e) {
		const { email, password } = this.state;
		const { firebase, history } = this.props;

		firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(authUser => {
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
			<>
				<form onSubmit={e => this.onSubmit(e)}>
					<Grid container spacing={2}>
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
								name='password'
								helperText='Password'
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
								Sign In
							</Button>
						</Grid>
					</Grid>
					{error && <p>{error.message}</p>}
				</form>
				<Typography variant='body2'>
					New to mycookbook? <Link to='/signup'>SIGN UP</Link>
				</Typography>
			</>
		);
	}
}

export default withRouter(withFirebase(SignIn));
