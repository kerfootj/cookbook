import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './Components/Firebase';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<App />
	</FirebaseContext.Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
