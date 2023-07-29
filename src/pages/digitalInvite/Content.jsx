/** @format */

import React, { useState, useEffect } from 'react';
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
//Invite components
import { FirstScreenDefault } from '../../template/invite/firstScreen/FirstScreenDefault';
import { GreetingScreenDefault } from '../../template/invite/greetingScreen/GreetingScreenDefault';

function Content() {
	const { inviteState } = useDigitalInviteContext();
	const { event_title_1, rsvp_header_image, event_date, event_address, italic_title } = inviteState;

	useEffect(() => {
		inviteState && console.log('inviteState in Content', inviteState);
	}, [inviteState]);

	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-24 bg-white sm:bg-transparent'>
			<div className='w-full flex flex-col items-center bg-white max-w-2xl sm:shadow-xl'>
				<FirstScreen />
				<GreetingScreen />
			</div>
		</div>
	);
}

const FirstScreen = () => {
	const { inviteState } = useDigitalInviteContext();
	const { event_title_1, rsvp_header_image, event_date, event_location, italic_title } =
		inviteState;

	return (
		<FirstScreenDefault
			event_title_1={event_title_1}
			rsvp_header_image={rsvp_header_image}
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

export default Content;
