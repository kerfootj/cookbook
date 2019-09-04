import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Card from '../CompositeComponents/ImageCard';
import { Link } from 'react-router-dom';
import NewRecipe from './NewRecipe';
import SignIn from './SignIn';
import axios from 'axios';
import { withFirebase } from '../Components/Firebase';
import { withStyles } from '@material-ui/styles';

const styles = {
	link: {
		textDecoration: 'none',
		all: 'inherit'
	},
	card: {
		cursor: 'pointer'
	}
};

class Cookbook extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	// https://joel-cookbook-server.herokuapp.com

	componentDidMount() {
		axios
			.get('https://joel-cookbook-server.herokuapp.com/recipe')
			.then(response => {
				this.setState({ recipes: response.data, loading: false });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	renderAddRecipe() {
		const { firebase, classes } = this.props;
		if (firebase.auth.currentUser) {
			return (
				<Button variant='contained' color='secondary'>
					<Link to='/new' component={NewRecipe} className={classes.link}>
						Add Recipe
					</Link>
				</Button>
			);
		}
		return <SignIn buttonText='Add Recipe' />;
	}

	renderCards() {
		const { classes } = this.props;
		const { recipes } = this.state;

		return recipes.map(recipe => (
			<Grid item key={recipe._id} className={classes.card}>
				<Link to={`/recipe/${recipe._id}`} className={classes.link}>
					<Card
						imageUrl={
							recipe.image
								? `https://i.imgur.com/${recipe.image.id}.jpg`
								: 'https://i.imgur.com/6MEHGTJ.jpg'
						}
						title={recipe.title}
						description={recipe.description}
					/>
				</Link>
			</Grid>
		));
	}

	render() {
		const { loading } = this.state;

		if (loading) {
			return <div>loading...</div>;
		}
		return (
			<>
				<Grid container>
					<Grid item xl={1} />
					<Grid container item xl={10} spacing={1} alignItems='center' justify='center'>
						{this.renderCards()}
					</Grid>
					<Grid item xl={1} />
				</Grid>
				{this.renderAddRecipe()}
			</>
		);
	}
}

export default withStyles(styles)(withFirebase(Cookbook));
