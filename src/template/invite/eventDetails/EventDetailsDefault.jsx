/** @format */

import React from 'react';
import moment from 'moment';
//Components import
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
//Hooks import
import { useInviteFunc } from '../../../hooks/useInviteFunc';
//Icons import
import { WazeIcon, GoogleMapIcon } from '../../../components/icons/inviteIcons';
const TextContainer = ({ children }) => {
	return (
		<InviteTextProvider
			color='#1D4648'
			className='w-full uppercase text-sm text-start font-medium py-4 border-b border-gray-300 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

const ButtonProvider = ({ type = null, children }) => {
	return (
		<div
			className='w-full font-medium rounded-full py-2 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={
				type === 'primary'
					? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
					: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }
			}>
			{children}
		</div>
	);
};

export const EventDetailsDefault = ({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	waze_link = null,
	google_link = null,
}) => {
	const { useConvertText } = useInviteFunc();

	let formatted_event_date = moment(event_date).format('dddd, D MMMM YYYY');
	let formatted_time = `${moment(event_start).format('h:mm A')} - ${moment(event_end).format(
		'h:mm A'
	)}`;
	let formatted_event_address = useConvertText(event_address);
	let formatted_event_description = useConvertText(description);

	return (
		<div
			className='w-full flex flex-col items-center justify-center gap-12 py-12 sm:py-20'
			style={{
				background:
					'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
			}}>
			<div
				className='w-full flex flex-col gap-1 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<TextContainer>{formatted_event_date}</TextContainer>
				<TextContainer>{formatted_time}</TextContainer>
				<TextContainer>
					<div className='flex flex-col gap-2'>
						{formatted_event_address}
						<div className='flex gap-2'>
							<ButtonProvider>
								<WazeIcon />
							</ButtonProvider>
							<ButtonProvider>
								<GoogleMapIcon />
							</ButtonProvider>
						</div>
					</div>
				</TextContainer>
				<TextContainer>{formatted_event_description}</TextContainer>
			</div>
		</div>
	);
};
