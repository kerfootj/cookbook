import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withFirebase } from 'Atoms/Firebase';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
  link: {
    padding: 0,
    textDecoration: 'none',
    all: 'inherit',
  },
};

const UserMenu = ({ classes, anchorEl, firebase, ...rest }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      anchorReference="none"
      PaperProps={{
        style: {
          left: '92%',
          top: '6%',
        },
      }}
      {...rest}
    >
      <MenuItem>
        <Link to="/recipe/new" className={classes.link}>
          New Recipe
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => firebase.doSignOut()}>Logout</MenuItem>
    </Menu>
  );
};

export default withStyles(styles)(withFirebase(UserMenu));

UserMenu.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  anchorEl: PropTypes.shape({}),
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func.isRequired,
  }).isRequired,
};

UserMenu.defaultProps = {
  classes: {},
  anchorEl: null,
};
