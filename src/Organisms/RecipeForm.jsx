import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Compress from 'compress.js';
import ImageUpload from '../Molecules/ImageUpload';
import PropTypes from 'prop-types';
import RecipeDetails from '../Molecules/RecipeDetails';
import RecipeOptions from '../Molecules/RecipeOptions';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withFirebase } from '../Atoms/Firebase';
import { withStyles } from '@material-ui/styles';

const EMPTY_RECIPE = {
	title: '',
	description: '',
	ingredients: [],
	instructions: [],
	images: [],
	prep: undefined,
	cook: undefined,
	ready: undefined,
	shared: false
};

const styles = {
	container: {
		backgroundColor: '#FFFFFF'
	},
	sublit: {
		paddingLeft: 80,
		paddingRight: 80
	},
	cancel: {
		color: '#fff',
		backgroundColor: '#b71c1c',
		'&:hover': {
			backgroundColor: '#d50000'
		},
		paddingLeft: 38,
		paddingRight: 38
	},
	grid: {
		padding: 30
	}
};

class RecipeForm extends Component {
	static propTypes = {
		classes: PropTypes.shape({}).isRequired,
		firebase: PropTypes.shape({}).isRequired,
		recipe: PropTypes.shape({
			_id: PropTypes.number,
			cook: PropTypes.string,
			description: PropTypes.string,
			images: PropTypes.arrayOf(
				PropTypes.shape({
					deleteHash: PropTypes.string,
					id: PropTypes.string
				})
			),
			ingredients: PropTypes.arrayOf(PropTypes.string),
			instructions: PropTypes.arrayOf(PropTypes.string),
			prep: PropTypes.string,
			private: PropTypes.bool,
			ready: PropTypes.string,
			servings: PropTypes.string,
			title: PropTypes.string,
			uid: PropTypes.string
		})
	};

	static defaultProps = {
		recipe: undefined
	};

	constructor(props) {
		super(props);
		const { recipe } = this.props;
		this.state = {
			recipe: recipe ? { ...recipe } : { ...EMPTY_RECIPE },
			status: {
				uploading: false,
				waiting: false,
				added: false,
				cancel: false
			},
			errors: {
				save: false,
				upload: false
			},
			valid: {
				prep: true,
				cook: true,
				ready: true
			},
			create: !recipe
		};
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState(prev => ({
			recipe: {
				...prev.recipe,
				[name]: value
					.replace(/\s\s+/g, ' ')
					.replace(/\n\s*\n/g, ' ')
					.trim()
			}
		}));
	};

	handleMultiLineInputChange = event => {
		const { name, value } = event.target;
		this.setState(prev => ({
			recipe: {
				...prev.recipe,
				[name]: value
					.replace(/\n\s*\n/g, '\n')
					.replace(/\s\s+/g, ' ')
					.trim()
					.split(/\r?\n/)
			}
		}));
	};

	handleButtonChange = event => {
		const value = event.target.value === 'private';
		this.setState(prev => ({
			recipe: {
				...prev.recipe,
				shared: value
			}
		}));
	};

	validateField = () => {
		const {
			recipe: { cook, prep, ready }
		} = this.state;
		let valid = {};

		const timeRe = /(^\d+h( +[0-5]?\dm)?$|^[0-5]?\dm$)/;

		valid.prep = !(prep && !timeRe.test(prep));
		valid.cook = !(cook && !timeRe.test(cook));
		valid.ready = !(ready && !timeRe.test(ready));

		this.setState({
			valid: valid
		});
	};

	/**
	 * Takes an image file from an input field. The image is then compressed
	 * to be smaller than 10mb and uploaded to imgur.
	 */
	handleImageUpload = event => {
		this.setState({
			status: { uploading: true }
		});

		const files = [...event.target.files];
		const compress = new Compress();
		compress
			.compress(files, {
				size: 10,
				quality: 0.8
			})
			.then(compressedFiles => {
				compressedFiles.forEach(file => {
					this.uploadToImgur(file.data);
				});
			});
	};

