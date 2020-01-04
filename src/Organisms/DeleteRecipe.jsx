import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Delete from '@material-ui/icons/Delete';
import { post } from '../Utils/Request';

const styles = {
  warning: {
    color: '#fff',
    backgroundColor: '#b71c1c',
    '&:hover': {
      backgroundColor: '#d50000',
    },
  },
};

class DeleteRecipe extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    recipeId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deleted: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = async () => {
    const { recipeId } = this.props;
    try {
      post(`recipe/delete/${recipeId}`);
      this.setState({ deleted: true });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { classes, title } = this.props;
    const { open, deleted } = this.state;
    return (
      <>
        <Button
          className={classes.warning}
          variant="contained"
          color="primary"
          onClick={this.handleOpen}
        >
          <Delete fontSize="small" />
          Delete
        </Button>
        <Dialog open={open} maxWidth="md" onClose={this.handleClose}>
          <DialogTitle>Delete Recipe?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Delete the recipe "${title}"?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.warning}
              variant="contained"
              onClick={this.handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {deleted && <Redirect to="/" />}
      </>
    );
  }
}

export default withStyles(styles)(DeleteRecipe);
