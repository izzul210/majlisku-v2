/** @format */
import { useQuery } from '@tanstack/react-query';
import { projectFirestore, projectAuth } from '../firebase/config';
import { collection, getDocs, doc, getDoc, query, orderBy, where } from 'firebase/firestore';
import { useUserContext, useUserDispatchContext } from '../context/UserContext';

const sanitizeOldTheme = (design) => {
	if (design === 'default') return 3;
	else if (design === 'minimal1') return 2;
	else if (design === 'minimal2') return 1;
	else return design;
};

export const useUserData = () => {
	const { userId } = useUserContext();
	const dispatch = useUserDispatchContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['userData'],
		queryFn: async () => {
			const docRef = doc(projectFirestore, 'users', userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const userInfo = docSnap.data();
				const designNum = userInfo?.design_temp_num
					? userInfo?.design_temp_num
					: userInfo?.design_num
					? userInfo?.design_num
					: userInfo?.type
					? userInfo?.type
					: null;
				let design = sanitizeOldTheme(designNum);

				if (design) {
					dispatch({ type: 'SET_DESIGN_ID', payload: design });
				}

				return { userId: docSnap.id, ...docSnap.data() };
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

	return {
		isLoading: false,
		error: null,
		data: results,
	};
};

export const useInviteThemes = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['themes'],
		queryFn: async () => {
			const themesRef = collection(projectFirestore, 'themes');
			const querySnapshot = await getDocs(themesRef);

			let results = [];

			querySnapshot.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});

			results.sort((a, b) => {
				return new Date(a.design_id) - new Date(b.design_id);
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

export const useInviteThemePurchases = (themeId) => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['themePurchases', themeId],
		queryFn: async () => {
			const userRef = doc(collection(projectFirestore, 'themes'), `${themeId}`);
			const themeRef = collection(userRef, 'purchases');
			const querySnapshot = await getDocs(query(themeRef, where('user_id', '==', userId)));

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

export const useUserThemePurchases = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['userThemePurchases'],
		queryFn: async () => {
			const docRef = doc(collection(projectFirestore, 'users'), userId);
			const themeRef = collection(docRef, 'themes');
			const querySnapshot = await getDocs(themeRef);

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
