/** @format */

import { useEffect, createContext, useContext, useReducer } from 'react';
//Firestore import
import { projectFirestore, projectAuth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import defaultProfilePic from '../assets/images/defaultProfile.png';

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export function useUserContext() {
	return useContext(UserContext);
}

export function useUserDispatchContext() {
	return useContext(UserDispatchContext);
}

const initialState = {
	userInfo: null,
	authIsReady: false,
	userId: null,
	userPhotoURL: null,
	userData: null,
	giftlist: [],
	guestlistSummary: {
		invited: 0,
		attending: 0,
		notAttending: 0,
		maybe: 0,
		leftOver: 0,
	},
	openInvitesSummary: {
		attending: 0,
	},
	giftReservedSummary: {
		reserved: 0,
		total: 0,
	},
	guestlist: [],
	newguestlist: [],
	wishlist: [],
	design_details: {
		id: null,
		title: '',
		img: '',
		price: 0,
	},
};

export const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER_INFO':
			return {
				...state,
				userInfo: action.payload,
				userId: action.payload.uid,
				userPhotoURL: action.payload?.photoURL ? action.payload.photoURL : defaultProfilePic,
			};
		case 'SET_USER_DATA':
			return {
				...state,
				userData: action.payload,
			};
		case 'SET_GIFTLIST':
			return {
				...state,
				giftlist: action.payload,
			};
		case 'SET_GUESTLIST_SUMMARY':
			return {
				...state,
				guestlistSummary: action.payload,
			};
		case 'SET_OPEN_INVITES_SUMMARY':
			return {
				...state,
				openInvitesSummary: action.payload,
			};
		case 'SET_GIFT_RESERVED_SUMMARY':
			return {
				...state,
				giftReservedSummary: action.payload,
			};
		case 'SET_GUESTLIST':
			return {
				...state,
				guestlist: action.payload,
			};
		case 'SET_NEW_GUESTLIST':
			return {
				...state,
				newguestlist: action.payload,
			};
		case 'AUTH_IS_READY':
			return {
				...state,
				authIsReady: true,
			};
		case 'ADD_WISHLIST':
			return {
				...state,
				wishlist: [...state.wishlist, ...action.payload],
			};
		case 'SET_DESIGN_ID':
			return {
				...state,
				design_details: {
					...state.design_details,
					id: action.payload,
				},
			};
		case 'SET_DESIGN_THEME':
			return {
				...state,
				design_details: action.payload,
			};
		case 'RESET_USER':
			return initialState;

		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	const { userId } = state;

	useEffect(() => {
		onAuthStateChanged(projectAuth, (user) => {
			dispatch({ type: 'AUTH_IS_READY' });
			if (user) {
				dispatch({ type: 'SET_USER_INFO', payload: user });
			} else {
				console.log('no user');
			}
		});
	}, []);

	useEffect(() => {
		if (userId) {
			getUserData(userId);
			getGuestlistSummary(userId);
			getOpenInvitesSummary(userId);
			getGiftReservedSummary(userId);
		}
	}, [userId]);

	const getUserData = async (userId) => {
		const docRef = doc(projectFirestore, 'users', userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) dispatch({ type: 'SET_USER_DATA', payload: docSnap.data() });
		else console.log('No such document!');
	};

	const getGuestlistSummary = async (userId) => {
		let invited = 0;
		let attending = 0;
		let notAttending = 0;
		let maybe = 0;
		let leftOver = 0;
		let tempGuestlist = [];
		let tempWishlist = [];

		const querySnapshot = await getDocs(collection(projectFirestore, 'users', userId, 'guestlist'));

		querySnapshot.forEach((doc) => {
			tempGuestlist.push({ ...doc.data(), id: doc.id });

			let guest = doc.data();
			if (guest.rsvp === 'invited') {
				invited += guest.pax;
			} else if (guest.rsvp === 'attending') {
				attending += guest.pax;
			} else if (guest.rsvp === 'notattending') {
				notAttending += guest.pax;
			} else if (guest.rsvp === 'maybe') {
				maybe += guest.pax;
			} else {
				leftOver++;
			}

			//Add wishlist
			if (doc.data().response && doc.data().response.wish !== '') {
				tempWishlist.push({ ...doc.data().response, name: doc.data().name, id: doc.id });
			} else if (doc.data().wish && doc.data().wish !== '') {
				tempWishlist.push({ ...doc.data(), id: doc.id });
			}
		});

		dispatch({
			type: 'SET_GUESTLIST_SUMMARY',
			payload: {
				invited,
				attending,
				notAttending,
				maybe,
				leftOver,
			},
		});
		dispatch({ type: 'SET_GUESTLIST', payload: tempGuestlist });
		dispatch({ type: 'ADD_WISHLIST', payload: tempWishlist });
	};

	const getOpenInvitesSummary = async (userId) => {
		let attending = 0;
		let tempGuestlist = [];
		let tempWishlist = [];

		const querySnapshot = await getDocs(
			collection(projectFirestore, 'users', userId, 'newguestlist')
		);

		querySnapshot.forEach((doc) => {
			tempGuestlist.push({ ...doc.data(), id: doc.id });
			// doc.data() is never undefined for query doc snapshots
			let guest = doc.data();
			if (guest.rsvp === 'attending') {
				attending += guest.pax;
			}

			//Add wishlist
			if (doc.data().response && doc.data().response.wish !== '') {
				tempWishlist.push({ ...doc.data().response, name: doc.data().name, id: doc.id });
			} else if (doc.data().wish && doc.data().wish !== '') {
				tempWishlist.push({ ...doc.data(), id: doc.id });
			}
		});

		dispatch({
			type: 'SET_OPEN_INVITES_SUMMARY',
			payload: {
				attending,
			},
		});
		dispatch({ type: 'SET_NEW_GUESTLIST', payload: tempGuestlist });
		dispatch({ type: 'ADD_WISHLIST', payload: tempWishlist });
	};

	const getGiftReservedSummary = async (userId) => {
		let reserved = 0;
		let total = 0;

		let tempGift = [];

		const querySnapshot = await getDocs(collection(projectFirestore, 'users', userId, 'gifts'));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			let gift = { ...doc.data(), id: doc.id };
			tempGift.push(gift);
			if (gift.reserved && gift.reserved !== '') {
				reserved++;
			}
		});

		total = querySnapshot.size;

		dispatch({
			type: 'SET_GIFT_RESERVED_SUMMARY',
			payload: {
				reserved,
				total,
			},
		});
		dispatch({
			type: 'SET_GIFTLIST',
			payload: tempGift,
		});
	};

	return (
		<UserContext.Provider value={{ ...state, getUserData, getGiftReservedSummary }}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserContext.Provider>
	);
};
