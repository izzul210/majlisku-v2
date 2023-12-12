/** @format */

import { useQuery } from '@tanstack/react-query';
import { projectFirestore, projectAuth } from '../firebase/config';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';

export const useUserData = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['userData'],
		queryFn: async () => {
			const docRef = doc(projectFirestore, 'users', userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.log('No such document!');
			}
		},
		enabled: !!userId,
	});

	return {
		isLoading,
		error,
		data,
	};
};

//Event Details Related
export const useEventActivity = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['eventActivity'],
		queryFn: async () => {
			const userRef = doc(collection(projectFirestore, 'users'), userId);
			const activityRef = collection(userRef, 'activity');
			const activityQuery = query(activityRef, orderBy('date', 'asc'));
			const querySnapshot = await getDocs(activityQuery);

			let results = [];

			querySnapshot.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});

			return results;
		},
		enabled: !!userId,
	});

	return {
		isLoading,
		error,
		data,
	};
};
export const useGiftlist = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['giftlist'],
		queryFn: async () => {
			const userRef = doc(collection(projectFirestore, 'users'), userId);
			const giftRef = collection(userRef, 'gifts');
			const querySnapshot = await getDocs(giftRef);

			let results = [];

			querySnapshot.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});

			return results;
		},
		enabled: !!userId,
	});

	return {
		isLoading,
		error,
		data,
	};
};

export const useNewGuestlist = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['newGuestlist'],
		queryFn: async () => {
			const userRef = doc(collection(projectFirestore, 'users'), userId);
			const guestRef = collection(userRef, 'newguestlist');
			const querySnapshot = await getDocs(guestRef);

			let results = [];

			querySnapshot.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});

			return results;
		},
		enabled: !!userId,
	});

	return {
		isLoading,
		error,
		data,
	};
};

export const useGuestlist = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['guestlist'],
		queryFn: async () => {
			const userRef = doc(collection(projectFirestore, 'users'), userId);
			const guestRef = collection(userRef, 'guestlist');
			const querySnapshot = await getDocs(guestRef);

			let results = [];

			querySnapshot.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});

			return results;
		},

		enabled: !!userId,
	});

	return {
		isLoading,
		error,
		data,
	};
};

export const useGuestwishes = () => {
	const { data: guestlist } = useGuestlist();
	const { data: newguestlist } = useNewGuestlist();

	const { isLoading, error, data } = useQuery({
		queryKey: ['guestwishes'],
		queryFn: async () => {
			let results = [];

			if (guestlist) {
				guestlist.forEach((guest) => {
					if (guest.response && guest.response.wish !== '') {
						results.push({
							...guest.response,
							name: guest.name,
							id: guest.id,
							hideWish: guest.hideWish ? true : false,
							from: 'guestlist',
						});
					}
				});
			}

			if (newguestlist) {
				newguestlist.forEach((guest) => {
					if (guest.wish && guest.wish !== '') {
						results.push({
							...guest,
							name: guest.name,
							id: guest.id,
							hideWish: guest.hideWish ? true : false,
							from: 'newguestlist',
						});
					}
				});
			}

			//re-organize based on date. latest first
			results.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});

			return results;
		},
		enabled: !!guestlist,
	});

	return {
		isLoading,
		error,
		data,
	};
};
