/** @format */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
//Components import
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
import { InfoIcon } from '../../components/icons/generalIcons';
import { DeleteIcon, PlusIcon } from '../../components/icons/actionIcons';
//Context import
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
//Hooks import
import { useItinerary } from '../../hooks/useItinerary';
//Styling import
import './DigitalInvite.scss';

function Setting() {
	const { dispatch } = useDigitalInviteDispatchContext();

	const handleSetDesign = (value) => {
		dispatch({ type: 'SET_DESIGN', payload: value });
	};

	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-24 bg-white sm:bg-transparent'>
			<div className='flex justify-end w-full  px-4 sm:px-6' style={{ maxWidth: '720px' }}>
				<div className='flex gap-2'>
					<ButtonProvider
						height='22px'
						onClick={() => {
							dispatch({ type: 'SET_ACCORDIANS_COLLAPSE' });
						}}>
						Collapse all
					</ButtonProvider>
				</div>
			</div>
			<EventDetails />
			<DateTime />
			<LocationMap />
			<GuestPax />
			<ContactInformation />
			<Tentative />
			<GiftRegistry />
			<MoneyGift />
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
	<TextProvider className='uppercase font-semibold text-sm mb-0'>{children}</TextProvider>
);

{
	/******* Event Details ******/
}
const EventDetails = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const {
		enable_bahasa,
		event_title_1,
		event_title_2,
		description,
		host_details,
		rsvp_header_image,
		rsvp_header_image_file,
	} = inviteState;

	const handleOnChange = (type) => {
		return (event) => dispatchInvite({ type, payload: event.target.value });
	};

	return (
		<SettingCard stepNum='2' cardTitle={enable_bahasa ? 'Maklumat Majlis' : 'Event Details'}>
			<div className='py-4 px-6 text-start flex flex-col gap-4'>
				<InputFieldProvider
					title='EVENT TITLE 1*'
					placeholder='Walimatulurus'
					error={null}
					value={event_title_1}
					textSize='text-sm'
					onChange={handleOnChange('SET_EVENT_TITLE_1')}
				/>
				<TextAreaProvider
					title='EVENT TITLE 2*'
					placeholder='Izzul Syazwan & Nurul Syafiqah'
					value={event_title_2}
					className='text-center'
					minHeight='100px'
					onChange={handleOnChange('SET_EVENT_TITLE_2')}
				/>
				<TextAreaProvider
					title='HOSTED BY*'
					placeholder='Ir. Ts Mohd Rizal bin Johari
&	 Zubaidah Binti Mohd Isa'
					value={host_details}
					className='text-center'
					minHeight='100px'
					onChange={handleOnChange('SET_HOST_DETAILS')}
				/>
				<TextAreaProvider
					title='OPTIONAL DESCRIPTION'
					placeholder='Tema:
Lelaki: Baju Melayu/ batik
Perempuan: Baju kurung/ bersesuaian
				
Sila rsvp sebelum 27 may'
					value={description}
					className='text-left'
					minHeight='160px'
					onChange={handleOnChange('SET_DESCRIPTION')}
				/>
				<InputTitleText>{enable_bahasa ? 'Image Header' : 'Gambar'}</InputTitleText>
				<ImageUpload
					defaultImgUrl={
						rsvp_header_image_file ? URL.createObjectURL(rsvp_header_image_file) : rsvp_header_image
					}
					dispatch={dispatchInvite}
					type='SET_RSVP_HEADER_IMAGE_FILE'
					aspectRatio={0.88}
					key='RSVP_HEADER_IMAGE_FILE'
				/>
			</div>
		</SettingCard>
	);
};

