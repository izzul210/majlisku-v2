/** @format */

import React from 'react';
//Components import
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import { MajliskuIcon } from '../../../components/icons/brandIcons';
import moment from 'moment';

const EventTitle_1 = ({ children }) => {
	return <InviteTextProvider className='uppercase font-semibold'>{children}</InviteTextProvider>;
};

const RsvpHeaderImage = ({ rsvp_header_image }) => {
	return <img src={rsvp_header_image} alt='rsvp_header_image' className='w-full' />;
};

const ItalicTitle = ({ children }) => {
	return <InviteTextProvider className='greatVibes text-5xl'>{children}</InviteTextProvider>;
};

const DateLocation = ({ children }) => {
	return (
		<InviteTextProvider className='uppercase text-base font-semibold'>
			{children}
		</InviteTextProvider>
	);
};

export const FirstScreenDefault = ({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = '',
}) => {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	return (
		<div
			className='w-full flex flex-col gap-4 justify-center items-center p-5'
			style={{ minHeight: '700px', maxWidth: '383px' }}>
			<MajliskuIcon />
			<EventTitle_1>{event_title_1}</EventTitle_1>
			<RsvpHeaderImage rsvp_header_image={rsvpHeaderImage} />
			<ItalicTitle>{italic_title}</ItalicTitle>
			<DateLocation>
				<div className='flex flex-col gap-2'>
					<div>{moment(event_date).format('DD.MM.YYYY')}</div>
					<div>{event_location}</div>
				</div>
			</DateLocation>
		</div>
	);
};
