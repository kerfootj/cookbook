import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../Organisms/Auth';
import Loading from '../Molecules/Loading';
import RecipeCard from '../Molecules/RecipeCard';
import { get } from '../Utils/Request';
import { withFirebase } from '../Atoms/Firebase';
import NotFound from '../Molecules/NotFound';

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
    firebase: PropTypes.shape({
      auth: PropTypes.shape({ currentUser: PropTypes.shape({}) }),
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({ openAuth: PropTypes.bool }),
      search: PropTypes.string.isRequired,
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
    this.getRecipes();
    this.getUsers();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search },
    } = this.props;
    const {
      location: { search: prevSearch },
    } = prevProps;

    if (search !== prevSearch) {
      this.getRecipes();
    }
  }

  getRecipes = async () => {
    try {
      const {
        location: { search },
      } = this.props;
      const response = await get(`recipe${search}`);
      this.setState({ recipes: response.data, loading: false });
    } catch (error) {
      this.setState({ error });
    }
  };

  getUsers = async () => {
    try {
      const response = await get('users');
      this.setState({ users: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  initializeGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    ReactGA.pageview(window.location.pathname + window.location.search);
  };

  renderAddRecipe = () => {
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
  };

  renderCards() {
    const { classes } = this.props;
    const { recipes, users } = this.state;

    return recipes.map(recipe => {
      const user = users
        ? users.find(u => u.recipes.includes(recipe._id))
        : undefined;
      return (
        <Grid item key={recipe._id} className={classes.card}>
          <Link to={`/recipe/${recipe._id}`} className={classes.link}>
            <RecipeCard
              imageUrl={
                recipe.images && recipe.images.length
                  ? `https://i.imgur.com/${recipe.images[0].id}.jpg`
                  : 'https://i.imgur.com/6MEHGTJ.jpg'
              }
              title={recipe.title}
              description={recipe.description}
              name={user ? user.name : undefined}
              profilePic={user ? user.photo : undefined}
            />
          </Link>
        </Grid>
      );
    });
  }

  render() {
    const {
      location: { search },
    } = this.props;
    const { loading, recipes } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (search && recipes.length < 1) {
      return <NotFound search={search} />;
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
