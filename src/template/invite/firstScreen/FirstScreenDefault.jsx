/** @format */

import React from 'react';
//Components import
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import { MajliskuIcon } from '../../../components/icons/brandIcons';
import moment from 'moment';

const EventTitle_1 = ({ children }) => {
	return <InviteTextProvider className='uppercase font-semibold'>{children}</InviteTextProvider>;
};

const EventTitle_Playfair = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='playfair' className='uppercase text-lg font-medium'>
			{children}
		</InviteTextProvider>
	);
};

const RsvpHeaderImage = ({ rsvp_header_image, curveTopBorder = false }) => {
	return (
		<img
			src={rsvp_header_image}
			alt='rsvp_header_image'
			className='w-full'
			style={{
				borderTopLeftRadius: curveTopBorder ? 160 : 0,
				borderTopRightRadius: curveTopBorder ? 160 : 0,
			}}
		/>
	);
};

const ItalicTitle = ({ children }) => {
	return <InviteTextProvider className='greatVibes text-5xl'>{children}</InviteTextProvider>;
};

const ItalicTitle_Playfair = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='playfair' className='text-3xl uppercase my-4'>
			{children}
		</InviteTextProvider>
	);
};

const DateLocation = ({ children }) => {
	return (
		<InviteTextProvider className='uppercase text-base font-mediun tracking-wide'>
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
			<RsvpHeaderImage rsvp_header_image={rsvpHeaderImage} curveTopBorder />
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

export const FirstScreen2 = ({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = '',
	event_start = null,
	event_end = null,
}) => {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	let formatted_time = event_start
		? `${moment(event_start).format('h:mm A')} - ${moment(event_end).format('h:mm A')}`
		: null;

	return (
		<div
			className='w-full flex flex-col gap-4 justify-center items-center px-5 py-12 sm:py-24'
			style={{ minHeight: '700px', maxWidth: '383px' }}>
			<MajliskuIcon />
			<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
			<RsvpHeaderImage rsvp_header_image={rsvpHeaderImage} />
			<ItalicTitle_Playfair>{italic_title}</ItalicTitle_Playfair>
			<DateLocation>
				<div className='flex flex-col gap-1'>
					<div>{moment(event_date).format('dddd, D MMMM YYYY')}</div>
					<div>{formatted_time}</div>
					<div>{event_location}</div>
				</div>
			</DateLocation>
		</div>
	);
};

export const FirstScreen3 = ({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = '',
	event_start = null,
	event_end = null,
}) => {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	let formatted_time = event_start
		? `${moment(event_start).format('h:mm A')} - ${moment(event_end).format('h:mm A')}`
		: null;

	return (
		<div
			className='w-full flex flex-col gap-4 justify-center items-center px-5 py-12 sm:py-24'
			style={{ minHeight: '700px', maxWidth: '383px' }}>
			<MajliskuIcon />
			<div className='border-b border-t w-full py-4 border-gray-300'>
				<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
			</div>

			<RsvpHeaderImage rsvp_header_image={rsvpHeaderImage} />
			<ItalicTitle_Playfair>{italic_title}</ItalicTitle_Playfair>
			<div className='border-b border-t w-full py-4 border-gray-300'>
				<DateLocation>
					<div className='flex flex-col gap-1'>
						<div>{moment(event_date).format('dddd, D MMMM YYYY')}</div>
						<div>{formatted_time}</div>
						<div>{event_location}</div>
					</div>
				</DateLocation>
			</div>
		</div>
	);
};
