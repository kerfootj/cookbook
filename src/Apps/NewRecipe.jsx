import { Button, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import axios from 'axios';

class NewRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: '',
			description: '',
			image: ''
		};
	}

	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	addRecipe(e) {
		const { recipe, description, image } = this.state;
		e.preventDefault();
		axios
			.post('http://api.mycookbook.xyz/recipe', {
				title: recipe,
				description: description,
				imageUrl: image
			})
			.then(() => {
				this.setState({ added: true });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	render() {
		const { added } = this.state;
		return (
			<>
				<form onSubmit={e => this.addRecipe(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								helperText='Recipe Name'
								variant='outlined'
								name='recipe'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								helperText='Description'
								variant='outlined'
								name='description'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								helperText='Image'
								variant='outlined'
								name='image'
								onChange={e => this.handleInputChange(e)}
							/>
						</Grid>
						<Grid item>
							<Button type='submit' variant='contained' color='priamry'>
								Save
							</Button>
						</Grid>
					</Grid>
				</form>
				{added && <Redirect to='/' />}
			</>
		);
	}
}

export default NewRecipe;
