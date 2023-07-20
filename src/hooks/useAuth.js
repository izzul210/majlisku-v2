/** @format */

import { useState, useEffect } from 'react';
import moment from 'moment';
//Firebase config import
import { projectAuth, projectFirestore } from '../firebase/config';
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { collection, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { updateProfile, getAuth } from 'firebase/auth';
//UserContext import
import { useUserDispatchContext } from '../context/UserContext';
import { useOnbardingDispatchContext } from '../context/OnboardingContext';

export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [user, setUser] = useState(null);

	const dispatch = useUserDispatchContext();

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);

		try {
			// login
			const res = await signInWithEmailAndPassword(projectAuth, email, password);
			setUser(res.user);
			dispatch({ type: 'SET_USER_INFO', payload: res.user });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (error) {
			if (!isCancelled) {
				setError(error.code);
				setIsPending(false);
			}
		}
	};

	const googleLogin = async () => {
		setError(null);
		setIsPending(true);

		try {
			const provider = new GoogleAuthProvider();
			const res = await signInWithPopup(projectAuth, provider);
			setUser(res.user);
			dispatch({ type: 'SET_USER_INFO', payload: res.user });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.code);
				setIsPending(false);
			}
		}
	};

	// useEffect(() => {
	// 	return () => setIsCancelled(true);
	// }, []);

	return { login, googleLogin, isPending, error, user };
};

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [user, setUser] = useState(null);

	const onboardingDispatch = useOnbardingDispatchContext();

	const signup = async (email, password, postResponseFunc = () => {}) => {
		setError(null);
		setIsPending(true);

		try {
			// signup
			const res = await createUserWithEmailAndPassword(projectAuth, email, password);

			onboardingDispatch({ type: 'USER_SIGN_UP', payload: res.user });
			postResponseFunc();

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.code);
				setIsPending(false);
			}
		}
	};

	return { signup, isPending, error, user };
};

export const useOnboarding = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const auth = getAuth();
	const user = auth.currentUser;

	const userId = auth.currentUser.uid;

	const saveOnboarding = async (onboardingData, postResponseFunc = () => {}) => {
		setIsPending(true);
		let tempOnboardingData = {
			eventNature: onboardingData.eventNature,
			guestGroups: onboardingData.guestGroups,
			guestTotal: onboardingData.guestTotal,
			userId: onboardingData.user.uid,
			userEmail: onboardingData.user.email,
			userFirstName: onboardingData.firstName,
			userLastName: onboardingData.lastName,
		};

		let userData = {
			email: onboardingData.user.email,
			displayName: `${onboardingData.firstName} ${onboardingData.lastName}`,
		};

		try {
			await addDoc(collection(projectFirestore, 'onboarding'), {
				...tempOnboardingData,
				timestamp: serverTimestamp(),
			});
			await setDoc(doc(projectFirestore, 'users', userId), {
				...userData,
				date: moment().format(),
			});

			updateProfile(user, {
				displayName: `${onboardingData.firstName} ${onboardingData.lastName}`,
			});

			postResponseFunc();
			setIsPending(false);
		} catch (err) {
			setError(err.message);
			console.log('Error adding document: ', err);
			setIsPending(false);
		}
	};

	return { saveOnboarding, isPending };
};

export const useLogout = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			signOut(projectAuth).then(() => {
				setIsPending(false);
			});
		} catch (err) {
			setError(err.message);
			setIsPending(false);
		}
	};

	return { logout, isPending, error };
};
