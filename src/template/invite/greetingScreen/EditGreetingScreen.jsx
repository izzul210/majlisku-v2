/** @format */

import React from 'react';
//Components import
import EditContentField from '../../../components/atom/InputField/EditContentField';
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import InviteLineLogo from '../../../components/invite/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../../components/icons/inviteIcons';
//Context import
import { useDigitalInviteInputErrorContext } from '../../../context/DigitalInviteContext';
//Hooks import
import { useInviteFunc } from '../../../hooks/useInviteFunc';

const HostsText = ({ children }) => {
	return (
		<InviteTextProvider className='text-sm font-medium uppercase'>{children}</InviteTextProvider>
	);
};

const GreetingText = ({ children }) => {
	return <InviteTextProvider className='text-base'>{children}</InviteTextProvider>;
};

const GreetingTitle = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='playfair' color='#1E1E1E' className='text-sm font-semibold'>
			{children}
		</InviteTextProvider>
	);
};

const MainTitle = ({ children }) => {
	return (
		<InviteTextProvider color='#1D4648' className='text-base font-semibold uppercase'>
			{children}
		</InviteTextProvider>
	);
};

const ButtonProvider = ({ type = null, children }) => {
	return (
		<div
			className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={
				type === 'primary'
					? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
					: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }
			}>
			{children}
		</div>
	);
};

export const EditGreetingScreen = ({
	dispatchInvite,
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greeting_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greeting_2 = 'ke majlis resepsi untuk meraikan majlis',
	enable_gift_registry = false,
	enable_money_gift = false,
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGift = () => {},
}) => {
	const { useConvertText } = useInviteFunc();
	const { hostedBy, hostedByError, eventTitle2, eventTitle2Error } =
		useDigitalInviteInputErrorContext();

	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

	return (
		<div
			className='w-full border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
			style={{ minHeight: '600px' }}>
			<div
				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<InviteLineLogo height='2px' />
				<div ref={hostedBy} className='pb-2 border-b-2 w-full border-dotted'>
					<EditContentField
						fontStyle={{
							fontSize: '16px',
							fontFamily: 'EB Garamond',
							fontWeight: '500',
							textTransform: 'uppercase',
						}}
						placeholder='Simpulan bin Simpulan
&
Simpulan binti Simpulan'
						className='edit-text-center'
						name='host_details'
						onChange={(e) => dispatchInvite({ type: 'SET_HOST_DETAILS', payload: e.target.value })}
						value={host_details}
						multiline
						fullWidth
						error={hostedByError ? true : false}
					/>
				</div>
				<div className='flex flex-col gap-0 w-full'>
					<EditContentField
						fontStyle={{
							fontSize: '16px',
							fontFamily: 'EB Garamond',
							fontWeight: '400',
							textTransform: 'normal',
						}}
						placeholder='Dengan segala hormatnya kami mempersilakan'
						className='edit-text-center'
						name='greeting_1'
						onChange={(e) => dispatchInvite({ type: 'SET_GREETING_1', payload: e.target.value })}
						value={greeting_1}
						multiline
						fullWidth
					/>
					<EditContentField
						fontStyle={{
							fontSize: '16px',
							fontFamily: 'Playfair Display',
							fontWeight: '600',
							textTransform: 'normal',
						}}
						placeholder='ke majlis resepsi untuk meraikan majlis'
						className='edit-text-center'
						name='greeting_title'
						onChange={(e) =>
							dispatchInvite({ type: 'SET_GREETING_TITLE', payload: e.target.value })
						}
						value={greeting_title}
						multiline
						fullWidth
					/>
					<EditContentField
						fontStyle={{
							fontSize: '16px',
							fontFamily: 'EB Garamond',
							fontWeight: '400',
							textTransform: 'normal',
						}}
						placeholder='ke majlis resepsi untuk meraikan majlis'
						className='edit-text-center'
						name='greeting_2'
						onChange={(e) => dispatchInvite({ type: 'SET_GREETING_2', payload: e.target.value })}
						value={greeting_2}
						multiline
						fullWidth
					/>
				</div>
				<div className='flex w-full items-center flex-col gap-4' ref={eventTitle2}>
					<MajliskuIconV3 />
					<EditContentField
						fontStyle={{
							fontSize: '18px',
							fontFamily: 'EB Garamond',
							fontWeight: '600',
							textTransform: 'uppercase',
						}}
						placeholder='Izzul Syazwan bin Mohd Rizal
&
Nurul Syafiqah binti Othman'
						className='edit-text-center'
						name='event_title_2'
						onChange={(e) => dispatchInvite({ type: 'SET_EVENT_TITLE_2', payload: e.target.value })}
						value={event_title_2}
						multiline
						fullWidth
						error={eventTitle2Error ? true : false}
					/>
					<MajliskuIconV3 />
				</div>
			</div>
			<div className='w-full flex flex-col gap-2' style={{ maxWidth: '290px' }}>
				<ButtonProvider type='primary' onClick={onClickRSVP}>
					<InviteTextProvider className='uppercase' color='white'>
						RSVP
					</InviteTextProvider>
				</ButtonProvider>
				<ButtonProvider onClick={onClickRSVP}>
					<GiftIcon />
					<InviteTextProvider className='uppercase'>
						{enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
					</InviteTextProvider>
				</ButtonProvider>
				<ButtonProvider onClick={onClickRSVP}>
					<MoneyGift />
					<InviteTextProvider className='uppercase'>
						{enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
					</InviteTextProvider>
				</ButtonProvider>
			</div>
		</div>
	);
};
