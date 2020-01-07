import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Auth from './Auth';
import Search from '../Molecules/Search';
import logo from '../Pictures/logo.png';

const styles = theme => ({
  base: {
    marginBottom: theme.spacing(1),
  },
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
});

class NavBar extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    classes: {},
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.base}>
        <AppBar color="secondary" position="sticky">
          <Toolbar>
            <Link to={`${process.env.PUBLIC_URL}/`} className={classes.link}>
              <Button color="secondary">
                <img src={logo} alt="logo" className={classes.logo} />
                <b style={{ color: 'white' }}>My Cookbook</b>
              </Button>
            </Link>
            <Search onSearch={this.handleSearch} />
            <div className={classes.right}>
              <Auth />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
