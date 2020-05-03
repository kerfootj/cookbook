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
  small: {
    height: 25,
    width: 25,
  },
  large: {
    height: 32,
    width: 32,
  },
};

const Avatar = ({ onClick, src, imgProps, name, nameProps, classes }) => {
  const renderName = position => {
    const { display, className } = nameProps;
    if (name && position === display) {
      return (
        <Typography
          onClick={onClick}
          className={className}
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
    const { size } = imgProps;
    return size === 'large' ? classes.large : classes.small;
  };

  return (
    <div className={classes.container}>
      {renderName('left')}
      <div onClick={onClick} className={imgProps.className}>
        <MUIAvatar
          className={getClassName()}
          src={src || 'https://i.imgur.com/oTPg6oz.jpg'}
        />
      </div>
      {renderName('right')}
    </div>
  );
};

export default withStyles(styles)(Avatar);

Avatar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  src: PropTypes.string,
  onClick: PropTypes.func,
  imgProps: PropTypes.shape({
    size: PropTypes.oneOf([undefined, 'small', 'large']),
    className: PropTypes.string,
  }),
  name: PropTypes.string,
  nameProps: PropTypes.shape({
    className: PropTypes.string,
    display: PropTypes.oneOf([undefined, 'left', 'right']),
  }),
};

Avatar.defaultProps = {
  onClick: undefined,
  src: undefined,
  imgProps: {
    size: undefined,
  },
  name: undefined,
  nameProps: {
    display: 'none',
  },
};
