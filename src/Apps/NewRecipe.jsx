import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Compress from 'compress.js';
import ImageUpload from '../CompositeComponents/ImageUpload';
import RecipeDetails from '../CompositeComponents/RecipeDetails';
import RecipeOptions from '../CompositeComponents/RecipeOptions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withFirebase } from '../Components/Firebase';

class NewRecipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: '',
			description: '',
			ingredients: [],
			instructions: [],
			image: undefined,
			private: false,
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

	handleButtonChange = event => {
		const value = event.target.value === 'private' ? true : false;
		this.setState({ private: value });
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
		const {
			firebase: {
				auth: {
					currentUser: { uid }
				}
			}
		} = this.props;
		const { recipe, description, ingredients, instructions, image, uploading } = this.state;

		if (uploading) {
			this.setState({ waiting: true });
		}

		axios
			.post('https://joel-cookbook-server.herokuapp.com/recipe', {
				title: recipe,
				image: image,
				description: description,
				ingredients: ingredients,
				instructions: instructions,
				prep: 10,
				cook: 15,
				ready: 0,
				servings: 1,
				private: false,
				uid: uid
			})
			.then(() => {
				this.setState({ added: true });
			})
			.catch(error => {
				this.setState({ error: error });
			});

		event.preventDefault();
	};

	cancelRecipe = () => {
		const { image } = this.state;

		if (image.deleteHash) {
			const key = process.env.REACT_APP_IMGUR_CLIENT_ID;
			axios
				.delete(`https://api.imgur.com/3/image/${image.deleteHash}`, {
					headers: { Authorization: `Client-ID ${key}` }
				})
				.then(response => {
					console.log(response);
					this.setState({ cancel: true });
				})
				.catch(error => {
					console.log(error);
					this.setState({ cancel: true });
				});
		}
	};

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
		const { added, cancel, image, uploading } = this.state;

		return (
			<>
				<form onSubmit={this.addRecipe}>
					<Grid container>
						<Grid item lg={1} xl={2} />
						<Grid
							container
							item
							xs={12}
							lg={10}
							xl={8}
							style={{ backgroundColor: '#FFFFFF' }}
						>
							<Grid item xs={12} md={4}>
								<Grid container spacing={2} style={{ padding: 30 }}>
									<Grid item xs={12}>
										<ImageUpload image={image} uploading={uploading} />
									</Grid>
									<RecipeOptions
										handleButtonChange={this.handleButtonChange}
										handleInputChange={this.handleInputChange}
										imageUploadHandler={this.imageUploadHandler}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12} md={8} spacing={2}>
								<RecipeDetails
									handleInputChange={this.handleInputChange}
									handleMultiLineInputChange={this.handleMultiLineInputChange}
								/>
							</Grid>
							<Grid item xs={12} />
							<Grid item style={{ padding: 30 }}>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									style={{ paddingLeft: 80, paddingRight: 80 }}
								>
									Save
								</Button>
							</Grid>
							<Grid item style={{ paddingTop: 30 }}>
								<Button
									variant='contained'
									color='secondary'
									style={{ paddingLeft: 38, paddingRight: 38 }}
									onClick={this.cancelRecipe}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
						<Grid item lg={1} xl={2} />
					</Grid>
				</form>
				{this.renderWaiting()}
				{this.renderError()}
				{(added || cancel) && <Redirect to='/' />}
			</>
		);
	}
}

export default withFirebase(NewRecipe);
