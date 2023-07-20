/** @format */

import { createContext, useContext, useReducer } from 'react';
import { Outlet } from 'react-router-dom';

export const OnbaordingContext = createContext(null);
export const OnbaordingDispatchContext = createContext(null);

export function useOnboardingContext() {
	return useContext(OnbaordingContext);
}

export function useOnbardingDispatchContext() {
	return useContext(OnbaordingDispatchContext);
}

const initialState = {
	user: null,
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	eventNature: [],
	guestTotal: null,
	guestGroups: [],
};

export const onboardingReducer = (state, action) => {
	switch (action.type) {
		case 'USER_SIGN_UP':
			return {
				...state,
				user: action.payload,
			};
		case 'SET_EMAIL':
			return {
				...state,
				email: action.payload,
			};
		case 'SET_PASSWORD':
			return {
				...state,
				password: action.payload,
			};

		case 'SET_FIRST_NAME':
			return {
				...state,
				firstName: action.payload,
			};
		case 'SET_LAST_NAME':
			return {
				...state,
				lastName: action.payload,
			};
		case 'ADD_EVENT_NATURE':
			return {
				...state,
				eventNature: [...state.eventNature, action.payload],
			};
		case 'REMOVE_EVENT_NATURE':
			return {
				...state,
				eventNature: state.eventNature.filter((nature) => nature !== action.payload),
			};
		case 'SET_GUEST_TOTAL':
			return {
				...state,
				guestTotal: action.payload,
			};
		case 'ADD_GUEST_GROUP':
			return {
				...state,
				guestGroups: [...state.guestGroups, action.payload],
			};
		case 'REMOVE_GUEST_GROUP':
			return {
				...state,
				guestGroups: state.guestGroups.filter((group) => group !== action.payload),
			};
		default:
			return state;
	}
};

export function OnboardingProvider() {
	const [state, dispatch] = useReducer(onboardingReducer, initialState);

	return (
		<OnbaordingContext.Provider value={state}>
			<OnbaordingDispatchContext.Provider value={dispatch}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Outlet />
				</div>
			</OnbaordingDispatchContext.Provider>
		</OnbaordingContext.Provider>
	);
}