{
	/******* Date & Time ******/
}
const DateTime = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { enable_bahasa, event_date, event_time, enable_multiple_slot, multiple_time_slot } =
		inviteState;

	return (
		<SettingCard stepNum='3' cardTitle={!enable_bahasa ? 'Date & Time' : 'Tarikh & Masa'}>
			<div className='py-4 px-6 text-start flex flex-col gap-4'>
				<div>
					<TextProvider className='uppercase font-semibold mb-2 text-sm'>Date</TextProvider>
					<DatePickerProvider
						value={event_date}
						dispatchInvite={dispatchInvite}
						type='SET_EVENT_DATE'
					/>
				</div>
				<div>
					<TextProvider className='uppercase font-semibold text-sm mb-2'>Time</TextProvider>
					<div className='flex gap-2'>
						<TimePickerProvider
							label='Start'
							value={event_time?.start}
							dispatchInvite={dispatchInvite}
							type='SET_EVENT_START_TIME'
						/>
						<TimePickerProvider
							label='End'
							value={event_time?.end}
							dispatchInvite={dispatchInvite}
							type='SET_EVENT_END_TIME'
						/>
					</div>
				</div>
				{/* <div className='flex flex-row justify-between'>
					<div className='flex flex-col gap-2'>
						<TextProvider className='uppercase text-sm font-semibold' color='text-gray-500'>
							Multiple Time Slot
						</TextProvider>
						<TextProvider className='font-medium text-xs' color='text-gray-500'>
							Set up time slots for your event to connect with family, friends and coworkers.
						</TextProvider>
					</div>
					<div>
						<ToggleSwitch
							value={enable_multiple_slot}
							dispatch={dispatchInvite}
							type='ENABLE_MULTIPLE_SLOT'
						/>
					</div>
				</div>
				{enable_multiple_slot && (
					<div>
						<div className='flex flex-col gap-1'>
							<TextProvider className='text-sm font-medium' color='text-gray-500'>
								SLOT 2
							</TextProvider>
							<TimePickerProvider
							label='Start'
							value={multiple_time_slot[0]}
							dispatchInvite={dispatchInvite}
							type='ADD_TIME_SLOT'
						/>
						</div>
					</div>
				)} */}
			</div>
		</SettingCard>
	);
};

{
	/******* Location & Map ******/
}
const LocationMap = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { location_info, event_address, enable_bahasa } = inviteState;

	const handleOnChange = (type) => {
		return (event) => dispatchInvite({ type, payload: event.target.value });
	};

	const handleOnChangeLocation = (event) => {
		dispatchInvite({ type: 'SET_EVENT_ADDRESS', payload: event.target.value });
		dispatchInvite({ type: 'SET_LOCATION_INFO_ADDRESS', payload: event.target.value });
	};

	return (
		<SettingCard stepNum='4' cardTitle={!enable_bahasa ? 'Location & Map' : 'Lokasi & Map'}>
			<div className='py-4 px-6 text-start flex flex-col gap-4'>
				<TextAreaProvider
					title='LOCATION *'
					placeholder='Eg: Changkat Telang,
49, B52, Pekan Batu Lapan Belas,
43100 Hulu Langat, Selangor.'
					value={event_address}
					className='text-left'
					minHeight='100px'
					onChange={handleOnChangeLocation}
				/>
				<div className='flex flex-col gap-4'>
					<InputFieldProvider
						textSize='text-sm'
						title='GOOGLE MAP'
						placeholder='https://www.google.com.my/maps'
						error={null}
						value={location_info?.googleLink}
						onChange={handleOnChange('SET_GOOGLE_LOCATION_LINK')}
					/>
					<InputFieldProvider
						textSize='text-sm'
						title='WAZE'
						placeholder='https://www.waze.com/live-map'
						error={null}
						value={location_info?.wazeLink}
						onChange={handleOnChange('SET_WAZE_LOCATION_LINK')}
					/>
				</div>
				<a
					href={'https://majlisku.com/create-digital-invite/#Step_3b_Location_and_Map'}
					target='_blank'
					rel='noreferrer'>
					<TextProvider className='text-xs text-gray-500'>
						Tutorial for copy and paste map URL
					</TextProvider>
				</a>
			</div>
		</SettingCard>
	);
};

{
	/******* Guest & Pax ******/
}
const GuestPax = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { enable_unlimited_pax, guest_pax_limit, enable_bahasa } = inviteState;

	return (
		<SettingCard stepNum='5' cardTitle={enable_bahasa ? 'Bilangan Kehadiran' : 'Guest Pax'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
							Unlimited Pax
						</TextProvider>
						<TextProvider className='font-medium text-xs' color='text-gray-600'>
							Guest can bring as many plus ones as they want
						</TextProvider>
					</div>
					<div>
						<ToggleSwitch
							value={enable_unlimited_pax}
							dispatch={dispatchInvite}
							type='ENABLE_UNLIMITED_PAX'
						/>
					</div>
				</div>
				<div className='flex justify-between'>
					<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
						Limit Pax Per Guest
					</TextProvider>
					<PaxInputProviderDispatch
						pax={guest_pax_limit}
						dispatch={dispatchInvite}
						type='SET_GUEST_PAX_LIMIT'
					/>
				</div>
				<div className='rounded-xl p-4 bg-red-50 flex items-start gap-2'>
					<InfoIcon />
					<TextProvider className='text-sm font-medium' color='text-black'>
						You can edit pax for individual guest in <b className='italic'>Guestlist</b>
					</TextProvider>
				</div>
			</div>
		</SettingCard>
	);
};

