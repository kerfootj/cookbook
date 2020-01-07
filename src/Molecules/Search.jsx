import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { InputBase, Paper, withStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    transition: 'width 0.2s',
  },
  rootBlur: {
    backgroundColor: 'hsla(0,0%,100%,.125)',
    width: 350,
  },
  rootFocus: {
    backgroundColor: 'white',
    width: 450,
  },
  input: {
    flex: 1,
  },
  inputFocus: {
    color: '#000000cc',
  },
  inputBlur: {
    color: 'white',
  },
  icon: {
    padding: '8px',
  },
  iconFocus: {
    color: '#000000bb',
  },
  iconBlur: {
    color: '#ffffff50',
  },
};

class Search extends PureComponent {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      focused: false,
      complete: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { complete: prevComplete } = prevState;
    const { complete } = this.state;

    if (complete && complete !== prevComplete) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ complete: false, search: '' });
    }
  }

  handleFocus = focused => () => {
    this.setState({ focused });
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleSearch = () => {
    const { onSearch } = this.props;
    const { search } = this.state;
    onSearch(search);
  };

  handleSubmit = () => {
    this.setState({ complete: true });
  };

  render() {
    const {
      classes: {
        root,
        rootBlur,
        rootFocus,
        icon,
        iconFocus,
        iconBlur,
        input,
        inputFocus,
        inputBlur,
      },
    } = this.props;
    const { focused, complete, search } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Paper
            className={`${root} ${focused ? rootFocus : rootBlur}`}
            elevation={0}
          >
            <IconButton
              className={`${icon} ${focused ? iconFocus : iconBlur}`}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <InputBase
              className={`${input} ${focused ? inputFocus : inputBlur}`}
              placeholder="Search..."
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              onFocus={this.handleFocus(true)}
              onBlur={this.handleFocus(false)}
              value={search}
            />
            <IconButton
              className={`${icon} ${focused ? iconFocus : iconBlur}`}
              type="submit"
              aria-label="search"
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </Paper>
        </form>
        {complete && (
          <Redirect
            push
            to={{ pathname: 'recipes', search: `?search=${search}` }}
          />
        )}
      </>
    );
  }
}

export default withStyles(styles)(Search);
