/** @format */

import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useUserData, useEventActivity, useGiftlist } from '../../hooks/useFetchAPI';
import { useFormContext } from 'react-hook-form';
//Components import
import FloatingToTopButton from '../../components/atom/buttons/FloatingToTopButton';
import SettingCard from '../../components/cards/SettingCard';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import PaxInputProviderDispatch from '../../components/atom/InputField/PaxInputProviderDispatch';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import DatePickerProvider from '../../components/atom/DatePicker/DatePickerProvider';
import TimePickerProvider from '../../components/atom/DatePicker/TimePickerProvider';
import TimePickerSetState from '../../components/atom/DatePicker/TimePickerSetState';
import ToggleSwitch from '../../components/atom/switch/ToggleSwitch';
import InputField from '../../components/atom/InputField/InputField';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
import ImageUpload from '../../components/atom/ImageUpload/ImageUpload';
//Icons import
import { InfoIcon, EnglishIcon, MalayIcon } from '../../components/icons/generalIcons';
import { DeleteIcon, PlusIcon } from '../../components/icons/actionIcons';
//Context import
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
	useDigitalInviteInputErrorContext,
} from '../../context/DigitalInviteContext';
//Hooks import
import { useItinerary } from '../../hooks/useItinerary';
import { useItineraryAPI } from '../../hooks/useItineraryAPI';
//Assets import
import exampleEvent from '../../assets/images/exampleEvent.png';
import exampleAdditional from '../../assets/images/exampleAdditional.png';
import exampleGreeting from '../../assets/images/exampleGreeting.png';
//Styling import
import './DigitalInvite.scss';

function Setting() {
	const { dispatch } = useDigitalInviteDispatchContext();
	const { state } = useDigitalInviteContext();
	const { accordiansCollapsed } = state;
	//from API
	const { data: userData } = useUserData();
	const { data: eventActivity } = useEventActivity();
	const { data: giftlist } = useGiftlist();

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-24 bg-white sm:bg-transparent'>
			<div className='flex justify-end w-full  px-4 sm:px-6' style={{ maxWidth: '720px' }}>
				<div className='flex gap-2'>
					<div
						className='cursor-pointer'
						onClick={() => {
							dispatch({ type: 'SET_ACCORDIANS_COLLAPSE', payload: !accordiansCollapsed });
						}}>
						<TextProvider height='22px' colorStyle='#667085' className='uppercase font-semibold'>
							{accordiansCollapsed ? 'Expand all' : 'Collapse all'}
						</TextProvider>
					</div>
				</div>
			</div>
			<General />
			<EventDetails />
			<DateTime />
			<LocationMap />
			<Greeting />
			<GuestPax />
			<ContactInformation />
			<Tentative />
			<GuestWish />
			<GiftRegistry />
			<MoneyGift />
			<FloatingToTopButton onClickToTop={handleScrollToTop} />
		</div>
	);
}

export default Setting;

const SubTitleText = ({ children }) => (
	<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
		{children}
	</TextProvider>
);

const SubDescriptionText = ({ children }) => (
	<TextProvider className='font-medium text-xs' color='text-gray-600'>
		{children}
	</TextProvider>
);

const InputTitleText = ({ children }) => (
	<TextProvider className='uppercase font-semibold text-sm mb-2 text-[#475467]'>
		{children}
	</TextProvider>
);

const InputErrorText = ({ children }) => (
	<TextProvider colorStyle='#D83232' className='text-sm'>
		{children}
	</TextProvider>
);

const InputErrorText2 = (props) => {
	const { errorField, errorText = 'This field is required!' } = props;
	return errorField ? (
		<TextProvider colorStyle='#D83232' className='text-sm'>
			{errorText}
		</TextProvider>
	) : null;
};

