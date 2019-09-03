import { Button, Grid, TextField, Typography, withStyles } from '@material-ui/core';
import {
	FacebookLoginButton,
	GoogleLoginButton,
	TwitterLoginButton
} from 'react-social-login-buttons';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withFirebase } from '../../Components/Firebase';
import { withRouter } from 'react-router-dom';

const styles = {
	signUp: {
		paddingTop: '1em'
	}
};

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

	onSubmitEmail(e) {
		const { email, password } = this.state;
		const { firebase, history } = this.props;

		firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
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
		const { classes } = this.props;
		const { error } = this.state;
		return (
			<>
				<div style={{ flexGrow: 1, textAlign: 'center' }}>
					<FacebookLoginButton
						align='center'
						onClick={() => alert("Sorry Facebook isn't supported yet")}
					></FacebookLoginButton>
					<TwitterLoginButton
						align='center'
						onClick={() => alert("Sorry Twitter isn't supported yet")}
					/>
					<GoogleLoginButton
						align='center'
						onClick={e => this.onSubmitGoogle(e)}
					></GoogleLoginButton>
				</div>

				<br />
				<hr />
				<br />

				<form onSubmit={e => this.onSubmitEmail(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete
								autoFocus
								fullWidth
								variant='outlined'
								name='email'
								placeholder='Email'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoComplete
								fullWidth
								variant='outlined'
								type='password'
								name='password'
								placeholder='Password'
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
								Login
							</Button>
						</Grid>
					</Grid>
					{error && <p>{error.message}</p>}
				</form>
				<br />
				<div className={classes.signUp}>
					<Typography variant='body2'>
						New to mycookbook?{' '}
						<b>
							<Link to='/signup'>Create an account</Link>
						</b>
						.
					</Typography>
				</div>
			</>
		);
	}
}

export default withStyles(styles)(withRouter(withFirebase(SignIn)));
