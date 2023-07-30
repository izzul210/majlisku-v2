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
import { FirstScreenDefault } from '../../template/invite/firstScreen/FirstScreenDefault';
import { GreetingScreenDefault } from '../../template/invite/greetingScreen/GreetingScreenDefault';
import { EventDetailsDefault } from '../../template/invite/eventDetails/EventDetailsDefault';
import { TentativeAccordian } from '../../template/invite/tetantive/Tentative';
import { ContactAccordian } from '../../template/invite/contacts/Contacts';
import { WishAccordian } from '../../template/invite/wishlist/Wishlist';
import { CalendarAccordian } from '../../template/invite/calendar/Calendar';
//Components import
import { BackIcon } from '../../components/icons/actionIcons';
import TextProvider from '../../components/atom/TextProvider/TextProvider';

const FirstScreen = () => {
	const { inviteState } = useDigitalInviteContext();
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
	} = inviteState;

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
	const { inviteState } = useDigitalInviteContext();
	const { event_date, event_time, description, location_info } = inviteState;

	return (
		<EventDetailsDefault
			event_date={event_date}
			event_start={event_time?.start}
			event_end={event_time?.end}
			description={description}
			event_address={location_info.address}
			waze_link={location_info?.wazeLink}
			google_link={location_info?.googleLink}
		/>
	);
};

const Tentative = () => {
	const { state, inviteState } = useDigitalInviteContext();
	const { enable_bahasa } = inviteState;
	const { activities } = state;

	return <TentativeAccordian activities={activities} enable_bahasa={enable_bahasa} />;
};

const Contacts = () => {
	const { inviteState } = useDigitalInviteContext();
	const { contact_info, emable_bahasa } = inviteState;

	return <ContactAccordian contact_info={contact_info} emable_bahasa={emable_bahasa} />;
};

const Wishlist = () => {
	const { inviteState } = useDigitalInviteContext();
	const { wishlist } = useUserContext();
	const { emable_bahasa } = inviteState;

	return <WishAccordian wishlist={wishlist} emable_bahasa={emable_bahasa} />;
};

const Calendar = () => {
	const { inviteState } = useDigitalInviteContext();
	const { enable_bahasa, event_date, location_info, event_time, event_title_1, italic_title } =
		inviteState;

	return (
		<CalendarAccordian
			enable_bahasa={enable_bahasa}
			location_info={location_info}
			event_time={event_time}
			event_date={event_date}
			event_title={`${event_title_1} ${italic_title}`}
		/>
	);
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
						className='w-full flex gap-4 flex-col px-4 sm:px-0 py-8'
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
