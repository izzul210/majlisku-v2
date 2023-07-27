/** @format */

import React, { useState } from 'react';
import moment from 'moment';
import {
	doc,
	updateDoc,
	addDoc,
	deleteDoc,
	collection,
	writeBatch,
	setDoc,
} from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

export const useItinerary = () => {
	const { userId, userData, getUserData } = useUserContext();
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const addActivity = async (activityBody, postRequestFunc) => {
		setIsPending(true);

		try {
			// Update the "groupList" field of the user document with the new group list
			await addDoc(collection(projectFirestore, 'users', userId, 'activity'), activityBody);
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const editActivity = async (activityBody, postRequestFunc) => {
		setIsPending(true);

		try {
			await updateDoc(
				doc(projectFirestore, 'users', userId, 'activity', activityBody.id),
				activityBody
			);
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const deleteActivity = async (activityId, postRequestFunc) => {
		setIsPending(true);

		try {
			await deleteDoc(doc(projectFirestore, 'users', userId, 'activity', activityId));
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	return {
		addActivity,
		editActivity,
		deleteActivity,
		error,
		isPending,
	};
};
