import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as MUIAvatar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  small: {
    height: 25,
    width: 25,
  },
  large: {
    height: 32,
    width: 32,
  },
  name: {
    color: 'white',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});

const Avatar = ({ src, size, name, display, classes }) => {
  const renderName = position => {
    if (name && position === display) {
      return (
        <Typography
          className={`${classes.name}`}
          variant="body2"
          component="span"
        >
          {name}
        </Typography>
      );
    }
    return undefined;
  };

  const getClassName = () => {
    return size === 'large' ? classes.large : classes.small;
  };

  return (
    <div className={classes.container}>
      {renderName('left')}
      <MUIAvatar
        className={getClassName()}
        src={src || 'https://i.imgur.com/oTPg6oz.jpg'}
      />
      {renderName('right')}
    </div>
  );
};

export default withStyles(styles)(Avatar);

Avatar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(undefined, 'small', 'large'),
  display: PropTypes.oneOf(undefined, 'left', 'right'),
};

Avatar.defaultProps = {
  src: undefined,
  name: undefined,
  display: 'none',
  size: undefined,
};
