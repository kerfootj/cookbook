import React, { Component } from "react";

import { response } from "../fakeData";
import Card from "../Components/ImageCard";
import { Grid } from "@material-ui/core";

class CookBook extends Component {
	constructor(props) {
		super(props);
		this.state = { recipes: response.recipes };
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
		return (
			<Grid container spacing={2}>
				{this.renderCards()}
			</Grid>
		);
	}
}

export default CookBook;
