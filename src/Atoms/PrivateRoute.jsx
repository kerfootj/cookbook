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
  authUser: PropTypes.shape({}).isRequired,
  component: PropTypes.node.isRequired,
  location: PropTypes.shape({}),
};

export default PrivateRoute;
