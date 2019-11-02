import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';

import Auth from '../Organisms/Auth';
import Card from '../Molecules/RecipeCard';
import { Link } from 'react-router-dom';
import Loading from '../Molecules/Loading';
import ReactGA from 'react-ga';
import { get } from '../Utils/Request';
import { withFirebase } from '../Atoms/Firebase';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
  link: {
    textDecoration: 'none',
    all: 'inherit',
  },
  card: {
    cursor: 'pointer',
  },
};

class Cookbook extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({ openAuth: PropTypes.bool }),
    }).isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.initializeGA();
    get('recipe')
      .then(response => {
        this.setState({ recipes: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: error });
      });
    get('user')
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
    const { classes, firebase, location } = this.props;
    if (firebase.auth.currentUser) {
      return (
        <Button variant="contained" color="secondary">
          <Link to="/recipe/new" className={classes.link}>
            Add Recipe
          </Link>
        </Button>
      );
    }
    return (
      <Auth
        buttonText="Add Recipe"
        create={false}
        open={((location || {}).state || {}).openAuth}
      />
    );
  }

  renderCards() {
    const { classes } = this.props;
    const { recipes, users, photos } = this.state;

    return recipes.map(recipe => (
      <Grid item key={recipe._id} className={classes.card}>
        <Link to={`/recipe/${recipe._id}`} className={classes.link}>
          <Card
            imageUrl={
              recipe.images && recipe.images.length
                ? `https://i.imgur.com/${recipe.images[0].id}.jpg`
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
          <Grid
            container
            item
            xl={10}
            spacing={1}
            alignItems="center"
            justify="center"
          >
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
