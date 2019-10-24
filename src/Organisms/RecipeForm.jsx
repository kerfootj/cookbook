import { Button, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { NumberTextField, RecipeTextField } from '../Atoms/TextFields';
import React, { Component } from 'react';

import CloudUpload from '@material-ui/icons/CloudUploadOutlined';
import Compress from 'compress.js';
import ImageUpload from '../Molecules/ImageUpload';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TimeInput from '../Molecules/TimeInput';
import axios from 'axios';
import { post } from '../Utils/Request';
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
	shared: 'public'
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
	},
	cloudIcon: {
		marginLeft: 4
	},
	upload: {
		display: 'none'
	},
	details: {
		padding: 30
	}
};

class RecipeForm extends Component {
	static propTypes = {
		classes: PropTypes.shape({}).isRequired,
		firebase: PropTypes.shape({}).isRequired,
		location: PropTypes.shape({ state: PropTypes.shape({ recipe: PropTypes.shape({}) }) })
	};

	static defaultProps = {
		location: {}
	};

	constructor(props) {
		super(props);
		const recipe = ((props.location || {}).state || {}).recipe || {};
		this.state = {
			recipe: Object.keys(recipe).length ? { ...recipe } : { ...EMPTY_RECIPE },
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
			create: !Object.keys(recipe).length
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
		const { recipe, status } = this.state;

		if (status.uploading) {
			this.setState({ status: { waiting: true } });
		}

		post('recipe', { ...recipe, private: recipe.shared !== 'public', uid: uid })
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

	renderWaiting = () => {
		const { status } = this.state;
		if (status.waiting) {
			return <p>Please wait for your image to finish uploading</p>;
		}
		return null;
	};

	renderError = () => {
		const { errors } = this.state;
		if (errors.upload) {
			return <p>{errors.upload}</p>;
		}
		if (errors.save) {
			return <p>Error saving your recipe</p>;
		}
		return null;
	};

	renderOptions = () => {
		const { classes, location } = this.props;
		const { valid } = this.state;
		const recipe = ((location || {}).state || {}).recipe || {};
		return (
			<>
				<Grid item xs={12}>
					<input
						className={classes.upload}
						accept='image/*'
						id='raised-button-file'
						type='file'
						onChange={this.handleImageUpload}
						multiple
					/>
					<label htmlFor='raised-button-file'>
						<Button component='span' variant='contained'>
							Add Image
							<CloudUpload className={classes.cloudIcon} />
						</Button>
					</label>
				</Grid>
				<TimeInput
					valid={valid}
					validate={this.validate}
					onChange={this.handleInputChange}
					defaultValues={recipe}
				/>
				<Grid item xs={4}>
					<NumberTextField
						title='Servings'
						min='1'
						onChange={this.handleInputChange}
						defaultValue={recipe ? recipe.servings : undefined}
					/>
				</Grid>
				<Grid item xs={8} />
				<Grid item xs={12}>
					<RadioGroup
						name='shared'
						defaultValue='public'
						onChange={this.handleInputChange}
					>
						<FormControlLabel
							value='private'
							control={<Radio />}
							label='Private - Only I can see this'
						/>
						<FormControlLabel
							value='public'
							control={<Radio />}
							label='Public - Anyone can see this'
						/>
					</RadioGroup>
				</Grid>
			</>
		);
	};

	renderDetails = () => {
		const { classes, location } = this.props;
		const recipe = ((location || {}).state || {}).recipe || {};
		return (
			<Grid container spacing={2} className={classes.details}>
				<Grid item xs={12}>
					<RecipeTextField
						title='Recipe Title'
						name='title'
						onChange={this.handleInputChange}
						defaultValue={recipe ? recipe.title : undefined}
					/>
				</Grid>
				<Grid item xs={12}>
					<RecipeTextField
						rows={3}
						title='Description'
						onChange={this.handleInputChange}
						defaultValue={recipe ? recipe.description : undefined}
					/>
				</Grid>
				<Grid item xs={12}>
					<RecipeTextField
						rows={8}
						title='Ingredients'
						placeholder='Put each ingredient on its own line'
						onChange={this.handleMultiLineInputChange}
						defaultValue={
							recipe && recipe.ingredients ? recipe.ingredients.join('\n') : undefined
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<RecipeTextField
						rows={8}
						title='Instructions'
						placeholder='Put each step on its own line'
						onChange={this.handleMultiLineInputChange}
						defaultValue={
							recipe && recipe.instructions
								? recipe.instructions.join('\n')
								: undefined
						}
					/>
				</Grid>
			</Grid>
		);
	};

	render() {
		const { classes, location } = this.props;
		const {
			recipe: { images },
			status,
			create
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
									{this.renderOptions()}
								</Grid>
							</Grid>
							<Grid item xs={12} md={8}>
								{this.renderDetails()}
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
				{create && location.pathname.includes('edit') && <Redirect to='/' />}
			</>
		);
	}
}

export default withStyles(styles)(withFirebase(RecipeForm));