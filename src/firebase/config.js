/** @format */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const API_KEY = import.meta.env.VITE_FB_API_KEY;
const APP_ID = import.meta.env.VITE_FB_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_FB_MEASUREMENT_ID;
const MESSAGING_SENDER_ID = import.meta.env.VITE_FB_MESSAGING_SENDER_ID;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'myweddingapp-25712.firebaseapp.com',
	projectId: 'myweddingapp-25712',
	storageBucket: 'myweddingapp-25712.appspot.com',
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};

//init firebase
const app = initializeApp(firebaseConfig);
//init services
/* projectFirestore = interact with the database */
const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

console.log('projectAuth:', projectAuth);

// timestamp
const timestap = null;

export { projectFirestore, projectAuth, projectStorage, googleProvider, analytics, timestap };
