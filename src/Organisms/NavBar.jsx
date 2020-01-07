import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Auth from './Auth';
import Search from '../Molecules/Search';
import logo from '../Pictures/logo.png';

const styles = {
  right: {
    marginLeft: 'auto',
  },
  link: {
    textDecoration: 'none',
    all: 'inherit',
    color: '#202020',
  },
  logo: {
    width: '28px',
    height: 'auto',
    paddingRight: '9px',
  },
};

const NavBar = ({ classes }) => (
  <AppBar color="secondary" position="sticky">
    <Toolbar>
      <Link to={`${process.env.PUBLIC_URL}/`} className={classes.link}>
        <Button color="secondary">
          <img src={logo} alt="logo" className={classes.logo} />
          <b style={{ color: 'white' }}>My Cookbook</b>
        </Button>
      </Link>
      <Search />
      <div className={classes.right}>
        <Auth />
      </div>
    </Toolbar>
  </AppBar>
);

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

NavBar.defaultProps = {
  classes: {},
};

export default withStyles(styles)(NavBar);
