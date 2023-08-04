/** @format */

import React, { useState, useEffect } from 'react';
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
	useDigitalInviteInputErrorContext,
} from '../../context/DigitalInviteContext';
import { useUserContext } from '../../context/UserContext';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import { InfoIcon } from '../../components/icons/inviteIcons';
//Invite components
import { EditFirstScreen } from '../../template/invite/firstScreen/EditFirstScreen';
import { EditGreetingScreen } from '../../template/invite/greetingScreen/EditGreetingScreen';
import { EditEventDetails } from '../../template/invite/eventDetails/EditEventDetails';

const FirstScreen = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
	} = inviteState;

	return (
		<EditFirstScreen
			event_title_1={event_title_1}
			rsvp_header_image={rsvp_header_image}
			rsvp_header_image_file={rsvp_header_image_file}
			event_date={event_date}
			event_location={event_location}
			italic_title={italic_title}
			dispatchInvite={dispatchInvite}
			onChangeEventTitle_1={(e) =>
				dispatchInvite({ type: 'SET_EVENT_TITLE_1', payload: e.target.value })
			}
			onChangeItalicTitle={(e) =>
				dispatchInvite({ type: 'SET_ITALIC_TITLE', payload: e.target.value })
			}
			onChangeEventLocation={(e) =>
				dispatchInvite({ type: 'SET_EVENT_LOCATION', payload: e.target.value })
			}
		/>
	);
};

const GreetingScreen = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greeting_1,
		greeting_2,
		enable_gift_registry,
		enable_money_gift,
	} = inviteState;

	return (
		<EditGreetingScreen
			dispatchInvite={dispatchInvite}
			enable_bahasa={enable_bahasa}
			host_details={host_details}
			event_title_2={event_title_2}
			greeting_title={greeting_title}
			greeting_1={greeting_1}
			greeting_2={greeting_2}
			enable_gift_registry={enable_gift_registry}
			enable_money_gift={enable_money_gift}
		/>
	);
};

const EventDetails = () => {
	const { inviteState } = useDigitalInviteContext();
	const { event_date, event_time, description, location_info } = inviteState;

	return (
		<EditEventDetails
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

function Content() {
	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-24 bg-white sm:bg-transparent'>
			<div className='w-full flex flex-col items-center bg-white max-w-2xl sm:shadow-xl'>
				<FirstScreen />
				<GreetingScreen />
				<EventDetails />
				<div className='flex gap-3 items-center justify-center p-4 border-t border-gray-600 w-full'>
					<InfoIcon />
					<TextProvider className='text-sm'>
						Save and preview to see the rest of e-invite
					</TextProvider>
				</div>
			</div>
		</div>
	);
}

export default Content;
