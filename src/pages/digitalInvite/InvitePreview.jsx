/** @format */

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
import { useUserContext } from '../../context/UserContext';
//Invite components
import {
	FirstScreenDefault,
	FirstScreen2,
	FirstScreen3,
} from '../../template/invite/firstScreen/FirstScreenDefault';
import { GreetingScreenDefault } from '../../template/invite/greetingScreen/GreetingScreenDefault';
import {
	EventDetails2,
	EventDetailsDefault,
} from '../../template/invite/eventDetails/EventDetailsDefault';
import { TentativeAccordian, TentativeDefault } from '../../template/invite/tetantive/Tentative';
import { ContactAccordian, ContactDefault } from '../../template/invite/contacts/Contacts';
import { WishAccordian, WishDefault } from '../../template/invite/wishlist/Wishlist';
import { CalendarAccordian, CalendarDefault } from '../../template/invite/calendar/Calendar';
//Components import
import { BackIcon } from '../../components/icons/actionIcons';
import TextProvider from '../../components/atom/TextProvider/TextProvider';

const FirstScreen = () => {
	const { inviteState, state } = useDigitalInviteContext();
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
		event_time,
	} = inviteState;
	const { design } = state;

	useEffect(() => {}, [design]);

	const FirstScreenComponent = () => {
		return (
			<FirstScreenDefault
				event_title_1={event_title_1}
				rsvp_header_image={rsvp_header_image}
				rsvp_header_image_file={rsvp_header_image_file}
				event_date={event_date}
				event_location={event_location}
				italic_title={italic_title}
			/>
		);
	};

	const FirstScreen2Component = () => {
		return (
			<FirstScreen2
				event_title_1={event_title_1}
				rsvp_header_image={rsvp_header_image}
				rsvp_header_image_file={rsvp_header_image_file}
				event_date={event_date}
				event_location={event_location}
				italic_title={italic_title}
				event_start={event_time?.start}
				event_end={event_time?.end}
			/>
		);
	};

	const FirstScreen3Component = () => {
		return (
			<FirstScreen3
				event_title_1={event_title_1}
				rsvp_header_image={rsvp_header_image}
				rsvp_header_image_file={rsvp_header_image_file}
				event_date={event_date}
				event_location={event_location}
				italic_title={italic_title}
				event_start={event_time?.start}
				event_end={event_time?.end}
			/>
		);
	};

	switch (design) {
		case 0:
			return <FirstScreenComponent />;
		case 1:
			return <FirstScreen2Component />;
		case 2:
			return <FirstScreen3Component />;
		default:
			return <FirstScreen3Component />;
	}
};

const GreetingScreen = () => {
	const { inviteState } = useDigitalInviteContext();
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	} = inviteState;

	return (
		<GreetingScreenDefault
			enable_bahasa={enable_bahasa}
			host_details={host_details}
			event_title_2={event_title_2}
			greeting_title={greeting_title}
			greet_content_1={greet_content_1}
			greet_content_2={greet_content_2}
			enable_gift_registry={enable_gift_registry}
			enable_money_gift={enable_money_gift}
		/>
	);
};

const EventDetails = () => {
	const { inviteState, state } = useDigitalInviteContext();
	const { event_date, event_time, description, location_info } = inviteState;
	const { design } = state;

	useEffect(() => {}, [design]);

	const eventDetailsProps = {
		event_date,
		event_start: event_time?.start,
		event_end: event_time?.end,
		description,
		event_address: location_info.address,
		waze_link: location_info?.wazeLink,
		google_link: location_info?.googleLink,
	};

	switch (design) {
		case 0:
			return <EventDetailsDefault {...eventDetailsProps} background='white' />;
		case 1:
			return <EventDetails2 {...eventDetailsProps} />;
		default:
			return <EventDetailsDefault {...eventDetailsProps} />;
	}
};

const Tentative = () => {
	const { state, inviteState } = useDigitalInviteContext();
	const { enableBahasa } = inviteState;
	const { activities, design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <TentativeDefault activities={activities} enableBahasa={enableBahasa} />;
			default:
				return <TentativeAccordian activities={activities} enableBahasa={enableBahasa} />;
		}
	};

	return renderComponent();
};

const Contacts = () => {
	const { inviteState, state } = useDigitalInviteContext();
	const { contact_info, emable_bahasa } = inviteState;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <ContactDefault contact_info={contact_info} emable_bahasa={emable_bahasa} />;
			default:
				return <ContactAccordian contact_info={contact_info} emable_bahasa={emable_bahasa} />;
		}
	};

	return renderComponent();
};

const Wishlist = () => {
	const { inviteState, state } = useDigitalInviteContext();
	const { wishlist } = useUserContext();
	const { emable_bahasa } = inviteState;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <WishDefault wishlist={wishlist} emable_bahasa={emable_bahasa} />;
			default:
				return <WishAccordian wishlist={wishlist} emable_bahasa={emable_bahasa} />;
		}
	};

	return renderComponent();
};

const Calendar = () => {
	const { inviteState, state } = useDigitalInviteContext();
	const { enable_bahasa, event_date, location_info, event_time, event_title_1, italic_title } =
		inviteState;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return (
					<CalendarDefault
						enable_bahasa={enable_bahasa}
						location_info={location_info}
						event_time={event_time}
						event_date={event_date}
						event_title={`${event_title_1} ${italic_title}`}
					/>
				);
			default:
				return (
					<CalendarAccordian
						enable_bahasa={enable_bahasa}
						location_info={location_info}
						event_time={event_time}
						event_date={event_date}
						event_title={`${event_title_1} ${italic_title}`}
					/>
				);
		}
	};

	return renderComponent();
};

function InvitePreview() {
	let navigate = useNavigate();

	return (
		<>
			<AppBar
				position='fixed'
				sx={{
					display: { xs: 'block', sm: 'block' },
					width: '100vw',
					padding: '14px 18px',
					backgroundColor: '#1E1E1E',
					boxShadow: 'none',
				}}>
				<div className='flex gap-4 items-center justify-start w-full'>
					<div className='cursor-pointer' onClick={() => navigate(-1)}>
						<BackIcon fill='white' width={28} height={24} />
					</div>
					<TextProvider color='white'>Previewing draft</TextProvider>
				</div>
			</AppBar>
			<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-24 bg-white sm:bg-transparent'>
				<div className='w-full flex flex-col items-center bg-white max-w-2xl sm:shadow-xl'>
					<FirstScreen />
					<GreetingScreen />
					<EventDetails />
					<div
						className='w-full flex gap-6 flex-col px-4 sm:px-0 py-12'
						style={{ maxWidth: '400px' }}>
						<Tentative />
						<Contacts />
						<Wishlist />
						<Calendar />
					</div>
				</div>
			</div>
		</>
	);
}

export default InvitePreview;
