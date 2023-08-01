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
import { useGuestlistContext } from '../context/GuestlistContext';

export const useGuestlist = () => {
	const { userId, userData, getUserData } = useUserContext();
	const { guestlist, newguestlist } = useGuestlistContext();
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const addGuest = async (guestlistBody, postRequestFunc) => {
		const guestlistDetails = {
			...guestlistBody,
			date: moment().format(),
			userId,
		};

		setIsPending(true);

		try {
			// Update the "groupList" field of the user document with the new group list
			await addDoc(collection(projectFirestore, 'users', userId, 'guestlist'), guestlistDetails);
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const addOpenInviteGuest = async (guestlistBody, postRequestFunc) => {
		setIsPending(true);

		const updatedGuestlistBody = {
			id: guestlistBody.id,
			date: moment().format(),
			name: guestlistBody.name,
			phone: guestlistBody.phone,
			email: '',
			address: '',
			pax: guestlistBody.pax,
			rsvp: guestlistBody.rsvp,
			groups: guestlistBody.groups,
			otherGuest: true,
			response: {
				date: guestlistBody.date,
				pax: guestlistBody.pax,
				rsvp: guestlistBody.rsvp,
				wish: guestlistBody.wish,
			},
		};

		console.log('addOpenInviteGuest', updatedGuestlistBody);

		try {
			// Update the "groupList" field of the user document with the new group list
			await setDoc(
				doc(projectFirestore, 'users', userId, 'guestlist', updatedGuestlistBody.id),
				updatedGuestlistBody
			).then(() => {
				deleteOpenInviteGuest(updatedGuestlistBody.id, () => {});
				postRequestFunc(); // Call the postRequestFunc after the group is removed
				setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
			});
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	const addOpenInviteBulkGuest = async (guestlistIds, groups, postRequestFunc) => {
		let guestlistBulk = newguestlist.filter((obj) => guestlistIds.includes(obj.id));
		let tempGuestlist = [];

		guestlistBulk.forEach((guestlistBody) => {
			tempGuestlist.push({
				id: guestlistBody.id,
				date: moment().format(),
				name: guestlistBody.name,
				phone: guestlistBody.phone,
				email: '',
				address: '',
				pax: guestlistBody.pax,
				rsvp: guestlistBody.rsvp,
				groups: groups,
				otherGuest: true,
				response: {
					date: guestlistBody.date,
					pax: guestlistBody.pax,
					rsvp: guestlistBody.rsvp,
					wish: guestlistBody.wish,
				},
			});
		});

		const batch = writeBatch(projectFirestore);

		tempGuestlist.forEach((document) => {
			let docRef = doc(projectFirestore, 'users', userId, 'guestlist', document.id);
			batch.set(docRef, document);
		});

		batch.commit();
		deleteBulkOpenInviteGuest(guestlistIds, postRequestFunc);
		setIsPending(false);
	};

	const updateGuestDetails = async (updatedGuestDetails, guestId, postRequestFunc) => {
		setIsPending(true);

		try {
			await updateDoc(
				doc(projectFirestore, 'users', userId, 'guestlist', guestId),
				updatedGuestDetails
			);
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	const deleteGuest = async (guestId, postRequestFunc) => {
		setIsPending(true);

		try {
			await deleteDoc(doc(projectFirestore, 'users', userId, 'guestlist', guestId));
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	const deleteOpenInviteGuest = async (guestId, postRequestFunc) => {
		setIsPending(true);

		try {
			await deleteDoc(doc(projectFirestore, 'users', userId, 'newguestlist', guestId));
			postRequestFunc();
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	const addBulkGuest = async (guestlistbulk, postRequestFunc) => {
		// let batch = projectFirestore.batch();
		const batch = writeBatch(projectFirestore);

		let realGuestlist = [];
		setIsPending(true);

		guestlistbulk.forEach((doc) => {
			realGuestlist.push({
				...doc,
				rsvp: '',
				date: moment().format(),
			});
		});

		realGuestlist.forEach((document) => {
			let docRef = doc(collection(projectFirestore, 'users', userId, 'guestlist'));
			batch.set(docRef, document);
		});

		batch.commit();
		setIsPending(false);
		postRequestFunc();
	};

	const editBulkGuest = async (guestDetail, guestIds, postRequestFunc) => {
		const batch = writeBatch(projectFirestore);

		setIsPending(true);

		guestIds.forEach((guestId) => {
			batch.update(doc(projectFirestore, 'users', userId, 'guestlist', guestId), {
				...guestDetail,
			});
		});

		batch.commit();
		setIsPending(false);
		postRequestFunc();
	};

	const deleteBulkGuest = async (guestIds, postRequestFunc) => {
		setIsPending(true);

		const batch = writeBatch(projectFirestore);

		guestIds.forEach((guestId) => {
			batch.delete(doc(projectFirestore, 'users', userId, 'guestlist', guestId));
		});

		await batch.commit();

		setIsPending(false);
		postRequestFunc();
	};

	const deleteBulkOpenInviteGuest = async (guestIds, postRequestFunc) => {
		setIsPending(true);

		const batch = writeBatch(projectFirestore);

		guestIds.forEach((guestId) => {
			batch.delete(doc(projectFirestore, 'users', userId, 'newguestlist', guestId));
		});

		await batch.commit();

		setIsPending(false);
		postRequestFunc();
	};

	const generateGuestInviteId = async (guestInviteId, guestId, postRequestFunc) => {
		setIsPending(true);

		//Get guest name and check for guest name duplication
		let tempGuest = guestlist.filter((guest) => guest.id === guestId)[0];
		let duplicatedGuest = guestlist.filter(
			(guest) => guest.name.toLowerCase() === tempGuest.name.toLowerCase()
		);

		let duplicatedNum = 0;
		for (let i = 0; i < duplicatedGuest.length; i++) {
			if (duplicatedGuest[i].guestInviteId) {
				duplicatedNum++;
			}
		}

		//generate random number to add to the guestinviteid
		function getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}

		//if same guest with name exist, add number add the back of guestinviteid
		if (duplicatedNum > 0) {
			guestInviteId = `${guestInviteId}_${getRandomInt(100)}`;
		}

		try {
			await updateDoc(doc(projectFirestore, 'users', userId, 'guestlist', guestId), {
				guestInviteId: guestInviteId,
			});
			postRequestFunc(`${userData.inviteId}/${guestInviteId}`);
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	const addGuestGroup = async (groupName, postRequestFunc) => {
		setIsPending(true);

		let currentGroup = [];

		if (userData?.groupList) {
			currentGroup = userData.groupList;
		}

		currentGroup.push(groupName);

		const userRef = doc(projectFirestore, 'users', userId);

		await updateDoc(userRef, { groupList: currentGroup })
			.then(() => {
				postRequestFunc();
				getUserData(userId);
				setIsPending(false);
			})
			.catch((error) => {
				console.log(error);
				setError(error);
				setIsPending(false);
			});
	};

	const removeGuestGroup = async (groupName, postRequestFunc) => {
		setIsPending(true); // Set the "isPending" state to true to indicate that the operation is in progress

		let currentGroup = [];

		if (userData?.groupList) {
			currentGroup = userData.groupList;
		}

		// Filter out the group with the specified name from the current group list
		currentGroup = currentGroup.filter((item) => {
			return item !== groupName;
		});

		const userRef = doc(projectFirestore, 'users', userId); // Reference to the user document in Firestore

		try {
			// Update the "groupList" field of the user document with the new group list
			await updateDoc(userRef, { groupList: currentGroup });
			postRequestFunc(); // Call the postRequestFunc after the group is removed
			getUserData(userId); // Refresh the user data
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		} catch (error) {
			console.log(error); // Log the error to the console
			setError(error); // Set the "error" state to the error object
			setIsPending(false); // Set the "isPending" state to false to indicate that the operation is completed
		}
	};

	return {
		addGuestGroup,
		addOpenInviteGuest,
		removeGuestGroup,
		addGuest,
		addOpenInviteBulkGuest,
		updateGuestDetails,
		generateGuestInviteId,
		deleteGuest,
		deleteOpenInviteGuest,
		addBulkGuest,
		editBulkGuest,
		deleteBulkGuest,
		deleteBulkOpenInviteGuest,
		error,
		isPending,
	};
};
