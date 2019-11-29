/* eslint-disable react/jsx-curly-newline */

import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';

const PrivateRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${process.env.PUBLIC_URL}/`,
              state: { from: props.location, openAuth: true },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.shape({}).isRequired,
  authUser: PropTypes.shape({}),
  location: PropTypes.shape({}),
};

PrivateRoute.defaultProps = {
  authUser: null,
  location: null,
};

export default PrivateRoute;
