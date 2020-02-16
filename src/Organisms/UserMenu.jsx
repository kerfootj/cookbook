import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withFirebase } from 'Atoms/Firebase';

const UserMenu = ({ anchorEl, firebase, ...rest }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...rest}
    >
      <MenuItem onClick={() => firebase.doSignOut()}>Logout</MenuItem>
    </Menu>
  );
};

export default withFirebase(UserMenu);

UserMenu.propTypes = {
  anchorEl: PropTypes.shape({}),
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func.isRequired,
  }).isRequired,
};

UserMenu.defaultProps = {
  anchorEl: null,
};