const General = () => {
	const { watch, setValue } = useFormContext();
	const enable_bahasa = watch('enable_bahasa');

	const handleOnChange = (type, payload) => {
		setValue('enable_bahasa', payload);
	};

	const LanguageCard = ({
		Icon = <EnglishIcon />,
		title,
		description,
		active = false,
		handleOnClick,
	}) => {
		return (
			<div
				onClick={() => {
					handleOnClick();
				}}
				className='p-4 flex-1 flex gap-2 rounded-lg cursor-pointer'
				style={
					active
						? { backgroundColor: '#F9FAFB', border: '1px solid var(--neutral-dark-grey, #1D4648)' }
						: { border: ' 1px solid var(--neutral-grey-300, #D0D5DD)', backgroundColor: 'white' }
				}>
				<div className='flex h-6 p-1 bg-gray-100 rounded-sm justify-center items-center'>
					{Icon}
				</div>
				<div className='flex flex-col gap-1'>
					<TextProvider
						colorStyle='#344054'
						className='uppercase text-base font-semibold tracking-wide'>
						{title}
					</TextProvider>
					<TextProvider colorStyle='#98A2B3' className='font-semibold text-sm'>
						{description}
					</TextProvider>
				</div>
			</div>
		);
	};

	return (
		<SettingCard stepNum='1' cardTitle={enable_bahasa ? 'Umum' : 'General'}>
			<div className='py-4 px-6 text-start flex flex-col gap-4'>
				<div>
					<InputTitleText>Select Language / Pilih Bahasa*</InputTitleText>
					<div className='flex mt-3 gap-2'>
						<LanguageCard
							Icon={<EnglishIcon />}
							title='English'
							description={`You're cordially invite to...`}
							active={!enable_bahasa}
							handleOnClick={() => handleOnChange('ENABLE_BAHASA', false)}
						/>
						<LanguageCard
							Icon={<MalayIcon />}
							title='Malay'
							description={`Anda dijemput ke..`}
							active={enable_bahasa}
							handleOnClick={() => handleOnChange('ENABLE_BAHASA', true)}
						/>
					</div>
				</div>
			</div>
		</SettingCard>
	);
};

/******* Event Details ******/
const EventDetails = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { rsvp_header_image, rsvp_header_image_file } = inviteState;

	const [openExample, setOpenExample] = useState(false);
	const [openAdditionalExample, setOpenAdditionalExample] = useState(false);

	const enable_bahasa = watch('enable_bahasa');

	return (
		<>
			<SettingCard stepNum='2' cardTitle={enable_bahasa ? 'Maklumat Majlis' : 'Event Details'}>
				<div className='py-4 px-6 text-start flex flex-col gap-4'>
					<div
						className='flex items-center gap-2 cursor-pointer'
						onClick={() => setOpenExample(true)}>
						<InfoIcon width={20} height={20} fill='#667085' />
						<TextProvider
							colorStyle='#667085'
							className='text-sm font-semibold uppercase underline'>
							{enable_bahasa ? 'Lihat Contoh' : 'View Example'}
						</TextProvider>
					</div>
					<div>
						<InputFieldProvider
							controls={{
								...register('event_title_1', { required: 'Event type is required!' }),
							}}
							title={enable_bahasa ? 'JENIS MAJLIS *' : 'EVENT TYPE *'}
							placeholder='Walimatulurus'
							textSize='text-sm'
							error={errors.event_title_1}
						/>
						<InputErrorText2
							errorField={errors.event_title_1}
							errorText={errors.event_title_1?.message}
						/>
					</div>
					<div>
						<TextAreaProvider
							controls={{
								...register('italic_title', { required: 'Event title is required!' }),
							}}
							title={enable_bahasa ? 'TAJUK MAJLIS *' : 'EVENT TITLE *'}
							placeholder='Izzul Syazwan & Nurul Syafiqah'
							className='text-center'
							minHeight='100px'
							error={errors.italic_title}
						/>
						<InputErrorText2
							errorField={errors.italic_title}
							errorText={errors.italic_title?.message}
						/>
					</div>
					<div>
						<TextAreaProvider
							controls={{ ...register('optional_description') }}
							title={enable_bahasa ? 'DESKRIPSI SAMPINGAN' : 'OPTIONAL DESCRIPTION'}
							placeholder='15.10.2022
Shah Alam, Selangor'
							className='text-center'
							minHeight='120px'
						/>
						<TextProvider className='text-[14px]' colorStyle='#98A2B3'>
							Date/ Time / Venue/ etc
						</TextProvider>
					</div>
					<div>
						<InputTitleText>{enable_bahasa ? 'Gambar Utama*' : 'Featured Image*'}</InputTitleText>
						<ImageUpload
							defaultImgUrl={
								rsvp_header_image_file
									? URL.createObjectURL(rsvp_header_image_file)
									: rsvp_header_image
							}
							dispatch={dispatchInvite}
							type='SET_RSVP_HEADER_IMAGE_FILE'
							aspectRatio={0.88}
							key='RSVP_HEADER_IMAGE_FILE'
						/>
					</div>
					<div>
						<TextAreaProvider
							controls={{ ...register('description') }}
							title={enable_bahasa ? 'BUTIRAN SAMPINGAN' : 'Additional Details'}
							placeholder='Tema:
Lelaki: Baju Melayu/ batik
Perempuan: Baju kurung/ bersesuaian
				
Sila rsvp sebelum 27 may'
							className='text-left'
							minHeight='160px'
						/>

						<div
							className='flex items-center gap-2 cursor-pointer'
							onClick={() => setOpenAdditionalExample(true)}>
							<TextProvider
								colorStyle='#667085'
								className='text-sm font-semibold uppercase underline'>
								{enable_bahasa ? 'Lihat Contoh' : 'View Example'}
							</TextProvider>
						</div>
					</div>
				</div>
			</SettingCard>
			<EventDetailsExample isOpen={openExample} handleClose={() => setOpenExample(false)} />
			<EventAdditionalDetailsExample
				isOpen={openAdditionalExample}
				handleClose={() => setOpenAdditionalExample(false)}
			/>
		</>
	);
};

