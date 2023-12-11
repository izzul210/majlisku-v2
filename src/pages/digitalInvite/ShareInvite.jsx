/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
//Component import
import SettingCard from '../../components/cards/SettingCard';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
//Icons import
import { CopyIcon, ViewAllIcon } from '../../components/icons/actionIcons';
//Assets import
import customizeLinkImg from '../../assets/images/customize-link-preview-img.png';
import personalized1Img from '../../assets/images/personalized-1.png';
import personalized2Img from '../../assets/images/personalized-2.png';
import personalized3Img from '../../assets/images/personalized-3.png';
import personalized4Img from '../../assets/images/personalized-4.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const SubTitleText = ({ children }) => (
	<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
		{children}
	</TextProvider>
);

const SubDescriptionText = ({ children }) => (
	<TextProvider className='font-normal text-sm' color='text-gray-600'>
		{children}
	</TextProvider>
);

const InputTitleText = ({ children }) => (
	<TextProvider className='uppercase font-semibold text-sm mb-0'>{children}</TextProvider>
);

const DigitalInvitePublished = () => {
	return (
		<div className='flex gap-2 p-4 text-start'>
			<div className='w-[32px]'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='32'
					viewBox='0 0 32 32'
					fill='none'>
					<path
						d='M15.9987 5.33301C10.1107 5.33301 5.33203 10.1117 5.33203 15.9997C5.33203 21.8877 10.1107 26.6663 15.9987 26.6663C21.8867 26.6663 26.6654 21.8877 26.6654 15.9997C26.6654 10.1117 21.8867 5.33301 15.9987 5.33301ZM13.108 20.5757L9.2787 16.7463C8.8627 16.3303 8.8627 15.6583 9.2787 15.2423C9.6947 14.8263 10.3667 14.8263 10.7827 15.2423L13.8654 18.3143L21.204 10.9757C21.62 10.5597 22.292 10.5597 22.708 10.9757C23.124 11.3917 23.124 12.0637 22.708 12.4797L14.612 20.5757C14.2067 20.9917 13.524 20.9917 13.108 20.5757Z'
						fill='#419E6A'
					/>
				</svg>
			</div>

			<div className='flex flex-col gap-2'>
				<TextProvider colorStyle='#1D4648' className='text-[20px] font-semibold'>
					Your digital invitation is now published and ready to share!
				</TextProvider>
				<TextProvider colorStyle='#667085' className='text-[16px] font-semibold'>
					Customize your preview link and share it with your guests publicly or personally{' '}
				</TextProvider>
			</div>
		</div>
	);
};

/******** Customize Link Preview *********/
const CustomizeLinkPreview = () => {
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewDescription, setPreviewDescription] = useState('');
	const [personalMessage, setPersonalMessage] = useState('');

	return (
		<SettingCard cardTitle='Customize Link Preview'>
			<div className='px-6 sm:p-6 text-start'>
				<img src={customizeLinkImg} className='w-auto h-auto mb-4 sm:h-72 rounded-xl' />
				<TextProvider className='text-[16px] my-2 font-semibold' colorStyle='#667085'>
					Sending your personalized link to your guest will unveil a delightful preview
				</TextProvider>
				<div className='flex flex-col gap-3 my-4'>
					<InputFieldProvider
						title='Preview Title'
						placeholder='Walimatulurus Izzul & Syaf'
						value={previewTitle}
						minHeight='30px'
						onChange={(e) => {
							setPreviewTitle(e.target.value);
						}}
					/>
					<TextAreaProvider
						title='Preview Description'
						placeholder='Sila tekan untuk sampaikan kehadiran anda'
						value={previewDescription}
						className='text-left'
						minHeight='30px'
						onChange={(e) => {
							setPreviewDescription(e.target.value);
						}}
					/>
					<ButtonProvider type='primary' width='150px' className='uppercase'>
						Update Preview
					</ButtonProvider>
				</div>
				<div className='flex flex-col gap-3 my-4'>
					<TextAreaProvider
						title='Message'
						placeholder='🌹 UNDANGAN WALIMATUL URUS 🌹
 
Assalamualaikum & Salam Sejahtera.
                        
Nornizam Bin Kamarudin
& Arfah Binti Mat Isa
                        
Dengan segala hormatnya kami menjemput
YBhg. Dato’/Datin/Tuan/Puan/Encik/Cik
 ke walimatul urus putera kami yang dikasihi
                        
🤵🏻 Amirul Faiz Bin Nornizam
&
👰🏻‍♀ Nur Afina Firdaus Binti Mohamed Ibrahim
                        
yang akan berlangsung   pada
                        
 🗓️
Sabtu, 18 Februari 2023
27 Rejab 1444 H
                        
 🕖
11.00 am – 4.00 pm
                        
📍
 Mini Stadium Bistari
 Jalan Ayer Keroh Lama
75450 Ayer Keroh, Melaka
                        
Maklumat lanjut & Kehadiran (RSVP)
(Sila klik link di bawah ini)
                        
https://invite.majlisku.app/nur-amirul-801e/izzul
                        
Sekian, terima kasih.'
						value={personalMessage}
						className='text-left'
						minHeight='280px'
						onChange={(e) => {
							setPersonalMessage(e.target.value);
						}}
					/>
					<SubDescriptionText>
						Copy and paste to WhatsApp or any other messenger along with the link
					</SubDescriptionText>
					<ButtonProvider width='160px' className='uppercase'>
						<CopyIcon />
						Copy Message
					</ButtonProvider>
				</div>
			</div>
		</SettingCard>
	);
};

