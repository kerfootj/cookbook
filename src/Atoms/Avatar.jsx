import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as MUIAvatar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {},
  name: {},
};

const Avatar = ({ src, name, display, classes }) => {
  const renderName = position => {
    if (name && position === display) {
      return (
        <Typography
          className={`${classes.name} name-${position}`}
          variant="caption"
          component="span"
        >
          {name}
        </Typography>
      );
    }
    return undefined;
  };

  return (
    <div className={classes.container}>
      {renderName('left')}
      <MUIAvatar src={src || 'https://i.imgur.com/oTPg6oz.jpg'} />
      {renderName('right')}
    </div>
  );
};

export default withStyles(styles)(Avatar);

Avatar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  src: PropTypes.string,
  name: PropTypes.string,
  display: PropTypes.oneOf(undefined, 'left', 'right'),
};

Avatar.defaultProps = {
  src: undefined,
  name: undefined,
  display: 'none',
};
