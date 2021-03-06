import { Button, FormControlLabel, Grid, Switch } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import TimeInput from '../Molecules/TimeInput';
import { post } from '../Utils/Request';
import { withFirebase } from '../Atoms/Firebase';
import {
  NumberTextField,
  RecipeTextField,
} from '../Atoms/textfields/TextFields';
import ImageUpload from './ImageUpload';

const EMPTY_RECIPE = {
  title: '',
  description: '',
  ingredients: [],
  instructions: [],
  images: [],
  prep: undefined,
  cook: undefined,
  ready: undefined,
  private: false,
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
  },
  submit: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  cancel: {
    color: '#fff',
    backgroundColor: '#b71c1c',
    '&:hover': {
      backgroundColor: '#d50000',
    },
    paddingLeft: 38,
    paddingRight: 38,
  },
  grid: {
    padding: 30,
  },
  cloudIcon: {
    marginLeft: 4,
  },
  upload: {
    display: 'none',
  },
  details: {
    padding: 30,
  },
};

class RecipeForm extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({
        currentUser: PropTypes.shape({ uid: PropTypes.string }),
      }),
    }).isRequired,
    classes: PropTypes.objectOf(PropTypes.string),
    location: PropTypes.shape({
      pathname: PropTypes.string,
      state: PropTypes.shape({ recipe: PropTypes.shape({}) }),
    }),
  };

  static defaultProps = {
    classes: {},
    location: {},
  };

  constructor(props) {
    super(props);
    const recipe = ((props.location || {}).state || {}).recipe || {};
    this.state = {
      recipe: Object.keys(recipe).length ? { ...recipe } : { ...EMPTY_RECIPE },
      status: {
        added: false,
        cancel: false,
      },
      errors: {
        save: false,
      },
      valid: {
        prep: true,
        cook: true,
        ready: true,
      },
      create: !Object.keys(recipe).length,
    };
  }

  handleSwitchChange = name => event => {
    event.persist();
    this.setState(prev => ({
      recipe: {
        ...prev.recipe,
        [name]: event.target.checked,
      },
    }));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(prev => ({
      recipe: {
        ...prev.recipe,
        [name]: value
          .replace(/\s\s+/g, ' ')
          .replace(/\n\s*\n/g, ' ')
          .trim(),
      },
    }));
  };

  handleMultiLineInputChange = event => {
    const { name, value } = event.target;
    this.setState(prev => ({
      recipe: {
        ...prev.recipe,
        [name]: value
          .replace(/\n\s*\n/g, '\n')
          .replace(/\s\s+/g, ' ')
          .trim()
          .split(/\r?\n/),
      },
    }));
  };

  validateField = () => {
    const {
      recipe: { cook, prep, ready },
    } = this.state;
    const valid = {};

    const timeRe = /(^\d+h( +[0-5]?\dm)?$|^[0-5]?\dm$)/;

    valid.prep = !(prep && !timeRe.test(prep));
    valid.cook = !(cook && !timeRe.test(cook));
    valid.ready = !(ready && !timeRe.test(ready));

    this.setState({
      valid,
    });
  };

  handleImageUpload = images => {
    this.setState(prev => ({
      recipe: {
        ...prev.recipe,
        images: [...prev.recipe.images, ...images],
      },
    }));
  };

  handleImageMove = (from, to) => {
    const {
      recipe: { images },
    } = this.state;
    const temp = [...images];
    const element = temp[from];
    temp.splice(from, 1);
    temp.splice(to, 0, element);
    this.setState(prev => ({
      recipe: {
        ...prev.recipe,
        images: temp,
      },
    }));
  };

  addRecipe = event => {
    const { recipe } = this.state;

    post('recipe', recipe)
      .then(() => {
        this.setState({ status: { added: true } });
      })
      .catch(error => {
        this.setState({ errors: { save: error } });
      });
    event.preventDefault();
  };

  cancelRecipe = () => {
    const {
      recipe: { images },
      create,
    } = this.state;

    if (create && images.length) {
      const key = process.env.REACT_APP_IMGUR_CLIENT_ID;
      images.forEach(image => {
        axios.delete(`https://api.imgur.com/3/image/${image.deleteHash}`, {
          headers: { Authorization: `Client-ID ${key}` },
        });
      });
    }
    this.setState({ status: { cancel: true } });
  };

  renderError = () => {
    const { errors } = this.state;
    if (errors.upload) {
      return <p>{errors.upload}</p>;
    }
    if (errors.save) {
      return <p>Error saving your recipe</p>;
    }
    return null;
  };

  renderOptions = () => {
    const { recipe, valid } = this.state;
    return (
      <>
        <Grid item xs={12}>
          <ImageUpload
            images={recipe.images}
            onUpload={this.handleImageUpload}
            onMove={this.handleImageMove}
          />
        </Grid>
        <TimeInput
          valid={valid}
          validate={this.validate}
          onChange={this.handleInputChange}
          defaultValues={recipe}
        />
        <Grid item xs={4}>
          <NumberTextField
            title="Servings"
            min="1"
            onChange={this.handleInputChange}
            defaultValue={recipe ? recipe.servings : undefined}
          />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={12}>
          <FormControlLabel
            value="true"
            label="Private"
            control={
              <Switch
                checked={recipe ? recipe.private : false}
                value="private"
                onChange={this.handleSwitchChange('private')}
              />
            }
          />
        </Grid>
      </>
    );
  };

  renderDetails = () => {
    const { classes, location } = this.props;
    const recipe = ((location || {}).state || {}).recipe || {};
    return (
      <Grid container spacing={2} className={classes.details}>
        <Grid item xs={12}>
          <RecipeTextField
            title="Recipe Title"
            name="title"
            onChange={this.handleInputChange}
            defaultValue={recipe ? recipe.title : undefined}
          />
        </Grid>
        <Grid item xs={12}>
          <RecipeTextField
            rows={3}
            title="Description"
            onChange={this.handleInputChange}
            defaultValue={recipe ? recipe.description : undefined}
          />
        </Grid>
        <Grid item xs={12}>
          <RecipeTextField
            rows={8}
            title="Ingredients"
            placeholder="Put each ingredient on its own line"
            onChange={this.handleMultiLineInputChange}
            defaultValue={
              recipe && recipe.ingredients
                ? recipe.ingredients.join('\n')
                : undefined
            }
          />
        </Grid>
        <Grid item xs={12}>
          <RecipeTextField
            rows={8}
            title="Instructions"
            placeholder="Put each step on its own line"
            onChange={this.handleMultiLineInputChange}
            defaultValue={
              recipe && recipe.instructions
                ? recipe.instructions.join('\n')
                : undefined
            }
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, location } = this.props;
    const { status, create } = this.state;

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
              className={classes.container}
            >
              <Grid item xs={12} md={4}>
                <Grid container spacing={2} className={classes.grid}>
                  {this.renderOptions()}
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
                {this.renderDetails()}
              </Grid>
              <Grid item xs={12} />
              <Grid item className={classes.grid}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Save
                </Button>
              </Grid>
              <Grid item className={classes.grid}>
                <Button
                  variant="contained"
                  className={classes.cancel}
                  onClick={this.cancelRecipe}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item lg={1} xl={2} />
          </Grid>
        </form>
        {this.renderError()}
        {(status.added || status.cancel) && <Redirect to="/" />}
        {create && location.pathname.includes('edit') && <Redirect to="/" />}
      </>
    );
  }
}

export default withStyles(styles)(withFirebase(RecipeForm));