/********* Public Link */
const SharePublicInviteLink = () => {
	return (
		<SettingCard cardTitle='Share Public Invite Link'>
			<div className='px-6 sm:p-6 text-start flex flex-col gap-3'>
				<div>
					<SubTitleText>Your Unique Url</SubTitleText>
					<div className='rounded-lg flex flex-1 flex-row mt-2 border border-gray-300'>
						<div className='p-4'>
							<TextProvider colorStyle='#98A2B3'>invite.majlisku.app/</TextProvider>
						</div>
						<div className='p-4 bg-gray-100 rounded-br-lg rounded-tr-lg flex-1'>
							<TextProvider colorStyle='#98A2B3'>invite.majlisku.app/</TextProvider>
						</div>
					</div>
				</div>
				<SubDescriptionText>
					Copy and paste to WhatsApp or any other messenger along with the link
				</SubDescriptionText>
				<ButtonProvider type='primary' width='150px' className='uppercase'>
					<CopyIcon fill='white' />
					Copy Link
				</ButtonProvider>
			</div>
		</SettingCard>
	);
};

/******* Personalized Link */
const PersonalizedImageContainer = ({ children }) => {
	return (
		<div
			className='h-72 rounded-lg  p-4 text-start w-full flex flex-col gap-2 justify-center items-center'
			style={{
				background:
					'var(--nude-tint-75, linear-gradient(0deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.75) 100%), #F1BFBE)',
			}}>
			{children}
		</div>
	);
};

const Personalized_1 = () => {
	return (
		<PersonalizedImageContainer>
			<TextProvider>{'1. Go to Guestlist  > click on guest name'}</TextProvider>
			<img src={personalized1Img} alt='' className='max-w-xs rounded-lg' />
		</PersonalizedImageContainer>
	);
};

const Personalized_2 = () => {
	return (
		<PersonalizedImageContainer>
			<TextProvider>
				2. Click <b>GENERATE LINK</b>
			</TextProvider>
			<img src={personalized2Img} alt='' className='max-w-xs rounded-lg' />
		</PersonalizedImageContainer>
	);
};

const Personalized_3 = () => {
	return (
		<PersonalizedImageContainer>
			<TextProvider>
				3. Click <b>COPY LINK</b> and share personally to your guest.
			</TextProvider>
			<img src={personalized3Img} alt='' className='max-w-xs rounded-lg' />
		</PersonalizedImageContainer>
	);
};

const Personalized_4 = () => {
	return (
		<PersonalizedImageContainer>
			<TextProvider>
				4. After sharing the link, make sure you click <b>Invited</b> as reminder.
			</TextProvider>
			<img src={personalized4Img} alt='' className='max-w-xs rounded-lg' />
		</PersonalizedImageContainer>
	);
};

const SharePersonalizedInviteLink = () => {
	const navigation = useNavigate();

	return (
		<SettingCard cardTitle='Share Personalized Invite Link'>
			<div className='px-6 sm:p-6 text-start flex flex-col gap-4'>
				<div>
					<SubTitleText>Your Guest Unique Url will look like this</SubTitleText>
					<div className='rounded-lg flex flex-1 flex-row mt-2 border border-gray-300'>
						<div className='p-4'>
							<TextProvider colorStyle='#98A2B3'>invite.majlisku.app/</TextProvider>
						</div>
						<div className='p-4 bg-gray-100 rounded-br-lg rounded-tr-lg flex-1'>
							<TextProvider colorStyle='#98A2B3'>invite.majlisku.app/</TextProvider>
						</div>
					</div>
				</div>
				<SubDescriptionText>
					You need to generate unique link for each guest before sharing them{' '}
				</SubDescriptionText>
				<div className='flex flex-col gap-3'>
					<SubTitleText>
						Step-by-step how to send personalized link to individual guest
					</SubTitleText>
					<Swiper pagination={true} modules={[Pagination]} className='max-w-[340px] rounded-lg'>
						<SwiperSlide>
							<Personalized_1 />
						</SwiperSlide>
						<SwiperSlide>
							<Personalized_2 />
						</SwiperSlide>
						<SwiperSlide>
							<Personalized_3 />
						</SwiperSlide>
						<SwiperSlide>
							<Personalized_4 />
						</SwiperSlide>
					</Swiper>
				</div>
				<ButtonProvider
					width='200px'
					className='uppercase'
					onClick={() => navigation('/guestlist')}>
					Go to My Guestlist
					<ViewAllIcon />
				</ButtonProvider>
			</div>
		</SettingCard>
	);
};

function ShareInvite() {
	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-28 bg-white sm:bg-transparent'>
			<DigitalInvitePublished />
			<CustomizeLinkPreview />
			<SharePublicInviteLink />
			<SharePersonalizedInviteLink />
		</div>
	);
}

export default ShareInvite;
