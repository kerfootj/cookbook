import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Card from '../Components/ImageCard';
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

	componentDidMount() {
		axios
			.get('https://joel-cookbook-server.herokuapp.com/recipe')
			.then(response => {
				this.setState({ recipes: response.data, loading: false });
			})
			.catch(error => {
				this.setState({ error: true });
			});
	}

	renderCards() {
		const { recipes } = this.state;
		return recipes.map(recipe => (
			<Grid item>
				<Card
					imageUrl={`https://i.imgur.com/${recipe.image.id}.jpg`}
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
					<Link to='/recipe' component={NewRecipe} className={classes.link}>
						Add Recipe
					</Link>
				</Button>
			</>
		);
	}
}

export default withStyles(styles)(CookBook);
