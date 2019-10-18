import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import Clock from '@material-ui/icons/Schedule';
import Edit from '@material-ui/icons/Edit';
import Gallery from '../Organisms/Gallery';
import PieChart from '@material-ui/icons/PieChartOutlined';
import RecipeForm from '../Organisms/RecipeForm';
import axios from 'axios';
import { withFirebase } from '../Atoms/Firebase';
import { withStyles } from '@material-ui/styles';

const styles = {
	paper: {
		flexGrow: 1,
		minHeight: 100,
		paddingTop: 17,
		padding: 10
	},
	wrapper: {
		display: 'flex'
	},
	textContainer: {
		flex: '0 0 42%'
	},
	imageContainer: {
		flex: 1,
		maxWidth: 550,
		maxHeight: 360
	},
	image: {
		maxWidth: '100%',
		maxHeight: 400,
		height: 'auto'
	},
	timing: {
		borderRight: '0.05em solid black',
		paddingRight: '0.8em'
	}
};

class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: {
				title: '',
				description: '',
				images: [],
				ingredients: [],
				instructions: []
			},
			edit: false
		};
	}
	componentDidMount() {
		const {
			match: { params }
		} = this.props;

		// http://localhost:8080/recipe/${params.recipeId}
		axios
			.get(`https://joel-cookbook-server.herokuapp.com/recipe/${params.recipeId}`)
			.then(response => {
				this.setState({
					recipe: {
						...response.data
					}
				});
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	renderEditButton = () => {
		const { firebase } = this.props;
		const {
			recipe: { uid }
		} = this.state;

		if ((((firebase || {}).auth || {}).currentUser || {}).uid === uid) {
			return (
				<IconButton onClick={() => this.setState({ edit: true })}>
					<Edit />
				</IconButton>
			);
		}
		return undefined;
	};

	renderGallery = () => {
		const {
			recipe: { images }
		} = this.state;
		if (images) {
			const items = images.map(image => ({
				original: `https://i.imgur.com/${image.id}h.jpeg`,
				thumbnail: `https://i.imgur.com/${image.id}b.jpeg`,
				imageSet: []
			}));
			return <Gallery items={items} />;
		}
		return undefined;
	};

	renderIngredients = () => {
		const {
			recipe: { ingredients }
		} = this.state;
		return ingredients.map((ingredient, i) => (
			<li key={`ingredient-${i}`}>
				<Typography variant='body1'>{ingredient}</Typography>
			</li>
		));
	};

	renderInstructions = () => {
		const {
			recipe: { instructions }
		} = this.state;
		return instructions.map((instruction, i) => (
			<li key={`instruction-${i}`}>
				<Typography variant='body1'>{instruction}</Typography>
			</li>
		));
	};

	renderSummary() {
		const { classes } = this.props;
		const {
			recipe: { title, description, prep, cook, ready, servings }
		} = this.state;

		return (
			<Paper square className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={12} style={{ paddingBottom: 70 }}>
						<div className={classes.wrapper}>
							<div className={classes.textContainer}>
								<Typography variant='h5'>{title}</Typography>
								<Typography variant='body1'>{description}</Typography>
							</div>
							<div className={classes.imageContainer}>{this.renderGallery()}</div>
						</div>
						{this.renderEditButton()}
					</Grid>
					<hr />
					<br />
					<Grid item xs={12}>
						<Grid container justify='space-between'>
							<Typography variant='h6' display='inline' align='left'>
								Ingredients
							</Typography>
							<Typography variant='body1' display='inline' align='right'>
								{ready} <Clock /> {servings} servings
								<PieChart />
							</Typography>
						</Grid>
						<hr />
						<ul>{this.renderIngredients()}</ul>
					</Grid>
					<Grid item xs={6} />
					<br />
					<Grid item xs={12}>
						<Typography variant='h6'>Directions</Typography>
						<hr />
						<Grid container alignItems='center' spacing={2}>
							<Grid item>
								<Clock />
							</Grid>
							<Grid item>
								<Typography variant='body1' className={classes.timing}>
									Prep <br />
									<Typography variant='caption'>{prep}</Typography>
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='body1' className={classes.timing}>
									Cook <br />
									<Typography variant='caption'>{cook}</Typography>
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='body1'>
									Ready In <br />
									<Typography variant='caption'>{ready}</Typography>
								</Typography>
							</Grid>
						</Grid>

						<ol>{this.renderInstructions()}</ol>
					</Grid>
				</Grid>
			</Paper>
		);
	}

	render() {
		const { edit, recipe } = this.state;

		if (edit) {
			return <RecipeForm recipe={recipe} />;
		}

		return (
			<>
				<Grid container>
					<Grid md={1} item lg={2} />
					<Grid container item md={10} lg={6} spacing={2}>
						{this.renderSummary()}
					</Grid>
					<Grid md={1} item lg={4} />
				</Grid>
			</>
		);
	}
}

export default withStyles(styles)(withFirebase(Recipe));
