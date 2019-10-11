import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Auth from '../Organisms/Auth';
import Card from '../Molecules/RecipeCard';
import { Link } from 'react-router-dom';
import Loading from '../Molecules/Loading';
import NewRecipe from './NewRecipe';
import ReactGA from 'react-ga';
import axios from 'axios';
import { withFirebase } from '../Atoms/Firebase';
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
		this.initializeGA();
		axios
			.get('https://joel-cookbook-server.herokuapp.com/recipe')
			.then(response => {
				this.setState({ recipes: response.data, loading: false });
			})
			.catch(error => {
				this.setState({ error: error });
			});
		axios
			.get('https://joel-cookbook-server.herokuapp.com/user')
			.then(response => {
				let users = {};
				let photos = {};
				response.data.forEach(user => {
					users[user.uid] = user.name;
					photos[user.uid] = user.photo;
				});
				this.setState({ users: users, photos: photos });
			})
			.catch(error => {
				this.setState({ error: error });
			});
	}

	initializeGA() {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
		ReactGA.pageview(window.location.pathname + window.location.search);
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
		return <Auth buttonText='Add Recipe' create={false} />;
	}

	renderCards() {
		const { classes } = this.props;
		const { recipes, users, photos } = this.state;

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
						name={users ? users[recipe.uid] : undefined}
						profilePic={photos ? photos[recipe.uid] : undefined}
					/>
				</Link>
			</Grid>
		));
	}

	render() {
		const { loading } = this.state;

		if (loading) {
			return <Loading />;
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
