/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
//Component import
import SettingCard from '../../components/cards/SettingCard';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
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

const CustomizeLinkPreview = () => {
	const [previewDescription, setPreviewDescription] = useState('');
	const [personalMessage, setPersonalMessage] = useState('');

	return (
		<SettingCard cardTitle='Customize Link Preview'>
			<div className='px-6 sm:p-6 text-start'>
				<img src={customizeLinkImg} className='w-auto h-auto mb-4 sm:h-72 rounded-xl' />
				<div className='flex flex-col gap-5'>
					<TextAreaProvider
						title='Write a preview description'
						placeholder='Anda dijemput dengan hormat ke Majlis Perkahwinan'
						value={previewDescription}
						className='text-left'
						minHeight='120px'
						onChange={(e) => {
							setPreviewDescription(e.target.value);
						}}
					/>
					<TextAreaProvider
						title='Add a personal message to your invitation'
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
					<ButtonProvider width='120px' className='uppercase'>
						<CopyIcon />
						Copy
					</ButtonProvider>
				</div>
			</div>
		</SettingCard>
	);
};

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
					<div className='w-full'>
						<Swiper pagination={true} modules={[Pagination]} className='mySwiper rounded-lg'>
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
			<CustomizeLinkPreview />
			<SharePublicInviteLink />
			<SharePersonalizedInviteLink />
		</div>
	);
}

export default ShareInvite;
