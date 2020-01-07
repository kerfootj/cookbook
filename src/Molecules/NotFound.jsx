import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import coffee from '../Pictures/coffee.jpg';

const styles = theme => ({
  container: {
    top: 64,
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '60vw',
    minHeight: 100,
    padding: 10,
  },
  typography: {
    padding: theme.spacing(1, 0, 0, 1),
  },
  image: {
    maxWidth: 300,
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
});

class NotFound extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    search: PropTypes.string.isRequired,
  };

  render() {
    const { classes, search } = this.props;
    return (
      <div className={classes.container}>
        <Paper square className={classes.paper}>
          <Typography className={classes.typography}>
            <i>0 recipe results for</i>
            {` "${search.slice(search.indexOf('=') + 1)}"`}
          </Typography>
          <img src={coffee} alt="not found" className={classes.image} />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
