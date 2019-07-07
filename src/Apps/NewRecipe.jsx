import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import CloudUpload from '@material-ui/icons/CloudUploadOutlined';
import Compress from 'compress.js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

const styles = {
	rightIcon: {
		marginLeft: 4
	}
};

class NewRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: '',
			description: '',
			ingredients: [],
			instructions: [],
			image: undefined,
			uploading: false,
			waiting: false,
			added: false,
			errorSave: undefined,
			errorUpload: undefined
		};
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleMultiLineInputChange = event => {
		this.setState({ [event.target.name]: event.target.value.split(/\r?\n/) });
	};

	/**
	 * Takes an image file from an input field. The image is then compressed
	 * to be smaller than 10mb and uploaded to imgur.
	 */
	imageUploadHandler = event => {
		this.setState({
			uploading: true
		});

		const files = [...event.target.files];
		const compress = new Compress();
		compress
			.compress(files, {
				size: 10,
				quality: 0.8
			})
			.then(compressedFiles => {
				const data = new FormData();
				data.append('image', compressedFiles[0].data);

				const key = process.env.REACT_APP_IMGUR_CLIENT_ID;

				fetch('https://api.imgur.com/3/image', {
					method: 'POST',
					headers: new Headers({
						Authorization: `Client-ID ${key}`
					}),
					body: data
				})
					.then(response => response.json())
					.then(response => {
						if (response.status === 200) {
							this.setState({
								image: {
									id: response.data.id,
									deleteHash: response.data.deletehash
								},
								uploading: false,
								waiting: false
							});
						} else {
							this.setState({
								errorUpload: response.data.error,
								uploading: false,
								waiting: false
							});
						}
					})
					.catch(error => {
						this.setState({ errorUpload: error, uploading: false, waiting: false });
					});
			});
	};

	addRecipe = event => {
		const { recipe, description, ingredients, instructions, image, uploading } = this.state;

		if (uploading) {
			this.setState({ waiting: true });
		}

		//http://api.mycookbook.xyz/recipe
		axios
			.post('http://localhost:8080/recipe', {
				title: recipe,
				description: description,
				ingredients: ingredients,
				instructions: instructions,
				image: image
			})
			.then(() => {
				this.setState({ added: true });
			})
			.catch(error => {
				this.setState({ error: error });
			});

		event.preventDefault();
	};

	renderUploading() {
		const { uploading } = this.state;
		if (uploading) {
			return <p>Uploading image...</p>;
		}
		return null;
	}

	renderWaiting() {
		const { waiting } = this.state;
		if (waiting) {
			return <p>Please wait for your image to finish uploading</p>;
		}
		return null;
	}

	renderError() {
		const { errorSave, errorUpload } = this.state;
		if (errorUpload) {
			return <p>{errorUpload}</p>;
		}
		if (errorSave) {
			return <p>Error saving your recipe</p>;
		}
		return null;
	}

	render() {
		const { classes } = this.props;
		const { added } = this.state;

		return (
			<>
				<form onSubmit={this.addRecipe}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='body2'>Recipe Title</Typography>
							<TextField
								required
								variant='outlined'
								name='recipe'
								onChange={this.handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>Description</Typography>
							<TextField
								multiline
								rows={2}
								variant='outlined'
								name='description'
								onChange={this.handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>Ingredients</Typography>
							<TextField
								required
								fullWidth
								multiline
								rows={4}
								variant='outlined'
								placeholder='Put each ingredient on its own line'
								name='ingredients'
								onChange={this.handleMultiLineInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>Instructions</Typography>
							<TextField
								required
								fullWidth
								multiline
								rows={4}
								variant='outlined'
								placeholder='Put each step on its own line'
								name='instructions'
								onChange={this.handleMultiLineInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<input
								style={{ display: 'none' }}
								accept='image/*'
								id='raised-button-file'
								type='file'
								onChange={this.imageUploadHandler}
							/>
							<label htmlFor='raised-button-file'>
								<Button
									component='span'
									variant='contained'
									className={classes.button}
								>
									Add Image
									<CloudUpload className={classes.rightIcon} />
								</Button>
							</label>
						</Grid>
						<Grid item>
							<Button type='submit' variant='contained' color='primary'>
								Save
							</Button>
						</Grid>
					</Grid>
				</form>
				{this.renderUploading()}
				{this.renderWaiting()}
				{this.renderError()}
				{added && <Redirect to='/' />}
			</>
		);
	}
}

export default withStyles(styles)(NewRecipe);
