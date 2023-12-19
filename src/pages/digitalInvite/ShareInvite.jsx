/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
//Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
//Component import
import SettingCard from '../../components/cards/SettingCard';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalProvider from '../../components/atom/ModalProvider/ModalProvider2';
import PreviewImageUpload from '../../components/atom/ImageUpload/PreviewImageUpload';
import WholePageLoading from '../../components/atom/loading/WholePageLoading';
//Icons import
import { CopyIcon, ViewAllIcon } from '../../components/icons/actionIcons';
//Assets import
import customizeLinkImg from '../../assets/images/customize-link-preview-img.png';
import personalized1Img from '../../assets/images/personalized-1.png';
import personalized2Img from '../../assets/images/personalized-2.png';
import personalized3Img from '../../assets/images/personalized-3.png';
import personalized4Img from '../../assets/images/personalized-4.png';
//Hooks import
import { usePostRsvp } from '../../hooks/usePostAPI';
import { notifySuccess, notifyError } from '../../components/toast/toastprovider';
import { useUserData } from '../../hooks/useFetchAPI';

const cloudApi = import.meta.env.VITE_APP_API_KEY;

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const InputErrorText2 = (props) => {
	const { errorField, errorText = 'This field is required!' } = props;
	return errorField ? (
		<TextProvider colorStyle='#D83232' className='text-sm'>
			{errorText}
		</TextProvider>
	) : null;
};

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
	<TextProvider colorStyle={'#475467'} className='uppercase font-semibold text-sm mb-2'>
		{children}
	</TextProvider>
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
	const { data: userData } = useUserData();
	const { saveMetadataDetails, savePersonalMessage } = usePostRsvp();
	const [personalMessage, setPersonalMessage] = useState(userData?.personalMessage || '');
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const {
		reset,
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (userData?.metadata) {
			reset({
				previewTitle: userData.metadata?.title,
				previewDescription: userData.metadata?.description,
				previewImgURL: userData.metadata?.photoURL,
			});
		} else {
			reset({
				previewTitle: '',
				previewDescription: '',
				previewImgURL: '',
			});
		}

		if (userData?.personalMessage) {
			setPersonalMessage(userData?.personalMessage);
		}
	}, [userData]);

	const onSavePreview = async (formValues) => {
		setLoading(true);
		const data = {
			title: formValues.previewTitle,
			description: formValues.previewDescription,
			imageFile: image,
		};

		try {
			await saveMetadataDetails.mutateAsync(data);
			setLoading(false);
			notifySuccess('Customize link preview saved successfully');
		} catch (err) {
			notifyError(err.message);
			setLoading(false);
		}
	};

	function copyToClipboard() {
		if (personalMessage !== '') {
			handleSavePersonalMessage();
			navigator.clipboard
				.writeText(personalMessage + `\n\nhttps://invite.majlisku.app/${userData?.inviteId}`)
				.then(() => {
					alert(`Personal Message is copied!`);
				});
		}
	}

	const handleSavePersonalMessage = async () => {
		try {
			await savePersonalMessage.mutateAsync({ personalMessage: personalMessage || '' });
			notifySuccess('Personal message saved successfully');
		} catch (err) {
			notifyError(err.message);
		}
	};

	const onError = (error) => {
		console.log('error:', error);
		notifyError('Please fill all required fields');
	};

	return (
		<>
			<WholePageLoading loading={loading} text='Saving Link Preview....' />
			<SettingCard cardTitle='Customize Link Preview'>
				<div className='px-6 sm:p-6 text-start'>
					<img src={customizeLinkImg} className='w-auto h-auto mb-4 sm:h-72 rounded-xl' />
					<TextProvider className='text-[16px] my-2 font-semibold' colorStyle='#667085'>
						Sending your personalized link to your guest will unveil a delightful preview
					</TextProvider>
					<div className='flex flex-col gap-3 my-4'>
						<div>
							<InputTitleText>Preview Image</InputTitleText>
							<PreviewImageUpload
								defaultImgUrl={image ? URL.createObjectURL(image) : watch('previewImgURL')}
								setValue={setImage}
							/>
						</div>
						<div>
							<InputFieldProvider
								controls={{
									...register('previewTitle', { required: 'Preview Title is required!' }),
								}}
								title='Preview Title *'
								placeholder='Walimatulurus Izzul & Syaf'
								minHeight='30px'
								error={errors.previewTitle}
							/>
							<InputErrorText2
								errorField={errors.previewTitle}
								errorText={errors.previewTitle?.message}
							/>
						</div>

						<TextAreaProvider
							controls={{
								...register('previewDescription'),
							}}
							title='Preview Description'
							placeholder='Sila tekan untuk sampaikan kehadiran anda'
							className='text-left'
							minHeight='30px'
						/>
						<ButtonProvider
							type='primary'
							width='150px'
							className='uppercase'
							onClick={handleSubmit(onSavePreview, onError)}>
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
						<div className='flex sm:flex-row sm:max-w-[200px] flex-col gap-2'>
							<ButtonProvider width='100%' className='uppercase' onClick={copyToClipboard}>
								<CopyIcon />
								Save & Copy Message
							</ButtonProvider>
							<a
								className='w-full'
								href={`whatsapp://send?text=${
									personalMessage + `\n\nhttps://invite.majlisku.app/${userData?.inviteId}`
								}`}
								data-action='share/whatsapp/share'>
								<ButtonProvider
									type='default'
									width='100%'
									className='uppercase'
									onClick={handleSavePersonalMessage}>
									<WhatsappIcon fill='white' />
									Save & Share
								</ButtonProvider>
							</a>
						</div>
					</div>
				</div>
			</SettingCard>
		</>
	);
};

const WhatsappIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		x='0px'
		y='0px'
		width='20'
		height='20'
		viewBox='0 0 50 50'>
		<path d='M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z'></path>
	</svg>
);

/********* Public Link */
const SharePublicInviteLink = () => {
	const { data: userData } = useUserData();
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
							<TextProvider colorStyle='#98A2B3'>{userData?.inviteId}</TextProvider>
						</div>
					</div>
				</div>
				<SubDescriptionText>
					Copy and paste to WhatsApp or any other messenger along with the link
				</SubDescriptionText>
				<div className='flex gap-2'>
					<ButtonProvider type='primary' width='150px' className='uppercase'>
						<CopyIcon fill='white' />
						Copy Link
					</ButtonProvider>
					<a
						href={`whatsapp://send?text=https://invite.majlisku.app/${userData?.inviteId}`}
						data-action='share/whatsapp/share'>
						<ButtonProvider type='default' width='120px' className='uppercase'>
							<WhatsappIcon fill='white' />
							Share
						</ButtonProvider>
					</a>
				</div>
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
	const { data: userData } = useUserData();
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
							<TextProvider colorStyle='#98A2B3'>{userData?.inviteId}/guest-name</TextProvider>
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

const GenerateInviteLink = ({ isOpen, handleClose, handlePost }) => {
	const [inviteId, setInviteId] = useState('');
	const [approved, setApproved] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { saveInviteId } = usePostRsvp();
	const [saveLoading, setSaveLoading] = useState(false);

	function hasSpecialChars(str) {
		const specialChars = /[!@#$%^&*()+\=\[\]{};'`:"\\|,.<>\/?]/;
		return specialChars.test(str);
	}

	function checkInviteIdAvailability() {
		setLoading(true);
		setError(null);

		if (inviteId === '') {
			setLoading(false);
			setError('✗ URL cannot be empty');
		}

		if (inviteId?.split(' ').length > 1) {
			setLoading(false);
			setError('✗ URL cannot have a space');
		} else if (hasSpecialChars(inviteId)) {
			setLoading(false);
			setError('✗ URL cannot have special characters');
		} else {
			axios.get(`${cloudApi}/checkinviteid/${inviteId.toLowerCase()}`).then((response) => {
				setLoading(false);
				if (response.data === 0) {
					setApproved(inviteId);
				} else {
					setApproved(false);
					setError('✗ URL not available, please try a different one.');
				}
			});
		}
	}

	const handleSaveInviteId = async () => {
		setSaveLoading(true);
		try {
			await saveInviteId.mutateAsync({ inviteId: inviteId });
			setSaveLoading(false);
			notifySuccess('URL successfully saved. Your invite is published!');
			handlePost();
		} catch (err) {
			setSaveLoading(false);
			notifyError(err);
		}
	};

	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose} title='Create your URL'>
			<div className='p-4 sm:p-6'>
				<div className='flex flex-col gap-4 pb-4'>
					<TextProvider className='text-[16px] font-semibold'>
						You're just one step away!
					</TextProvider>
					<TextProvider colorStyle={'#667085'} className='text-[14px] font-normal'>
						Create a distinctive and memorable URL.
					</TextProvider>
				</div>
				<div className='flex border border-gray-300 rounded-lg'>
					<TextProvider className='text-gray-400 p-3 border-r'>invite.majlisku.app/</TextProvider>
					<input
						type='text'
						value={inviteId}
						onChange={(e) => setInviteId(e.target.value)}
						placeholder='your-event-name'
						className=' rounded-lg w-full p-3 appearance-none'
					/>
				</div>
				{error && (
					<TextProvider colorStyle='#D83232' className='text-sm mt-1'>
						{error}
					</TextProvider>
				)}
				{approved === inviteId && (
					<TextProvider colorStyle='#419E6A' className='text-sm mt-1'>
						✓ URL available ! Click Save
					</TextProvider>
				)}
				<div className='flex justify-end'>
					{approved === inviteId ? (
						<ButtonProvider
							disabled={saveLoading}
							className='uppercase mt-3'
							width='86px'
							type='primary'
							onClick={handleSaveInviteId}>
							{saveLoading ? 'Saving...' : 'Save'}
						</ButtonProvider>
					) : (
						<ButtonProvider
							disabled={loading}
							className='uppercase mt-3'
							width='136px'
							type='primary'
							onClick={() => checkInviteIdAvailability()}>
							{loading ? 'Checking...' : 'Create URL'}
						</ButtonProvider>
					)}
				</div>
			</div>
		</ModalProvider>
	);
};

function ShareInvite() {
	const { data: userData } = useUserData();
	const [urlModal, setUrlModal] = useState(userData?.inviteId ? false : true);
	let navigate = useNavigate();

	useEffect(() => {
		if (userData?.inviteId) {
			setUrlModal(false);
		}
	}, [userData]);

	return (
		<>
			<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-28 bg-white sm:bg-transparent'>
				<DigitalInvitePublished />
				<CustomizeLinkPreview />
				<SharePublicInviteLink />
				<SharePersonalizedInviteLink />
			</div>
			{userData && !userData?.inviteId ? (
				<GenerateInviteLink
					isOpen={urlModal}
					handleClose={() => {
						setUrlModal(false);
						navigate(-1);
					}}
					handlePost={() => setUrlModal(false)}
				/>
			) : null}
		</>
	);
}

export default ShareInvite;
