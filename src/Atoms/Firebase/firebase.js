import 'firebase/auth';

import app from 'firebase/app';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.googleProvider = new app.auth.GoogleAuthProvider();
	}

	doSignInWithGoogle = () =>
		this.auth.signInWithPopup(this.googleProvider);

	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;