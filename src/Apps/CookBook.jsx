import React, { Component } from 'react';

import Card from '../Components/ImageCard';
import { Grid } from '@material-ui/core';
import axios from 'axios';

class CookBook extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	componentDidMount() {
		axios
			.get('https://joel-cookbook-server.herokuapp.com/recipe')
			.then(response => {
				this.setState({ recipes: response.data.recipes, loading: false });
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
					imageUrl={recipe.imageUrl}
					title={recipe.title}
					description={recipe.description}
				/>
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
					<Grid container item xl={10} spacing={2}>
						{this.renderCards()}
					</Grid>
					<Grid item xl={1} />
				</Grid>
			</>
		);
	}
}

export default CookBook;
