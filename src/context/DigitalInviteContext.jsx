/** @format */

import { createContext, useState, useContext, useReducer, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useUserContext } from './UserContext';
import { useUserData } from '../hooks/useFetchAPI';
import { usePostRsvp } from '../hooks/usePostAPI';

export const DigitalInviteContext = createContext(null);
export const DigitalInviteDispatchContext = createContext(null);
export const DigitalInviteInputErrorContext = createContext(null);

const initializeEventDetails = {
	//General
	enable_bahasa: false,
	//EventDetails
	event_title_1: '',
	italic_title: '',
	optional_description: '',
	rsvp_header_image: '',
	description: '',
	//DateTime
	event_date: null,
	event_time: { start: null, end: null },
	enable_multiple_slots: false,
	event_time_slot_2: null,
	enable_deadline: false,
	event_date_deadline: null,
	//LocationMap
	event_address: '',
	location_info: {
		wazeLink: '',
		googleLink: '',
		address: '',
	},
	//Greeting
	event_opening_title: '',
	host_details: '',
	greeting_1: '',
	greeting_title: '',
	greeting_2: '',
	event_title_2: '',
	//GuestPax
	enable_unlimited_pax: false,
	guest_pax_limit: 2,
	//ContactInformation
	contact_info: [{ name: '', phone: '' }],
	//Tentative
	enable_itinerary: false,
	//Wishes
	enable_wishes: false,
	//GiftRegistry
	enable_gift_registry: false,
	delivery_address: '',
	thank_you_text: '',
	//MoneyGift
	enable_money_gift: false,
	money_gift_details: {
		qrCodeUrl: '',
		name: '',
		bankName: '',
		accNum: '',
	},
	//Misc
	event_location: '',
};

export function useDigitalInviteContext() {
	return useContext(DigitalInviteContext);
}

export function useDigitalInviteDispatchContext() {
	return useContext(DigitalInviteDispatchContext);
}

export function useDigitalInviteInputErrorContext() {
	return useContext(DigitalInviteInputErrorContext);
}

const initialState = {
	accordiansCollapsed: false,
};

const rsvpDetails = {
	//file
	rsvp_header_image_file: null,
	qrCode_image_file: null,
};

export const rsvpDetailsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_RSVP_HEADER_IMAGE_FILE':
			return {
				...state,
				rsvp_header_image_file: action.payload,
			};
		case 'SET_QR_CODE_IMAGE_FILE':
			return {
				...state,
				qrCode_image_file: action.payload,
			};

		default:
			return state;
	}
};

export const digitalInviteReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ACCORDIANS_COLLAPSE':
			return {
				...state,
				accordiansCollapsed: action.payload,
			};
		case 'RESET_ACCORDIANS_COLLAPSE':
			return {
				...state,
				accordiansCollapsed: false,
			};

		default:
			return state;
	}
};

export const DigitalInviteContextProvider = () => {
	const [state, dispatch] = useReducer(digitalInviteReducer, initialState);
	const [inviteState, dispatchInvite] = useReducer(rsvpDetailsReducer, rsvpDetails);
	const { data: userData } = useUserData();
	//New Stuff
	const methods = useForm();
	const {
		reset,
		setError,
		watch,
		handleSubmit,
		formState: { errors },
	} = methods;

	useEffect(() => {
		if (userData?.eventDetails) {
			reset({ ...initializeEventDetails, ...userData?.eventDetails });
		}
		if (userData?.previewDetails) {
			reset({ ...initializeEventDetails, ...userData?.previewDetails });
		} else {
			reset(initializeEventDetails);
		}
	}, [userData]);

	/*
	dispatch = dispatch non-eventDetails related (for eg: open/close accordians)
	dispatchInvite = dispatch eventDetails related (1. main image 2. bank qrcode image)
	*/
	return (
		<DigitalInviteContext.Provider value={{ state, inviteState, handleSubmit }}>
			<DigitalInviteDispatchContext.Provider value={{ dispatch, dispatchInvite }}>
				<FormProvider {...methods}>
					<Outlet />
				</FormProvider>
			</DigitalInviteDispatchContext.Provider>
		</DigitalInviteContext.Provider>
	);
};
