/** @format */

import { createContext, useContext, useReducer, useEffect } from 'react';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { Outlet } from 'react-router-dom';
import { useUserContext, useUserDispatchContext } from './UserContext';

export const PlannerContext = createContext(null);
export const PlannerDispatchContext = createContext(null);

export function usePlannerContext() {
	return useContext(PlannerContext);
}

export function usePlannerDispatchContext() {
	return useContext(PlannerDispatchContext);
}

const initialState = {
	vendorlist: [],
	checklist: [],
	vendorDetails: {},
	loadingVendor: true,
	loadingChecklist: true,
};

export const plannerReducer = (state, action) => {
	switch (action.type) {
		case 'SET_VENDORLIST':
			return {
				...state,
				vendorlist: action.payload,
			};
		case 'SET_CHECKLIST':
			return {
				...state,
				checklist: action.payload,
			};
		case 'SET_VENDOR_DETAILS':
			return {
				...state,
				vendorDetails: action.payload,
			};
		case 'UPDATE_LOADING_VENDOR':
			return {
				...state,
				loadingVendor: action.payload,
			};
		case 'UPDATE_LOADING_CHECKLIST':
			return {
				...state,
				loadingChecklist: action.payload,
			};
		default:
			return state;
	}
};

export function PlannerProvider() {
	const { userId } = useUserContext();
	const [state, dispatch] = useReducer(plannerReducer, initialState);

	useEffect(() => {
		////////Realtime updates
		const userRef = doc(collection(projectFirestore, 'users'), userId);
		const vendorRef = collection(userRef, 'vendors');
		const vendorQuery = query(vendorRef, orderBy('date', 'desc'));

		const unsub = onSnapshot(vendorQuery, (snapshot) => {
			dispatch({ type: 'UPDATE_LOADING', payload: true });
			let tempVendorlist = [];
			snapshot.docs.forEach((doc) => {
				tempVendorlist.push({
					id: doc.id,
					...doc.data(),
					category:
						typeof doc.data().category === 'string'
							? doc.data().category
							: doc.data().category.title.toLowerCase(),
				});
			});
			dispatch({ type: 'UPDATE_LOADING_VENDOR', payload: false });
			dispatch({ type: 'SET_VENDORLIST', payload: tempVendorlist });
		});

		return unsub;
	}, []);

	useEffect(() => {
		////////Realtime updates
		const userRef = doc(collection(projectFirestore, 'users'), userId);
		const checklistRef = collection(userRef, 'checklist');
		const checklistQuery = query(checklistRef, orderBy('completed', 'asc'));

		const unsub = onSnapshot(checklistQuery, (snapshot) => {
			dispatch({ type: 'UPDATE_LOADING_CHECKLIST', payload: true });
			let tempChecklist = [];
			snapshot.docs.forEach((doc) => {
				tempChecklist.push({
					id: doc.id,
					...doc.data(),
				});
			});
			dispatch({ type: 'UPDATE_LOADING_CHECKLIST', payload: false });
			dispatch({ type: 'SET_CHECKLIST', payload: tempChecklist });
		});

		return unsub;
	}, []);

	return (
		<PlannerContext.Provider value={state}>
			<PlannerDispatchContext.Provider value={dispatch}>
				<Outlet />
			</PlannerDispatchContext.Provider>
		</PlannerContext.Provider>
	);
}