const EventDetailsExample = ({ isOpen, handleClose }) => {
	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleClose} title='Example'>
			<div className='flex justify-center itmes-center bg-[#FBEFEF] py-10'>
				<img src={exampleEvent} alt='example' className='w-[234px]' />
			</div>
		</ModalProvider2>
	);
};

const EventAdditionalDetailsExample = ({ isOpen, handleClose }) => {
	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleClose} title='Example'>
			<div className='flex justify-center itmes-center bg-[#FBEFEF]'>
				<img src={exampleAdditional} alt='example' className='w-full max-w-[400px]' />
			</div>
		</ModalProvider2>
	);
};

/******* Date & Time ******/
const DateTime = () => {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	return (
		<SettingCard stepNum='3' cardTitle={!enable_bahasa ? 'Date & Time' : 'Tarikh & Waktu'}>
			<div className='py-4 px-6 text-start flex flex-col gap-4'>
				<div>
					<InputTitleText className='uppercase font-semibold mb-2 text-sm'>
						{enable_bahasa ? 'Tarikh *' : 'Date *'}
					</InputTitleText>
					<DatePickerProvider control={control} name='event_date' required='Date is required!' />
				</div>
				<div>
					<InputTitleText className='uppercase font-semibold text-sm mb-2'>
						{enable_bahasa ? 'Waktu *' : 'Time *'}
					</InputTitleText>
					<div className='flex gap-2'>
						<TimePickerProvider
							label='Start'
							control={control}
							name='event_time.start'
							required='Start time is required!'
						/>
						<TimePickerProvider
							label='End'
							control={control}
							name='event_time.end'
							required='End time is required!'
						/>
					</div>
				</div>
				{errors.event_time && <InputErrorText>{errors.event_time?.message}</InputErrorText>}
				<div className='flex flex-row justify-between border-t pt-4'>
					<div className='flex flex-col gap-2'>
						<TextProvider className='uppercase text-sm font-semibold' color='text-gray-500'>
							{enable_bahasa ? 'Slot Masa' : 'Multiple Time Slot'}
						</TextProvider>
						<TextProvider className='font-medium text-xs' color='text-gray-500'>
							{enable_bahasa
								? 'Tetapkan slot masa majlis untuk bersama keluarga, kawan, dan rakan sekerja'
								: 'Set up time slots for your event to connect with family, friends and coworkers.'}
						</TextProvider>
					</div>
					<div>
						<ToggleSwitch
							name='enable_multiple_slots'
							defaultValue={watch('enable_multiple_slots')}
							control={control}
						/>
					</div>
				</div>
				{watch('enable_multiple_slots') && (
					<div className='flex flex-col gap-3'>
						<div className='flex flex-col gap-1'>
							<InputTitleText className='uppercase font-semibold text-sm mb-1'>
								Slot 1
							</InputTitleText>
							<TimePickerProvider
								label='Start'
								control={control}
								name='event_time.start'
								disabled
							/>
						</div>
						<div className='flex flex-col gap-1'>
							<InputTitleText className='uppercase font-semibold text-sm mb-1'>
								Slot 2
							</InputTitleText>
							<TimePickerProvider
								label='Start'
								control={control}
								name='event_time_slot_2'
								required='2nd Time Slot is required!'
							/>
						</div>
					</div>
				)}
				<div className='pt-4 border-t'>
					<div
						className='rounded-xl p-4 '
						style={{
							background:
								'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
						}}>
						<div className='flex flex-row justify-between'>
							<div>
								<TextProvider className='uppercase text-sm font-semibold' color='text-gray-500'>
									{enable_bahasa ? 'Tarikh Akhir Rsvp' : 'Rsvp Deadline'}
								</TextProvider>
								<TextProvider className='font-medium text-xs' color='text-gray-500'>
									{enable_bahasa
										? 'Hentikan penerimaan RSVP selepas tarikh yang ditetapkan'
										: 'Stop accepting RSVPs after the specified date.'}
								</TextProvider>
							</div>
							<div>
								<ToggleSwitch
									name='enable_deadline'
									defaultValue={watch('enable_deadline')}
									control={control}
								/>
							</div>
						</div>

						{watch('enable_deadline') && (
							<div className='w-full mt-2'>
								<DatePickerProvider
									defaultValue={moment(watch('event_date'))}
									control={control}
									name='event_date_deadline'
									required='Deadline is required!'
									className='w-full'
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</SettingCard>
	);
};

/******* Location & Map ******/
const LocationMap = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	return (
		<SettingCard stepNum='4' cardTitle={enable_bahasa ? 'Lokasi' : 'Location'}>
			<div className='py-4 px-6 text-start flex flex-col gap-4'>
				<div>
					<TextAreaProvider
						controls={{ ...register('event_address', { required: 'Venu address is required!' }) }}
						title={enable_bahasa ? 'Alamat tempat *' : 'Venue Address'}
						placeholder='Eg: Changkat Telang,
49, B52, Pekan Batu Lapan Belas,
43100 Hulu Langat, Selangor.'
						className='text-left'
						minHeight='100px'
						error={errors.event_address}
					/>
					<InputErrorText2
						errorField={errors.event_address}
						errorText={errors.event_address?.message}
					/>
				</div>

				<div className='flex flex-col gap-4'>
					<InputFieldProvider
						controls={{ ...register('location_info.wazeLink') }}
						textSize='text-sm'
						title='WAZE'
						placeholder='https://www.waze.com/live-map'
						error={null}
					/>
					<InputFieldProvider
						controls={{ ...register('location_info.googleLink') }}
						textSize='text-sm'
						title='GOOGLE MAP'
						placeholder='https://www.google.com.my/maps'
						error={null}
					/>
				</div>
				<a
					href={'https://majlisku.com/create-digital-invite/#Step_3b_Location_and_Map'}
					target='_blank'
					rel='noreferrer'>
					<TextProvider className='text-[14px] uppercase underline' colorStyle='#667085'>
						Tutorial for copy and paste map url
					</TextProvider>
				</a>
			</div>
		</SettingCard>
	);
};

/******* Event Details ******/
const Greeting = () => {
	const { register, watch } = useFormContext();
	const [openExample, setOpenExample] = useState(false);

	const enable_bahasa = watch('enable_bahasa');

	return (
		<>
			<SettingCard stepNum='5' cardTitle={enable_bahasa ? 'Ucapan' : 'Greeting'}>
				<div className='py-4 px-6 text-start flex flex-col gap-4'>
					<div
						className='flex items-center gap-2 cursor-pointer'
						onClick={() => setOpenExample(true)}>
						<InfoIcon width={20} height={20} fill='#667085' />
						<TextProvider
							colorStyle='#667085'
							className='text-sm font-semibold uppercase underline'>
							{enable_bahasa ? 'Lihat Contoh' : 'View Example'}
						</TextProvider>
					</div>

					<InputFieldProvider
						controls={{
							...register('event_opening_title'),
						}}
						title={enable_bahasa ? 'Pembuka' : 'Opening'}
						placeholder='Assalammualaikum dan salam sejahtera'
						textSize='text-sm'
					/>
					<TextAreaProvider
						controls={{
							...register('host_details'),
						}}
						title={enable_bahasa ? 'Penganjur' : 'Host'}
						placeholder='Ir. Ts Mohd Rizal bin Johari
&	 Zubaidah Binti Mohd Isa'
						className='text-center'
						minHeight='100px'
					/>
					<TextAreaProvider
						controls={{
							...register('greeting_1'),
						}}
						title={enable_bahasa ? 'Teks Ucapan A' : 'Greeting Text A'}
						placeholder='Dengan segala hormatnya kami mempersilakan'
						className='text-center'
						minHeight='100px'
					/>
					<TextAreaProvider
						controls={{
							...register('greeting_title'),
						}}
						title={enable_bahasa ? 'Gelaran Rasmi' : 'Honorific Titles'}
						placeholder='Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan'
						className='text-center'
						minHeight='100px'
					/>
					<TextAreaProvider
						controls={{
							...register('greeting_2'),
						}}
						title={enable_bahasa ? 'Teks Ucapan B' : 'Greeting Text B'}
						placeholder='ke majlis resepsi untuk meraikan Perkahwinan Putera kesayangan kami'
						className='text-center'
						minHeight='100px'
					/>
					<TextAreaProvider
						controls={{
							...register('event_title_2'),
						}}
						title={enable_bahasa ? 'Nama Penuh' : 'Full Name'}
						placeholder='Mohd Izzul Syazwan bin Mohd Rizal
						&
						Nurul Syafiqah binti Othman'
						className='text-center'
						minHeight='110px'
					/>
				</div>
			</SettingCard>
			<GreetingDetailsExample isOpen={openExample} handleClose={() => setOpenExample(false)} />
		</>
	);
};

const GreetingDetailsExample = ({ isOpen, handleClose }) => {
	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleClose} title='Example'>
			<div className='flex justify-center itmes-center bg-[#FBEFEF] py-10'>
				<img src={exampleGreeting} alt='example' className='w-[264px]' />
			</div>
		</ModalProvider2>
	);
};

