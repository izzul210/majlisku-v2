/** @format */

import { createContext, useState, useContext, useReducer, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from './UserContext';
//Firebase import
import { projectFirestore } from '../firebase/config';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const DigitalInviteContext = createContext(null);
export const DigitalInviteDispatchContext = createContext(null);
export const DigitalInviteInputErrorContext = createContext(null);

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
	rsvpPreview: null,
	goToPreview: false,
	submitted: false,
	wishlist: [],
	activities: [],
	accordiansCollapsed: false,
	design: 2,
};

const rsvpDetails = {
	event_title_1: '',
	event_title_2: '',
	italic_title: '',
	greeting_1: 'Dengan segala hormatnya kami mempersilakan',
	greeting_2: 'ke majlis resepsi untuk meraikan majlis',
	greeting_title: `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	host_details: '',
	description: '',
	event_date: '',
	event_date_deadline: '',
	event_time: { start: null, end: null },
	event_time_slot_2: null,
	event_location: '',
	location_info: {
		address: '',
		googleLink: '',
		wazeLink: '',
	},
	event_address: '',
	contact_info: [],
	guest_pax_limit: 2,
	rsvp_header_image: '',
	money_gift_details: {
		accNum: null,
		bankName: null,
		name: null,
		qrCodeUrl: null,
	},
	delivery_address: '',
	thank_you_text: '',
	//file
	rsvp_header_image_file: null,
	qrCode_image_file: null,
	//enable states
	enable_multiple_slots: false,
	enable_bahasa: false,
	enable_gift_registry: false,
	enable_itinerary: false,
	enable_money_gift: false,
	enable_unlimited_pax: false,
	enable_wishes: false,
	enable_deadline: false,
};

export const rsvpDetailsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_EVENT_DETAILS':
			return {
				...rsvpDetails,
				...action.payload,
			};

		case 'SET_EVENT_TITLE_1':
			return {
				...state,
				event_title_1: action.payload,
			};
		case 'SET_EVENT_TITLE_2':
			return {
				...state,
				event_title_2: action.payload,
			};
		case 'SET_ITALIC_TITLE':
			return {
				...state,
				italic_title: action.payload,
			};
		case 'SET_GREETING_1':
			return {
				...state,
				greeting_1: action.payload,
			};
		case 'SET_GREETING_2':
			return {
				...state,
				greeting_2: action.payload,
			};
		case 'SET_GREETING_TITLE':
			return {
				...state,
				greeting_title: action.payload,
			};
		case 'SET_HOST_DETAILS':
			return {
				...state,
				host_details: action.payload,
			};
		case 'SET_DESCRIPTION':
			return {
				...state,
				description: action.payload,
			};
		case 'SET_EVENT_DATE':
			return {
				...state,
				event_date: action.payload,
			};
		case 'SET_EVENT_START_TIME':
			return {
				...state,
				event_time: {
					start: action.payload,
					end: state.event_time.end,
				},
			};
		case 'SET_EVENT_END_TIME':
			return {
				...state,
				event_time: {
					end: action.payload,
					start: state.event_time.start,
				},
			};
		case 'SET_EVENT_SLOT_2':
			return {
				...state,
				event_time_slot_2: action.payload,
			};
		case 'SET_EVENT_DATE_DEADLINE':
			return {
				...state,
				event_date_deadline: action.payload,
			};
		case 'SET_EVENT_LOCATION':
			return {
				...state,
				event_location: action.payload,
			};
		case 'SET_EVENT_ADDRESS':
			return {
				...state,
				event_address: action.payload,
			};
		case 'SET_LOCATION_INFO_ADDRESS':
			return {
				...state,
				location_info: {
					...state.location_info,
					address: action.payload,
				},
			};
		case 'SET_GOOGLE_LOCATION_LINK':
			return {
				...state,
				location_info: {
					...state.location_info,
					googleLink: action.payload,
				},
			};
		case 'SET_WAZE_LOCATION_LINK':
			return {
				...state,
				location_info: {
					...state.location_info,
					wazeLink: action.payload,
				},
			};
		case 'SET_CONTACT_INFO':
			return {
				...state,
				contact_info: action.payload,
			};
		case 'EDIT_CONTACT_INFO_BASED_ON_INDEX':
			return {
				...state,
				contact_info: state.contact_info.map((item, index) =>
					index === action.index ? { ...item, ...action.payload } : item
				),
			};

		case 'SET_GUEST_PAX_LIMIT':
			return {
				...state,
				guest_pax_limit: action.payload,
			};
		case 'SET_RSVP_HEADER_IMAGE':
			return {
				...state,
				rsvp_header_image: action.payload,
			};
		case 'SET_MONEY_GIFT_DETAILS':
			return {
				...state,
				money_gift_details: action.payload,
			};
		case 'SET_MONEY_GIFT_NAME':
			return {
				...state,
				money_gift_details: { ...state.money_gift_details, name: action.payload },
			};
		case 'SET_MONEY_GIFT_BANK_NAME':
			return {
				...state,
				money_gift_details: { ...state.money_gift_details, bankName: action.payload },
			};
		case 'SET_MONEY_GIFT_ACC_NUMBER':
			return {
				...state,
				money_gift_details: { ...state.money_gift_details, accNum: action.payload },
			};
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
		case 'SET_DELIVERY_ADDRESS':
			return {
				...state,
				delivery_address: action.payload,
			};
		case 'SET_THANK_YOU_GIFT_TEXT':
			return {
				...state,
				thank_you_text: action.payload,
			};
		case 'ENABLE_BAHASA':
			return {
				...state,
				enable_bahasa: action.payload,
			};
		case 'ENABLE_GIFT_REGISTRY':
			return {
				...state,
				enable_gift_registry: action.payload,
			};
		case 'ENABLE_ITINERARY':
			return {
				...state,
				enable_itinerary: action.payload,
			};
		case 'ENABLE_MONEY_GIFT':
			return {
				...state,
				enable_money_gift: action.payload,
			};
		case 'ENABLE_UNLIMITED_PAX':
			return {
				...state,
				enable_unlimited_pax: action.payload,
			};
		case 'ENABLE_WISHES':
			return {
				...state,
				enable_wishes: action.payload,
			};
		case 'ENABLE_MULTIPLE_SLOT':
			return {
				...state,
				enable_multiple_slots: action.payload,
			};
		case 'ENABLE_DEADLINE':
			return {
				...state,
				enable_deadline: action.payload,
			};
		case 'ADD_TIME_SLOT':
			return {
				...state,
				multiple_time_slot: [...state.multiple_time_slot, action.payload],
			};
		default:
			return state;
	}
};

export const digitalInviteReducer = (state, action) => {
	switch (action.type) {
		case 'SET_RSVP_PREVIEW':
			return {
				...state,
				rsvpPreview: action.payload,
			};
		case 'SET_ACTIVITIES':
			return {
				...state,
				activities: action.payload,
			};
		case 'SET_GO_TO_PREVIEW':
			return {
				...state,
				goToPreview: action.payload,
			};
		case 'SET_SUBMITTED':
			return {
				...state,
				submitted: action.payload,
			};

		case 'SET_WISHLIST':
			return {
				...state,
				wishlist: action.payload,
			};
		case 'SET_DESIGN':
			return {
				...state,
				design: action.payload,
			};
		case 'SET_ACCORDIANS_COLLAPSE':
			return {
				...state,
				accordiansCollapsed: true,
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
	const { userData, userId, wishlist } = useUserContext();
	//Refs for Input Error
	const eventTitle1 = useRef(null);
	const [eventTitle1Error, setEventTitle1Error] = useState(null);
	const eventTitle2 = useRef(null);
	const [eventTitle2Error, setEventTitle2Error] = useState(null);
	const hostedBy = useRef(null);
	const [hostedByError, setHostedByError] = useState(null);
	const dateTime = useRef(null);
	const [dateTimeError, setDateTimeError] = useState(null);
	const locationInfo = useRef(null);
	const [locationInfoError, setLocationInfoError] = useState(null);
	const italicTitle = useRef(null);
	const [italicTitleError, setItalicTitleError] = useState(null);
	const location = useLocation();

	useEffect(() => {
		if (userData?.eventDetails) {
			console.log('eventDetails', userData.eventDetails);
			dispatchInvite({ type: 'SET_EVENT_DETAILS', payload: userData.eventDetails });
		}
	}, [userData, wishlist]);

	function checkForInputError() {
		let contentPage = location.pathname === '/digitalinvite/content' ? true : false;

		// event_title_1, event_title_2, host_details, location.address, event_time.start, evet_time.end, event_date
		setEventTitle1Error(null);
		setEventTitle2Error(null);
		setHostedByError(null);
		setDateTimeError(null);
		setLocationInfoError(null);
		setItalicTitleError(null);
		if (
			inviteState.event_title_1 === '' ||
			inviteState.event_title_2 === '' ||
			inviteState.host_details === '' ||
			inviteState.location_info.address === '' ||
			inviteState.event_time.start === '' ||
			inviteState.event_time.end === '' ||
			inviteState.event_date === '' ||
			inviteState.italic_title === ''
		) {
			if (inviteState.event_title_1 === '') {
				setEventTitle1Error('Please enter event title');
				scrollEventTitle1();
				return;
			}

			if (inviteState.italic_title === '' && contentPage) {
				setItalicTitleError('Please enter event title');
				scrollItalicTitle();
				return;
			}

			if (inviteState.event_title_2 === '') {
				setEventTitle2Error('Please enter event title');
				scrollEventTitle2();
				return;
			}

			if (inviteState.host_details === '') {
				setHostedByError('Please enter host details');
				scrollHostedBy();
				return;
			}

			if (
				(inviteState.event_time?.start === null ||
					inviteState.event_time?.end === null ||
					inviteState.event_date === '') &&
				!contentPage
			) {
				setDateTimeError('Please enter event date and time');
				scrollDateTime();
				return;
			}

			if (inviteState.location_info.address === '' && !contentPage) {
				setLocationInfoError('Please enter location');
				scrollLocationInfo();
				return;
			}

			return;
		} else {
			return true;
		}
	}

	function scrollEventTitle1() {
		eventTitle1.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}
	function scrollEventTitle2() {
		eventTitle2.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}
	function scrollHostedBy() {
		hostedBy.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}
	function scrollDateTime() {
		dateTime.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}
	function scrollLocationInfo() {
		locationInfo.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}
	function scrollItalicTitle() {
		italicTitle.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}

	//Real-time update for Itinerary
	useEffect(() => {
		const userRef = doc(collection(projectFirestore, 'users'), userId);
		const activityRef = collection(userRef, 'activity');
		const activityQuery = query(activityRef, orderBy('date', 'asc'));

		const unsub = onSnapshot(activityQuery, (snapshot) => {
			let totalGuest = 0;
			// Handle the snapshot data here
			// ...
			const activities = snapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});

			dispatch({ type: 'SET_ACTIVITIES', payload: activities });
		});

		return unsub;
	}, []);

	return (
		<DigitalInviteContext.Provider value={{ state, inviteState }}>
			<DigitalInviteInputErrorContext.Provider
				value={{
					checkForInputError,
					eventTitle1,
					eventTitle1Error,
					eventTitle2,
					eventTitle2Error,
					hostedBy,
					hostedByError,
					dateTime,
					dateTimeError,
					locationInfo,
					locationInfoError,
					italicTitle,
					italicTitleError,
				}}>
				<DigitalInviteDispatchContext.Provider value={{ dispatch, dispatchInvite }}>
					<Outlet />
				</DigitalInviteDispatchContext.Provider>
			</DigitalInviteInputErrorContext.Provider>
		</DigitalInviteContext.Provider>
	);
};
