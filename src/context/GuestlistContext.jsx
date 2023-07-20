/** @format */

import { createContext, useContext, useReducer, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useUserContext, useUserDispatchContext } from './UserContext';

export const GuestlistContext = createContext(null);
export const GuestlistDispatchContext = createContext(null);

export function useGuestlistContext() {
	return useContext(GuestlistContext);
}

export function useGuestlistDispatchContext() {
	return useContext(GuestlistDispatchContext);
}

const initialState = {
	guestlist: [],
	newguestlist: [],
	groupList: [],
	giftlist: [],
	guestlistLoading: true,
	openInviteLoading: true,
	openInviteTotal: 0,
	totalGuest: 0,
	activeTab: 'myGuestlist',
	guestDetails: {},
	openInviteGuestDetails: {},
	//modals
	editGuestlistModal: false,
};

export const guestlistReducer = (state, action) => {
	switch (action.type) {
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
		case 'SET_GROUP_LIST':
			return {
				...state,
				groupList: action.payload,
			};
		case 'SET_OPEN_INVITE_TOTAL':
			return {
				...state,
				openInviteTotal: action.payload,
			};
		case 'SET_TOTAL_GUEST':
			return {
				...state,
				totalGuest: action.payload,
			};
		case 'SET_GUEST_DETAILS':
			return {
				...state,
				guestDetails: action.payload,
			};
		case 'SET_OPEN_INVITE_GUEST_DETAILS':
			return {
				...state,
				openInviteGuestDetails: action.payload,
			};
		case 'SET_EDIT_GUESTLIST_MODAL':
			return {
				...state,
				editGuestlistModal: action.payload,
			};
		case 'SET_ACTIVE_TAB':
			return {
				...state,
				activeTab: action.payload,
			};
		case 'SET_GUESTLIST_LOADING':
			return {
				...state,
				guestlistLoading: action.payload,
			};
		case 'SET_OPEN_INVITE_LOADING':
			return {
				...state,
				openInviteLoading: action.payload,
			};

		default:
			return state;
	}
};

export function GuestlistProvider() {
	const [state, dispatch] = useReducer(guestlistReducer, initialState);
	const { userId, userData } = useUserContext();
	const dispatchUserInfo = useUserDispatchContext();

	useEffect(() => {
		userData && dispatch({ type: 'SET_GROUP_LIST', payload: userData.groupList });
	}, [userData]);

	//Real-time update for Guestlist
	useEffect(() => {
		const userRef = doc(collection(projectFirestore, 'users'), userId);
		const guestlistRef = collection(userRef, 'guestlist');
		const guestlistQuery = query(guestlistRef, orderBy('date', 'desc'));

		const unsub = onSnapshot(guestlistQuery, (snapshot) => {
			let totalGuest = 0;
			// Handle the snapshot data here
			// ...
			const guestlist = snapshot.docs.map((doc) => {
				totalGuest += doc.data().pax;
				return { ...doc.data(), id: doc.id };
			});
			dispatch({ type: 'SET_GUESTLIST', payload: guestlist });
			dispatchUserInfo({ type: 'SET_GUESTLIST', payload: guestlist });
			dispatch({ type: 'SET_TOTAL_GUEST', payload: totalGuest });
			dispatch({ type: 'SET_GUESTLIST_LOADING', payload: false });
		});

		return unsub;
	}, []);

	//Real-time update for Open Invite Guestlist
	useEffect(() => {
		const userRef = doc(collection(projectFirestore, 'users'), userId);
		const guestlistRef = collection(userRef, 'newguestlist');
		const guestlistQuery = query(guestlistRef, orderBy('date', 'desc'));

		const unsub = onSnapshot(guestlistQuery, (snapshot) => {
			// Handle the snapshot data here
			// ...
			const guestlist = snapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			dispatch({ type: 'SET_NEW_GUESTLIST', payload: guestlist });
			dispatchUserInfo({ type: 'SET_NEW_GUESTLIST', payload: guestlist });
			dispatch({ type: 'SET_OPEN_INVITE_TOTAL', payload: guestlist.length });
			dispatch({ type: 'SET_OPEN_INVITE_LOADING', payload: false });
		});

		return unsub;
	}, []);

	return (
		<GuestlistContext.Provider value={state}>
			<GuestlistDispatchContext.Provider value={dispatch}>
				<Outlet />
			</GuestlistDispatchContext.Provider>
		</GuestlistContext.Provider>
	);
}