/******* Guest & Pax ******/
const GuestPax = () => {
	const {
		register,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	return (
		<SettingCard stepNum='6' cardTitle={enable_bahasa ? 'Tetamu' : 'Guest'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
							{enable_bahasa ? 'Tiada had' : 'No limit'}
						</TextProvider>
						<TextProvider className='font-medium text-xs' color='text-gray-600'>
							{enable_bahasa
								? 'Tetamu boleh bawa seramai mungkin'
								: 'Guest can bring as many plus ones as they want'}
						</TextProvider>
					</div>
					<div>
						<ToggleSwitch
							name='enable_unlimited_pax'
							defaultValue={watch('enable_unlimited_pax')}
							control={control}
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
						{enable_bahasa ? 'Had tetamu bagi setiap rsvp' : 'Guest Limit Per Rsvp'}
					</TextProvider>
					<PaxInputProviderDispatch setValue={setValue} pax={watch('guest_pax_limit')} />
				</div>
				<div className='rounded-xl p-4 bg-red-50 flex items-start gap-2'>
					<InfoIcon />
					<TextProvider className='text-sm font-medium' color='text-black'>
						{enable_bahasa ? (
							<>
								Anda boleh menetapkan bilangan orang bagi setiap tetamu di{' '}
								<b className='italic'>Guestlist</b> pada bila-bila masa
							</>
						) : (
							<>
								You can edit pax for individual guest in <b className='italic'>Guestlist</b> anytime
							</>
						)}
					</TextProvider>
				</div>
			</div>
		</SettingCard>
	);
};

/******* Contact Information ******/
const ContactInformation = () => {
	const {
		setValue,
		watch,
		getValues,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	const addContactPerson = () => {
		let tempContacts = getValues('contact_info');
		tempContacts.push({ name: '', phone: '' });
		setValue('contact_info', tempContacts);
	};

	const removeContactPerson = (contactIndex) => {
		let tempContacts = getValues('contact_info');
		if (contactIndex > -1) {
			tempContacts.splice(contactIndex, 1);
			setValue('contact_info', tempContacts);
		}
	};

	return (
		<SettingCard stepNum='7' cardTitle={enable_bahasa ? 'Hubungi' : 'Contact'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex flex-col gap-3'>
					{watch('contact_info')?.map((contact, index) => (
						<ContactInfo key={index} index={index} removeFunc={removeContactPerson} />
					))}

					<div
						onClick={() => addContactPerson()}
						className='flex items-center gap-2 mt-2 cursor-pointer'>
						<PlusIcon />
						<TextProvider className='uppercase text-sm font-semibold'>
							{' '}
							Add Contact Person
						</TextProvider>
					</div>
				</div>
			</div>
		</SettingCard>
	);
};

const ContactInfo = ({ index, removeFunc }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='text-start'>
			<SubTitleText>Person {index + 1}</SubTitleText>
			<div className='flex flex-col gap-2 my-2'>
				<InputField
					error={errors.contact_info && errors.contact_info[index]?.name}
					placeholder='Name'
					controls={{
						...register(`contact_info[${index}].name`, {
							required: 'Contact name is required!',
						}),
					}}
				/>
				<InputErrorText2
					errorField={errors.contact_info && errors.contact_info[index]?.name}
					errorText={
						errors.contact_info && errors.contact_info[index]?.name
							? errors.contact_info[index]?.name?.message
							: null
					}
				/>
				<InputField
					error={errors.contact_info && errors.contact_info[index]?.phone}
					placeholder='Phone Number'
					controls={{
						...register(`contact_info[${index}].phone`, {
							required: 'Contact phone number is required!',
						}),
					}}
				/>
				<InputErrorText2
					errorField={errors.contact_info && errors.contact_info[index]?.phone}
					errorText={
						errors.contact_info && errors.contact_info[index]?.phone
							? errors.contact_info[index]?.phone?.message
							: null
					}
				/>

				<div style={{ width: '30px' }}>
					{index !== 0 ? (
						<div onClick={() => removeFunc(index)} style={{ cursor: 'pointer' }}>
							<DeleteIcon />
						</div>
					) : (
						<div style={{ width: '20px', background: 'black' }} />
					)}
				</div>
			</div>
		</div>
	);
};

/******* Tentative ******/
const Tentative = () => {
	const {
		watch,
		control,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	return (
		<SettingCard stepNum='8' cardTitle={enable_bahasa ? 'Aturcara' : 'Tentative'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<SubTitleText>{enable_bahasa ? 'Aktifkan Aturcara' : 'Enable Itinerary'}</SubTitleText>
					</div>
					<ToggleSwitch
						name='enable_itinerary'
						defaultValue={watch('enable_itinerary')}
						control={control}
					/>
				</div>
				<div
					className='edit-itinerary-actions border p-2 rounded-lg'
					style={{ opacity: watch('enable_itinerary') ? 1 : 0.5 }}>
					<TentativeContainer />
				</div>
			</div>
		</SettingCard>
	);
};

const TentativeContainer = () => {
	const { data: eventActivity } = useEventActivity();
	const [activityDetail, setActivityDetail] = useState(null);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);

	const defaultDate = '1983-07-21 08:00';

	const handleAddActivityOpen = () => {
		setOpenAddModal(true);
	};

	const handleEditActivityOpen = () => {
		setOpenEditModal(true);
	};

	const initEditActivity = (activity) => {
		setActivityDetail(activity);
	};

	return (
		<div className='itineraryContent_activity'>
			{eventActivity?.length === 0 ? (
				<div className='no_activity'>
					<div className='date'>
						<TextProvider className='font-bold text-sm'>
							{moment(defaultDate).format('h:mm A')}
						</TextProvider>
					</div>
					<div className='addActivity_button' onClick={handleAddActivityOpen}>
						<div className='border'>
							<PlusIcon width='12px' fillColor=' rgba(152, 162, 179, 1)' />
							<TextProvider className='activity_title font-bold text-sm'>Add Activity</TextProvider>
						</div>
					</div>
				</div>
			) : (
				<div className='activityContent'>
					{eventActivity?.map((activity, index) => {
						return (
							<div className='yes_activity' key={index}>
								<div className='date'>
									<TextProvider className='font-bold text-sm'>
										{moment(activity.date).format('h:mm A')}
									</TextProvider>
								</div>
								<div
									className='activity_detail'
									onClick={() => {
										initEditActivity({
											title: activity.title,
											description: activity.description,
											date: activity.date,
											id: activity.id,
										});
										handleEditActivityOpen();
									}}>
									<TextProvider className='activity_title font-bold text-sm'>
										{activity.title}
									</TextProvider>
									<TextProvider className='activity_description  font-bold text-sm'>
										{activity.description}
									</TextProvider>
								</div>
							</div>
						);
					})}
					<div className='flex justify-start'>
						<ButtonProvider
							className='mt-3'
							width='205px'
							height='36px'
							onClick={handleAddActivityOpen}>
							<PlusIcon />
							<TextProvider className='font-bold uppercase'>Add Activity</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			)}
			<AddTentativeModal
				isOpen={openAddModal}
				handleClose={() => setOpenAddModal(false)}
				activities={eventActivity}
			/>
			<EditentativeModal
				isOpen={openEditModal}
				handleClose={() => setOpenEditModal(false)}
				activityDetail={activityDetail}
			/>
		</div>
	);
};

const AddTentativeModal = ({ isOpen, handleClose, activities }) => {
	const [title, setTitle] = useState('');
	const [titleError, setTitleError] = useState(false);
	const [description, setDescription] = useState('');
	const [time, setTime] = useState(
		activities?.length > 0 ? `${activities[activities.length - 1]?.date}` : '1983-07-21 08:00'
	);
	const { addActivity } = useItineraryAPI();

	useEffect(() => {
		if (activities?.length > 0) {
			setTime(`${activities[activities.length - 1]?.date}`);
		}
	}, [activities]);

	const handlerSubmitActivity = async () => {
		const activityBody = {
			title,
			description,
			date: time,
		};

		if (title === '') {
			setTitleError(true);
			return;
		} else {
			setTitleError(false);
		}

		try {
			await addActivity.mutateAsync(activityBody);
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ModalProvider2
			loading={addActivity?.isLoading}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Add Activity'>
			<div className='p-4 sm:p-6 flex flex-col gap-4'>
				<div className='flex flex-col gap-1'>
					<InputFieldProvider
						title='TITLE *'
						placeholder='Wedding Ceremony'
						error={titleError}
						value={title}
						textSize='text-sm'
						onChange={(e) => setTitle(e.target.value)}
					/>
					<InputErrorText2 errorField={titleError} errorText={'Title is required!'} />
				</div>

				<TextAreaProvider
					title='DESCRIPTION'
					placeholder='1) Doa Recitation
2) Salam restu
3) Bride & Groom lunch'
					value={description}
					className='text-start'
					minHeight='100px'
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div className='flex flex-col gap-1'>
					<InputTitleText>Time</InputTitleText>
					<TimePickerSetState label='Start' value={time} setValue={setTime} />
				</div>
			</div>
			<div className='border-t flex justify-end gap-1 p-4'>
				<ButtonProvider className='uppercase' width='84px' height='36px' onClick={handleClose}>
					Cancel
				</ButtonProvider>
				<ButtonProvider
					className='uppercase'
					type='primary'
					width='84px'
					height='36px'
					onClick={handlerSubmitActivity}>
					Save
				</ButtonProvider>
			</div>
		</ModalProvider2>
	);
};

const EditentativeModal = ({ isOpen, handleClose, activityDetail }) => {
	const [title, setTitle] = useState(activityDetail?.title);
	const [titleError, setTitleError] = useState(false);
	const [description, setDescription] = useState(activityDetail?.description);
	const [time, setTime] = useState(activityDetail?.date);
	const [deleteModal, setDeleteModal] = useState(false);
	const { editActivity, deleteActivity } = useItineraryAPI();

	useEffect(() => {
		//Change the states based on activityDetail
		setTitle(activityDetail?.title);
		setDescription(activityDetail?.description);
		setTime(activityDetail?.date);
	}, [activityDetail]);

	const handlerEditActivity = async () => {
		const activityBody = {
			title,
			description,
			date: time,
			id: activityDetail?.id,
		};

		if (title === '') {
			setTitleError(true);
			return;
		} else {
			setTitleError(false);
		}

		try {
			await editActivity.mutateAsync(activityBody);
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteActivity = async () => {
		try {
			await deleteActivity.mutateAsync(activityDetail?.id);
			setDeleteModal(false);
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<ModalProvider2
				loading={false}
				isOpen={isOpen}
				handleClose={handleClose}
				title='Edit Activity'>
				<div className='p-4 sm:p-6 flex flex-col gap-4'>
					<div className='flex flex-col gap-1'>
						<InputFieldProvider
							title='TITLE *'
							placeholder='Wedding Ceremony'
							error={titleError}
							value={title}
							textSize='text-sm'
							onChange={(e) => setTitle(e.target.value)}
						/>
						<InputErrorText2 errorField={titleError} errorText={'Title is required!'} />
					</div>
					<TextAreaProvider
						title='DESCRIPTION'
						placeholder='1) Doa Recitation
2) Salam restu
3) Bride & Groom lunch'
						value={description}
						className='text-start'
						minHeight='100px'
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className='flex flex-col gap-1'>
						<InputTitleText>Time</InputTitleText>
						<TimePickerSetState label='Start' value={time} setValue={setTime} />
					</div>
				</div>
				<div className='border-t w-full flex justify-between items-center p-4'>
					<ButtonProvider
						noBorder
						className='uppercase font-semibold'
						width='auto'
						height='36px'
						onClick={() => setDeleteModal(true)}>
						<DeleteIcon /> Remove
					</ButtonProvider>
					<div className=' flex justify-end gap-1'>
						<ButtonProvider className='uppercase' width='84px' height='36px' onClick={handleClose}>
							Cancel
						</ButtonProvider>
						<ButtonProvider
							className='uppercase'
							type='primary'
							width='84px'
							height='36px'
							onClick={handlerEditActivity}>
							Save
						</ButtonProvider>
					</div>
				</div>
			</ModalProvider2>
			<ModalConfirmation
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE ACTIVITY</TextProvider>
					</div>
				}
				loading={deleteActivity?.isLoading}
				isOpen={deleteModal}
				handleConfirm={handleDeleteActivity}
				handleClose={() => setDeleteModal(false)}>
				<TextProvider>Are you sure want to remove this activity?</TextProvider>
			</ModalConfirmation>
		</>
	);
};

/********* Guest Wish *******/
const GuestWish = () => {
	const {
		watch,
		control,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	return (
		<SettingCard stepNum='9' cardTitle={enable_bahasa ? 'Ucapan Tetamu' : 'Wish'}>
			<div className='py-4 px-6  flex justify-between items-center'>
				<div className='flex flex-col gap-2'>
					<SubTitleText>{enable_bahasa ? 'Aktifkan Ucapan' : 'Enable Wish'}</SubTitleText>
				</div>
				<ToggleSwitch
					name='enable_wishes'
					defaultValue={watch('enable_wishes')}
					control={control}
				/>
			</div>
		</SettingCard>
	);
};

/******* Gift Registry ******/
const GiftRegistry = () => {
	const { register, watch, control } = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	return (
		<SettingCard stepNum='10' cardTitle={enable_bahasa ? 'Hadiah' : 'Gift Registry'}>
			<div className='py-4 px-6 text-start flex flex-col gap-3'>
				<div className='flex items-center justify-between'>
					<SubTitleText>{enable_bahasa ? ' Aktifkan Hadiah' : 'Enable Gift Registry'}</SubTitleText>
					<ToggleSwitch
						name='enable_gift_registry'
						defaultValue={watch('enable_gift_registry')}
						control={control}
					/>
				</div>
				<div
					className='flex flex-col gap-3'
					style={{ opacity: watch('enable_gift_registry') ? 1 : 0.5 }}>
					<TextAreaProvider
						disabled={!watch('enable_gift_registry')}
						title={enable_bahasa ? 'Alamat Penghantaran' : 'DELIVERY ADDRESS'}
						placeholder='23, Jalan Raja Chulan, 50200 Kuala Lumpur, Malaysia'
						controls={{ ...register('delivery_address') }}
						className='text-left'
						minHeight='100px'
					/>
					{/* <TextAreaProvider
						disabled={!enable_gift_registry}
						title='THANK YOU TEXT'
						placeholder='Thank you for the lovely gift! The bride and groom will definitely love it. Best regards, [Your name]'
						value={thank_you_text}
						className='text-left'
						minHeight='100px'
						onChange={handleOnChangeText}
					/> */}
				</div>
			</div>
		</SettingCard>
	);
};

/******* Money Gift ******/
const MoneyGift = () => {
	const {
		register,
		watch,
		control,
		formState: { errors },
	} = useFormContext();

	const enable_bahasa = watch('enable_bahasa');

	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { money_gift_details } = inviteState;

	return (
		<SettingCard stepNum='11' cardTitle={enable_bahasa ? 'Salam Kaut' : 'Money Gift'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<SubTitleText>
							{enable_bahasa ? 'Aktifkan Salam Kaut' : 'Enable Money Gift'}
						</SubTitleText>
						<SubDescriptionText>Display money gift details in digital invite</SubDescriptionText>
					</div>
					<ToggleSwitch
						name='enable_money_gift'
						defaultValue={watch('enable_money_gift')}
						control={control}
					/>
				</div>
				<div
					className='flex flex-col gap-4'
					style={{ opacity: watch('enable_money_gift') ? 1 : 0.7 }}>
					<div>
						<InputFieldProvider
							disabled={!watch('enable_money_gift')}
							textSize='text-sm'
							title={enable_bahasa ? 'Nama *' : 'Name *'}
							placeholder='Muhamad Izzul Syahmi bin Mohd Rizal'
							error={errors.money_gift_details?.name}
							controls={{
								...register('money_gift_details.name', {
									required: 'Name is required!',
								}),
							}}
						/>

						<InputErrorText2
							errorField={errors.money_gift_details?.name}
							errorText={errors.money_gift_details?.name?.message}
						/>
					</div>
					<div>
						<InputFieldProvider
							disabled={!watch('enable_money_gift')}
							textSize='text-sm'
							title={enable_bahasa ? 'Nama Bank *' : 'Bank *'}
							placeholder='Maybank'
							error={errors.money_gift_details?.bankName}
							controls={{
								...register('money_gift_details.bankName', {
									required: 'Bank name is required!',
								}),
							}}
						/>
						<InputErrorText2
							errorField={errors.money_gift_details?.bankName}
							errorText={errors.money_gift_details?.bankName?.message}
						/>
					</div>
					<div>
						<InputFieldProvider
							disabled={!watch('enable_money_gift')}
							textSize='text-sm'
							title={enable_bahasa ? 'No Akaun *' : 'Account Number *'}
							placeholder='1234567880'
							error={errors.money_gift_details?.accNum}
							controls={{
								...register('money_gift_details.accNum', {
									required: 'Account number is required!',
								}),
							}}
						/>
						<InputErrorText2
							errorField={errors.money_gift_details?.accNum}
							errorText={errors.money_gift_details?.accNum?.message}
						/>
					</div>

					<InputTitleText>Qr Code Screenshot</InputTitleText>
					<ImageUpload
						defaultImgUrl={money_gift_details?.qrCodeUrl}
						dispatch={dispatchInvite}
						type='SET_QR_CODE_IMAGE_FILE'
						key='QR_CODE_IMAGE_FILE'
					/>
				</div>
			</div>
		</SettingCard>
	);
};
