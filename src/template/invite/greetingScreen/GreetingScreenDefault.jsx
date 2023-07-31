/** @format */

import React from 'react';
//Components import
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import InviteLineLogo from '../../../components/invite/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../../components/icons/inviteIcons';
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
		<InviteTextProvider color='#1D4648' className='text-xl font-medium uppercase'>
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

export const GreetingScreenDefault = ({
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
	enable_gift_registry = false,
	enable_money_gift = false,
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGift = () => {},
}) => {
	const { useConvertText } = useInviteFunc();

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
				<div className='pb-4 border-b-2 w-full border-dotted'>
					<HostsText>{renderHosts}</HostsText>
				</div>
				<div className='flex flex-col gap-4'>
					<GreetingText>{greet_content_1}</GreetingText>
					<GreetingTitle>{greeting_title}</GreetingTitle>
					<GreetingText>{greet_content_2}</GreetingText>
				</div>
				<div className='flex w-full items-center flex-col gap-4'>
					<MajliskuIconV3 />
					<MainTitle>{renderEventTitle}</MainTitle>
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
