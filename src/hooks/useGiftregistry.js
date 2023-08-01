/** @format */

import React, { useState } from 'react';
import {
	doc,
	updateDoc,
	addDoc,
	deleteDoc,
	collection,
	writeBatch,
	setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import moment from 'moment';
import { projectFirestore, projectStorage } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export const useGiftregistry = () => {
	const { userId, getGiftReservedSummary } = useUserContext();
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const addGift = async (giftlistBody, giftImageFile, postRequestFunc) => {
		setIsPending(true);

		let imageUrl = null;
		let imageName = `${giftlistBody.name}${getRandomInt(50)}`;

		const metadata = {
			contentType: 'image/jpeg',
		};

		if (giftImageFile) {
			const giftImageRef = ref(projectStorage, `thumbnails/${userId}/gifts/${imageName}`);
			const giftImage = await uploadBytes(giftImageRef, giftImageFile, metadata);
			imageUrl = await getDownloadURL(giftImage.ref);
		}

		const giftlistDetails = {
			...giftlistBody,
			imageName: imageName,
			imageUrl: imageUrl,
			date: moment().format(),
		};

		try {
			// Update the "groupList" field of the user document with the new group list
			await addDoc(collection(projectFirestore, 'users', userId, 'gifts'), giftlistDetails);
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			getGiftReservedSummary(userId);
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const updateGiftDetails = async (giftBody, giftImageFile, postRequestFunc) => {
		setIsPending(true);

		let imageUrl = null;
		let imageName = giftBody?.imageName
			? giftBody?.imageName
			: `${giftBody.name}${getRandomInt(50)}`;

		const metadata = {
			contentType: 'image/jpeg',
		};

		if (giftImageFile) {
			const giftImageRef = ref(projectStorage, `thumbnails/${userId}/gifts/${imageName}`);
			const giftImage = await uploadBytes(giftImageRef, giftImageFile, metadata);
			imageUrl = await getDownloadURL(giftImage.ref);
		}

		console.log({ ...giftBody, imageUrl: imageUrl ? imageUrl : giftBody.imageUrl });

		try {
			await updateDoc(doc(projectFirestore, 'users', userId, 'gifts', giftBody.id), {
				...giftBody,
				imageUrl: imageUrl ? imageUrl : giftBody.imageUrl,
			});
			postRequestFunc();
			getGiftReservedSummary(userId);
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const deleteGift = async (giftId, postRequestFunc) => {
		setIsPending(true);

		try {
			await deleteDoc(doc(projectFirestore, 'users', userId, 'gifts', giftId));
			postRequestFunc();
			getGiftReservedSummary(userId);
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	return {
		addGift,
		updateGiftDetails,
		deleteGift,
		error,
		isPending,
	};
};
