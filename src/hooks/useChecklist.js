/** @format */

import React, { useState } from 'react';
import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

export const useChecklist = () => {
	const { userId } = useUserContext();
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const addChecklist = async (checklistBody, postRequestFunc) => {
		setIsPending(true);

		try {
			// Update the "groupList" field of the user document with the new group list
			await addDoc(collection(projectFirestore, 'users', userId, 'checklist'), checklistBody);
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const updateChecklistDetails = async (updatedChecklistBody, checklistId, postRequestFunc) => {
		setIsPending(true);

		try {
			await updateDoc(
				doc(projectFirestore, 'users', userId, 'checklist', checklistId),
				updatedChecklistBody
			);
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	const deleteChecklist = async (checklistId, postRequestFunc) => {
		setIsPending(true);

		try {
			await deleteDoc(doc(projectFirestore, 'users', userId, 'checklist', checklistId));
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	return {
		addChecklist,
		updateChecklistDetails,
		deleteChecklist,
		isPending,
		error,
	};
};
