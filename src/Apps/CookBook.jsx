import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Card from '../CompositeComponents/ImageCard';
import { Link } from 'react-router-dom';
import NewRecipe from './NewRecipe';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

const styles = {
	link: {
		textDecoration: 'none',
		all: 'inherit'
	}
};

class CookBook extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	// https://joel-cookbook-server.herokuapp.com
	componentDidMount() {
		axios
			.get('http://localhost:8080/recipe')
			.then(response => {
				console.log(response);
				this.setState({ recipes: response.data, loading: false });
			})
			.catch(error => {
				this.setState({ error: true });
			});
	}

	renderCards() {
		const { recipes } = this.state;
		return recipes.map(recipe => (
			<Grid item key={recipe._id}>
				<Card
					imageUrl={
						recipe.image
							? `https://i.imgur.com/${recipe.image.id}.jpg`
							: 'https://i.imgur.com/6MEHGTJ.jpg'
					}
					title={recipe.title}
					description={recipe.description}
				/>
			</Grid>
		));
	}

	render() {
		const { classes } = this.props;
		const { loading } = this.state;

		if (loading) {
			return <div>loading...</div>;
		}
		return (
			<>
				<Grid container>
					<Grid item xl={1} />
					<Grid container item xl={10} spacing={2}>
						{this.renderCards()}
					</Grid>
					<Grid item xl={1} />
				</Grid>

				<Button variant='contained' color='secondary'>
					<Link to='/new' component={NewRecipe} className={classes.link}>
						Add Recipe
					</Link>
				</Button>
			</>
		);
	}
}

export default withStyles(styles)(CookBook);
