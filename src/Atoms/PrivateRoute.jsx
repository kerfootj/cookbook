import { Redirect, Route } from 'react-router-dom';

import React from 'react';

export default function PrivateRoute({ component: Component, authUser, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				authUser !== null ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				)
			}
		/>
	);
}