	uploadToImgur = image => {
		const data = new FormData();
		data.append('image', image);

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
					this.setState(prev => ({
						recipe: {
							...prev.recipe,
							images: [
								...prev.recipe.images,
								{ id: response.data.id, deleteHash: response.data.deletehash }
							]
						},
						status: {
							uploading: false,
							waiting: false
						}
					}));
				} else {
					this.setState({
						errors: {
							upload: true
						},
						status: {
							uploading: false,
							waiting: false
						}
					});
				}
			})
			.catch(error => {
				this.setState({
					errors: {
						upload: true
					},
					status: {
						uploading: false,
						waiting: false
					}
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
		const {
			recipe: {
				title,
				description,
				ingredients,
				instructions,
				image,
				status,
				prep,
				cook,
				ready,
				servings,
				shared
			}
		} = this.state;

		if (status.uploading) {
			this.setState({ status: { waiting: true } });
		}

		axios
			.post('https://joel-cookbook-server.herokuapp.com/recipe', {
				title: title,
				image: image,
				description: description,
				ingredients: ingredients,
				instructions: instructions,
				prep: prep,
				cook: cook,
				ready: ready,
				servings: servings,
				private: shared,
				uid: uid
			})
			.then(() => {
				this.setState({ status: { added: true } });
			})
			.catch(error => {
				this.setState({ errors: { save: error } });
			});
		event.preventDefault();
	};

	cancelRecipe = () => {
		const {
			recipe: { images },
			create
		} = this.state;

		if (create && images.length) {
			const key = process.env.REACT_APP_IMGUR_CLIENT_ID;
			images.forEach(image => {
				axios
					.delete(`https://api.imgur.com/3/image/${image.deleteHash}`, {
						headers: { Authorization: `Client-ID ${key}` }
					})
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						console.log(error);
					});
			});
		}
		this.setState({ status: { cancel: true } });
	};

	renderWaiting() {
		const { status } = this.state;
		if (status.waiting) {
			return <p>Please wait for your image to finish uploading</p>;
		}
		return null;
	}

	renderError() {
		const { errors } = this.state;
		if (errors.upload) {
			return <p>{errors.upload}</p>;
		}
		if (errors.save) {
			return <p>Error saving your recipe</p>;
		}
		return null;
	}

	render() {
		const { classes } = this.props;
		const {
			recipe: { images },
			status,
			valid
		} = this.state;

		return (
			<>
				<form onSubmit={this.addRecipe}>
					<Grid container>
						<Grid item lg={1} xl={2} />
						<Grid container item xs={12} lg={10} xl={8} className={classes.container}>
							<Grid item xs={12} md={4}>
								<Grid container spacing={2} className={classes.grid}>
									<Grid item xs={12}>
										<ImageUpload
											image={images.length ? images[0] : undefined}
											uploading={status.uploading}
										/>
									</Grid>
									<RecipeOptions
										valid={valid}
										handleButtonChange={this.handleButtonChange}
										handleInputChange={this.handleInputChange}
										onImageUpload={this.handleImageUpload}
										validate={this.validateField}
									/>
								</Grid>
							</Grid>
							<Grid item xs={12} md={8}>
								<RecipeDetails
									handleInputChange={this.handleInputChange}
									handleMultiLineInputChange={this.handleMultiLineInputChange}
								/>
							</Grid>
							<Grid item xs={12} />
							<Grid item className={classes.grid}>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									className={classes.sublit}
								>
									Save
								</Button>
							</Grid>
							<Grid item className={classes.grid}>
								<Button
									variant='contained'
									className={classes.cancel}
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
				{(status.added || status.cancel) && <Redirect to='/' />}
			</>
		);
	}
}

export default withStyles(styles)(withFirebase(RecipeForm));
