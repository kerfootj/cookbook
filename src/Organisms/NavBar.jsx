import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from './Auth';
import logo from '../Pictures/logo.png';

const styles = {
  title: {
    flexGrow: 1,
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
  <AppBar color="default" position="sticky">
    <Toolbar>
      <div className={classes.title}>
        <Link to={`${process.env.PUBLIC_URL}/`} className={classes.link}>
          <Button color="secondary">
            <img src={logo} alt="logo" className={classes.logo} />
            <b>My Cookbook</b>
          </Button>
        </Link>
      </div>
      <Auth />
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
