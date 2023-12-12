/** @format */

import { useState } from 'react';
import moment from 'moment';
import {
	doc,
	getDoc,
	updateDoc,
	getDocs,
	addDoc,
	deleteDoc,
	collection,
	writeBatch,
	setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { projectFirestore, projectStorage } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

export const useGuestlistMigration = () => {
	const migrateGroup = (groups, group) => {
		if (groups) return groups;
		else return [group];
	};

	return {
		migrateGroup,
	};
};

export const useUserMigration = () => {
	//users
	const olduid = '7QVfb1A1eHdRBKwBAefGWMDbgd62';
	const newuid = 'nEOe7U5emfa2vZ4C4VLR9np8Oh53';

	const migrateUser = async () => {
		let olduserdata = {};
		//1: Get old users data
		const docRef = doc(projectFirestore, 'users', olduid);
		const docSnap = await getDoc(docRef);

		//2: Save to new users
		if (docSnap.exists()) {
			olduserdata = docSnap.data();
			try {
				await updateDoc(doc(projectFirestore, 'users', newuid), olduserdata);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const migrateCollection = async () => {
		const docRef = collection(projectFirestore, 'users', olduid, 'notifications');
		const docSnap = await getDocs(docRef);

		//2: Save to a temp array
		const tempArray = [];

		docSnap.forEach((doc) => {
			tempArray.push({ ...doc.data(), id: doc.id });
		});

		//3. Save to new users in batch
		const batch = writeBatch(projectFirestore);

		tempArray.forEach((document) => {
			let docRef = doc(projectFirestore, 'users', newuid, 'notifications', document.id);
			batch.set(docRef, document);
		});

		batch.commit();
	};

	return {
		migrateUser,
		migrateCollection,
	};
};
