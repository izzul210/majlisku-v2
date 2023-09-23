/** @format */

import React, { useState } from 'react';
import moment from 'moment';
import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

export const useVendor = () => {
	const { userId } = useUserContext();
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const addVendor = async (vendorBody, postRequestFunc) => {
		const vendorDetails = {
			...vendorBody,
			link: vendorBody.link !== 'https://' ? vendorBody.link : null,
			date: moment().format(),
			userId,
		};

		setIsPending(true);

		try {
			// Update the "groupList" field of the user document with the new group list
			await addDoc(collection(projectFirestore, 'users', userId, 'vendors'), vendorDetails);
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const updateVendorDetails = async (updatedVendorBody, vendorId, postRequestFunc) => {
		setIsPending(true);

		try {
			await updateDoc(
				doc(projectFirestore, 'users', userId, 'vendors', vendorId),
				updatedVendorBody
			);
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	const deleteVendor = async (vendorId, postRequestFunc) => {
		setIsPending(true);

		try {
			await deleteDoc(doc(projectFirestore, 'users', userId, 'vendors', vendorId));
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	return {
		addVendor,
		updateVendorDetails,
		deleteVendor,
		isPending,
		error,
	};
};
