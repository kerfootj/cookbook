import React from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import loadingGif from '../Pictures/burger.gif';

const styles = {
  container: {
    minWidth: '100%',
  },
  image: {
    display: 'block',
    margin: 'auto',
    paddingTop: '2em',
  },
};

const Loading = ({ classes }) => {
  return (
    <div className={classes.container}>
      <img src={loadingGif} alt="loading" className={classes.image} />
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

Loading.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Loading);
