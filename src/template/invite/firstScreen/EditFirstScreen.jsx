/** @format */

import React from 'react';
//Components import
import EditContentField from '../../../components/atom/InputField/EditContentField';
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import ImageUploadContent from '../../../components/atom/ImageUpload/ImageUploadContent';
import { MajliskuIcon } from '../../../components/icons/brandIcons';
import moment from 'moment';

const RsvpHeaderImage = ({ rsvp_header_image }) => {
	return <img src={rsvp_header_image} alt='rsvp_header_image' className='w-full' />;
};

export const EditFirstScreen = ({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = 'Groom & Bride',
	onChangeEventTitle_1 = () => {},
	onChangeRsvpHeaderImage = () => {},
	onChangeEventLocation = () => {},
	onChangeItalicTitle = () => {},
	dispatchInvite,
}) => {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	return (
		<div
			className='w-full flex flex-col gap-4 justify-center items-center p-5 py-12'
			style={{ minHeight: '700px', maxWidth: '383px' }}>
			<MajliskuIcon />
			<EditContentField
				fontStyle={{
					fontSize: '16px',
					fontFamily: 'EB Garamond',
					fontWeight: '500',
					textTransform: 'uppercase',
				}}
				placeholder='Walimatulurus'
				className='edit-text-center'
				name='event_title_1'
				onChange={onChangeEventTitle_1}
				value={event_title_1}
				fullWidth
			/>
			<ImageUploadContent
				defaultImgUrl={rsvpHeaderImage}
				dispatch={dispatchInvite}
				type='SET_RSVP_HEADER_IMAGE_FILE'
				aspectRatio={0.88}
			/>
			<EditContentField
				fontStyle={{
					fontSize: '48px',
					fontFamily: 'Great Vibes',
					fontWeight: '500',
				}}
				placeholder='Izzul + Syaff'
				className='edit-text-center'
				name='italic_title'
				onChange={onChangeItalicTitle}
				value={italic_title}
				multiline
				fullWidth
			/>
			<div className='flex flex-col gap-2 w-full'>
				<InviteTextProvider className='uppercase text-base font-semibold'>
					{event_date ? moment(event_date).format('DD.MM.YYYY') : '21.10.1997'}
				</InviteTextProvider>
				<EditContentField
					fontStyle={{
						fontSize: '16px',
						fontFamily: 'EB Garamond',
						fontWeight: '500',
						textTransform: 'uppercase',
					}}
					placeholder='Shah Alam, Selangor'
					className='edit-text-center'
					name='event_location'
					onChange={onChangeEventLocation}
					value={event_location}
					fullWidth
				/>
			</div>
		</div>
	);
};
