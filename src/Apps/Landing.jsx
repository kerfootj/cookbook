import React, { Component } from "react";

import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import CookBook from "./CookBook";

firebase.initializeApp({
	apiKey: "AIzaSyCrE4LCvnWtIr_EfCSuRjTWrgQYV3vF8ow",
	authDomain: "cookbook-530b0.firebaseapp.com"
});

class Landing extends Component {
	state = { isSignedIn: false };

	uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

	// Listen to the Firebase Auth state and set the local state.
	componentDidMount() {
		this.unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
	}

	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	renderSignIn() {
		if (!this.state.isSignedIn) {
			return (
				<div>
					<h1>My App</h1>
					<p>Please sign-in:</p>
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			);
		}
		return null;
	}

	render() {
		if (!this.state.isSignedIn) {
			return (
				<div>
					<h1>My App</h1>
					<p>Please sign-in:</p>
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			);
		}
		return (
			<div>
				<h1>My App</h1>
				<p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
				<a onClick={() => firebase.auth().signOut()}>Sign-out</a>
				<CookBook />
			</div>
		);
	}
}

export default Landing;
