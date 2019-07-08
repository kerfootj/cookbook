import {
	Button,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@material-ui/core';
import React, { Component } from 'react';

import CloudUpload from '@material-ui/icons/CloudUploadOutlined';
import Compress from 'compress.js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withFirebase } from '../Components/Firebase';
import { withStyles } from '@material-ui/styles';

const styles = {
	rightIcon: {
		marginLeft: 4
	},
	image: {
		marginTop: 16,
		display: 'block',
		maxWidth: 280,
		width: '100%',
		height: 'auto'
	},
	boarderDashed: {
		border: '1px dashed #021a40'
	},
	boarderSolid: {
		border: '1px solid #021a40'
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

		// https://joel-cookbook-server.herokuapp.com
		axios
			.post('http://localhost:8080/recipe', {
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

	renderMainInput() {
		return (
			<Grid container spacing={2} style={{ padding: 30 }}>
				<Grid item xs={12}>
					<Typography variant='body2'>Recipe Title</Typography>
					<TextField
						fullWidth
						required
						variant='outlined'
						name='recipe'
						onChange={this.handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant='body2'>Description</Typography>
					<TextField
						fullWidth
						multiline
						rows={3}
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
						rows={8}
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
						rows={8}
						variant='outlined'
						placeholder='Put each step on its own line'
						name='instructions'
						onChange={this.handleMultiLineInputChange}
					/>
				</Grid>
			</Grid>
		);
	}

	renderSideInput() {
		const { classes } = this.props;
		const { image } = this.state;

		return (
			<Grid container spacing={2} style={{ padding: 30 }}>
				<Grid item xs={12}>
					<img
						src={
							image
								? `https://i.imgur.com/${image.id}.jpg`
								: 'https://i.imgur.com/6MEHGTJ.jpg'
						}
						alt='upload'
						className={
							image
								? `${classes.image} ${classes.boarderSolid}`
								: `${classes.image} ${classes.boarderDashed}`
						}
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
						<Button component='span' variant='contained'>
							Add Image
							<CloudUpload className={classes.rightIcon} />
						</Button>
					</label>
				</Grid>
				<Grid item xs={4}>
					<Typography variant='body2'>Prep Time</Typography>
					<TextField
						required
						fullWidth
						variant='outlined'
						placeholder='15m'
						name='prep'
						onChange={this.handleInputChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<Typography variant='body2'>Cook Time</Typography>
					<TextField
						required
						fullWidth
						variant='outlined'
						placeholder='1h 30m'
						name='cook'
						onChange={this.handleInputChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<Typography variant='body2'>Ready In</Typography>
					<TextField
						fullWidth
						variant='outlined'
						placeholder='Optional'
						name='ready'
						onChange={this.handleInputChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<Typography variant='body2'>Servings</Typography>
					<TextField
						required
						fullWidth
						variant='outlined'
						name='servings'
						onChange={this.handleInputChange}
					/>
				</Grid>
				<Grid item xs={8} />
				<Grid item xs={12}>
					<RadioGroup
						name='private'
						defaultValue='public'
						onChange={this.handleButtonChange}
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
			</Grid>
		);
	}

	render() {
		const { added, cancel } = this.state;

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
								{this.renderSideInput()}
							</Grid>
							<Grid item xs={12} md={8} spacing={2}>
								{this.renderMainInput()}
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
									onClick={() => {
										this.setState({ cancel: true });
									}}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
						<Grid item lg={1} xl={2} />
					</Grid>
				</form>
				{this.renderUploading()}
				{this.renderWaiting()}
				{this.renderError()}
				{(added || cancel) && <Redirect to='/' />}
			</>
		);
	}
}

export default withStyles(styles)(withFirebase(NewRecipe));
