/** @format */

import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
//Components import
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import TextProvider from '../../../components/atom/TextProvider/TextProvider';
import ModalProvider from '../../../components/atom/ModalProvider/ModalProvider2';
import ButtonProvider from '../../../components/atom/ButtonProvider/ButtonProvider';
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

const InviteButtonProvider = ({ type = null, children }) => {
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

export const EditEventDetails = ({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Tema:\n\nLelaki: Baju Melayu/Batik\nPerempuan: Baju Kurung/Bersesuaian',
	waze_link = null,
	google_link = null,
}) => {
	const { useConvertText } = useInviteFunc();
	const [modal, setModal] = useState(false);
	let navigate = useNavigate();

	let formatted_event_date =
		event_date !== '' ? moment(event_date).format('dddd, D MMMM YYYY') : 'Friday, 21 October, 1997';
	let formatted_time = event_start
		? `${moment(event_start).format('h:mm A')} - ${moment(event_end).format('h:mm A')}`
		: '9:00AM - 4:00PM';
	let formatted_event_address = useConvertText(
		event_address !== '' ? event_address : '101-5825 Vine St,\nVancouver,\nV6M4A2BC'
	);
	let formatted_event_description = useConvertText(
		description !== ''
			? description
			: 'Tema:\n\nLelaki: Baju Melayu/Batik\nPerempuan: Baju Kurung/Bersesuaian'
	);

	return (
		<>
			<div
				onClick={() => setModal(true)}
				className='w-full cursor-pointer flex flex-col items-center justify-center gap-12 py-12 sm:py-20'
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
								<InviteButtonProvider>
									<WazeIcon />
								</InviteButtonProvider>
								<InviteButtonProvider>
									<GoogleMapIcon />
								</InviteButtonProvider>
							</div>
						</div>
					</TextContainer>
					<TextContainer>{formatted_event_description}</TextContainer>
				</div>
			</div>

			<ModalProvider
				isOpen={modal}
				handleClose={() => setModal(false)}
				title='Change Event Details'>
				<>
					<div className='p-4 sm:p-6'>
						<TextProvider>
							To change date, location and other event details, kindly go to Settings
						</TextProvider>
					</div>
					<div className='border-t p-3'>
						<div className='flex uppercase justify-end gap-2'>
							<ButtonProvider width='75px' onClick={() => setModal(false)}>
								Close
							</ButtonProvider>
							<ButtonProvider
								width='120px'
								type='primary'
								onClick={() => navigate('/digitalinvite')}>
								Open Setting
							</ButtonProvider>
						</div>
					</div>
				</>
			</ModalProvider>
		</>
	);
};