{
	/******* Contact Information ******/
}
const ContactInformation = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { contact_info, enable_bahasa } = inviteState;

	const addContactPerson = () => {
		let tempContacts = contact_info;
		tempContacts.push({ name: '', phone: '' });
		dispatchInvite({ type: 'SET_CONTACT_INFO', payload: tempContacts });
	};

	const removeContactPerson = (contactIndex) => {
		let tempContacts = contact_info;
		if (contactIndex > -1) {
			tempContacts.splice(contactIndex, 1);
			dispatchInvite({ type: 'SET_CONTACT_INFO', payload: tempContacts });
		}
	};

	return (
		<SettingCard stepNum='6' cardTitle={enable_bahasa ? 'Telefon' : 'Contact'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex flex-col gap-3'>
					{contact_info.map((contact, index) => (
						<ContactInfo
							key={index}
							index={index}
							removeFunc={removeContactPerson}
							value={contact}
							dispatchInvite={dispatchInvite}
						/>
					))}

					<div
						onClick={() => addContactPerson()}
						className='flex items-center gap-2 mt-2 cursor-pointer'>
						<PlusIcon />{' '}
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

{
	/******* Contact Information ******/
}
const ContactInfo = ({ index, removeFunc, value, dispatchInvite }) => {
	const handleNameOnChange = (index) => {
		return (event) =>
			dispatchInvite({
				type: 'EDIT_CONTACT_INFO_BASED_ON_INDEX',
				payload: { name: event.target.value },
				index: index,
			});
	};

	const handlePhoneOnChange = (index) => {
		return (event) =>
			dispatchInvite({
				type: 'EDIT_CONTACT_INFO_BASED_ON_INDEX',
				payload: { phone: event.target.value },
				index: index,
			});
	};

	return (
		<div className='text-start'>
			<SubTitleText>Person {index + 1}</SubTitleText>
			<div className='flex flex-col gap-2 my-2'>
				<InputField placeholder='Name' value={value.name} onChange={handleNameOnChange(index)} />
				<InputField
					placeholder='Phone Number'
					value={value.phone}
					onChange={handlePhoneOnChange(index)}
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

{
	/******* Tentative ******/
}
const Tentative = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { enable_itinerary, enable_bahasa } = inviteState;

	return (
		<SettingCard stepNum='7' cardTitle={enable_bahasa ? 'Aturcara' : 'Tentative'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<SubTitleText>Enable Itinerary</SubTitleText>
						<SubDescriptionText>Guest can bring as many plus ones as they want</SubDescriptionText>
					</div>
					<ToggleSwitch
						value={enable_itinerary}
						dispatch={dispatchInvite}
						type='ENABLE_ITINERARY'
					/>
				</div>
				<div
					className='edit-itinerary-actions border p-2 rounded-lg'
					style={{ opacity: enable_itinerary ? 1 : 0.5 }}>
					<TentativeContainer />
				</div>
			</div>
		</SettingCard>
	);
};

const TentativeContainer = () => {
	const { state } = useDigitalInviteContext();
	const { activities } = state;
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
			{activities?.length === 0 ? (
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
					{activities?.map((activity, index) => {
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
				activities={activities}
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
	const [description, setDescription] = useState('');
	const [time, setTime] = useState(
		activities?.length > 0 ? `${activities[activities.length - 1]?.date}` : '1983-07-21 08:00'
	);
	const { addActivity, isPending } = useItinerary();

	useEffect(() => {
		if (activities?.length > 0) {
			setTime(`${activities[activities.length - 1]?.date}`);
		}
	}, [activities]);

	const handlerSubmitActivity = () => {
		const activityBody = {
			title,
			description,
			date: time,
		};

		addActivity(activityBody, () => {
			handleClose();
		});
	};

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Add Activity'>
			<div className='p-4 sm:p-6 flex flex-col gap-4'>
				<InputFieldProvider
					title='TITLE'
					placeholder='Wedding Ceremony'
					error={null}
					value={title}
					textSize='text-sm'
					onChange={(e) => setTitle(e.target.value)}
				/>
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
	const [description, setDescription] = useState(activityDetail?.description);
	const [time, setTime] = useState(activityDetail?.date);
	const [deleteModal, setDeleteModal] = useState(false);
	const { editActivity, deleteActivity, isPending } = useItinerary();

	useEffect(() => {
		//Change the states based on activityDetail
		setTitle(activityDetail?.title);
		setDescription(activityDetail?.description);
		setTime(activityDetail?.date);
	}, [activityDetail]);

	const handlerEditActivity = () => {
		const activityBody = {
			title,
			description,
			date: time,
			id: activityDetail?.id,
		};

		editActivity(activityBody, () => {
			handleClose();
		});
	};

	const handleDeleteActivity = () => {
		deleteActivity(activityDetail?.id, () => {
			setDeleteModal(false);
			handleClose();
		});
	};

	return (
		<>
			<ModalProvider2
				loading={isPending}
				isOpen={isOpen}
				handleClose={handleClose}
				title='Edit Activity'>
				<div className='p-4 sm:p-6 flex flex-col gap-4'>
					<InputFieldProvider
						title='TITLE'
						placeholder='Wedding Ceremony'
						error={null}
						value={title}
						textSize='text-sm'
						onChange={(e) => setTitle(e.target.value)}
					/>
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
				loading={isPending}
				isOpen={deleteModal}
				handleConfirm={handleDeleteActivity}
				handleClose={() => setDeleteModal(false)}>
				<TextProvider>Are you sure want to remove this activity?</TextProvider>
			</ModalConfirmation>
		</>
	);
};

{
	/******* Gift Registry ******/
}
const GiftRegistry = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { enable_gift_registry, delivery_address, thank_you_text, enable_bahasa } = inviteState;

	const handleOnChangeAddress = (e) => {
		dispatchInvite({
			type: 'SET_DELIVERY_ADDRESS',
			payload: e.target.value,
		});
	};
	const handleOnChangeText = (e) => {
		dispatchInvite({
			type: 'SET_THANK_YOU_GIFT_TEXT',
			payload: e.target.value,
		});
	};

	return (
		<SettingCard stepNum='8' cardTitle={enable_bahasa ? 'Registri Hadiah' : 'Gift Registry'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<SubTitleText>Enable Gift Registry</SubTitleText>
						<SubDescriptionText>Guest can bring as many plus ones as they want</SubDescriptionText>
					</div>
					<ToggleSwitch
						value={enable_gift_registry}
						dispatch={dispatchInvite}
						type='ENABLE_GIFT_REGISTRY'
					/>
				</div>
				<div className='flex flex-col gap-3' style={{ opacity: enable_gift_registry ? 1 : 0.5 }}>
					<TextAreaProvider
						disabled={!enable_gift_registry}
						title='DELIVERY ADDRESS'
						placeholder='23, Jalan Raja Chulan, 50200 Kuala Lumpur, Malaysia'
						value={delivery_address}
						className='text-left'
						minHeight='100px'
						onChange={handleOnChangeAddress}
					/>
					<TextAreaProvider
						disabled={!enable_gift_registry}
						title='THANK YOU TEXT'
						placeholder='Thank you for the lovely gift! The bride and groom will definitely love it. Best regards, [Your name]'
						value={thank_you_text}
						className='text-left'
						minHeight='100px'
						onChange={handleOnChangeText}
					/>
				</div>
			</div>
		</SettingCard>
	);
};

{
	/******* Money Gift ******/
}

const MoneyGift = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { money_gift_details, enable_money_gift, enable_bahasa } = inviteState;

	const handleOnChange = (type) => {
		return (event) => dispatchInvite({ type, payload: event.target.value });
	};

	return (
		<SettingCard stepNum='10' cardTitle={enable_bahasa ? 'Salam Kaut Digital' : 'Money Gift'}>
			<div className='py-4 px-6 text-start flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-2'>
						<SubTitleText>Enable Money Gift</SubTitleText>
						<SubDescriptionText>Display money gift details in digital invite</SubDescriptionText>
					</div>
					<ToggleSwitch
						value={enable_money_gift}
						dispatch={dispatchInvite}
						type='ENABLE_MONEY_GIFT'
					/>
				</div>
				<div className='flex flex-col gap-4' style={{ opacity: enable_money_gift ? 1 : 0.7 }}>
					<InputFieldProvider
						disabled={!enable_money_gift}
						textSize='text-sm'
						title={enable_bahasa ? 'Nama' : 'Name'}
						placeholder='Muhamad Izzul Syahmi bin Mohd Rizal'
						error={null}
						value={money_gift_details?.name}
						onChange={handleOnChange('SET_MONEY_GIFT_NAME')}
					/>
					<InputFieldProvider
						disabled={!enable_money_gift}
						textSize='text-sm'
						title={enable_bahasa ? 'Nama Bank' : 'Bank'}
						placeholder='Maybank'
						error={null}
						value={money_gift_details?.bankName}
						onChange={handleOnChange('SET_MONEY_GIFT_BANK_NAME')}
					/>
					<InputFieldProvider
						disabled={!enable_money_gift}
						textSize='text-sm'
						title={enable_bahasa ? 'No Akaun' : 'Account Number'}
						placeholder='1234567880'
						error={null}
						value={money_gift_details?.accNum}
						onChange={handleOnChange('SET_MONEY_GIFT_ACC_NUMBER')}
					/>
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
