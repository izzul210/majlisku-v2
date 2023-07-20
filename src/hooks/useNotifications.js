/** @format */

import { useUserContext } from '../context/UserContext';
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

export const useNotifications = () => {
	const { userId } = useUserContext();

	const markNotificationsRead = async (unreadNotificationsId) => {
		const batch = writeBatch(projectFirestore);

		unreadNotificationsId.forEach((notificationId) => {
			batch.update(doc(projectFirestore, 'users', userId, 'notifications', notificationId), {
				read: true,
			});
		});

		batch
			.commit()
			.then(() => {
				console.log('Notifications read!');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return {
		markNotificationsRead,
	};
};
