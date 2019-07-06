import 'firebase/auth';

import app from 'firebase/app';

const config = {
	apiKey: 'AIzaSyCrE4LCvnWtIr_EfCSuRjTWrgQYV3vF8ow',
	authDomain: 'cookbook-530b0.firebaseapp.com'
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
	}

	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
