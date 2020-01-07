import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  paper: {
    position: 'absolute',
    top: 64,
    width: '60vw',
    margin: 'auto',
    flexGrow: 1,
    minHeight: 100,
    paddingTop: 17,
    padding: 10,
  },
};

class NotFound extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  render() {
    const { classes } = this.props;
    return <Paper className={classes.paper}>Not Found</Paper>;
  }
}

export default withStyles(styles)(NotFound);
