/** @format */

import React, { useState } from 'react';
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
//Icons import
import { InfoIcon } from '../../components/icons/generalIcons';
import { DeleteIcon, PlusIcon } from '../../components/icons/actionIcons';
//Context import
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
//Styling import
import './DigitalInvite.scss';

function Setting() {
	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-24 bg-white sm:bg-transparent'>
			<EventDetails />
			<DateTime />
			<LocationMap />
			<GuestPax />
			<ContactInformation />
			<Tentative />
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
	<TextProvider className='uppercase font-semibold text-sm mb-2'>{children}</TextProvider>
);

const EventDetails = () => {
	const { inviteState } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { enable_bahasa, event_title_1, event_title_2, description, host_details } = inviteState;

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
			</div>
		</SettingCard>
	);
};

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

const Tentative = () => {
	const { inviteState, state } = useDigitalInviteContext();
	const { dispatchInvite } = useDigitalInviteDispatchContext();
	const { enable_itinerary, enable_bahasa } = inviteState;

	console.log(state);

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
					<div className='flex justify-center'>
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
		</div>
	);
};

const AddTentativeModal = ({ isOpen, handleClose, activities }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [time, setTime] = useState(
		activities?.length > 0 ? `${activities[activities.length - 1].date}` : '1983-07-21 08:00'
	);

	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleClose} title='Add Activity'>
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
					onClick={handleClose}>
					Save
				</ButtonProvider>
			</div>
		</ModalProvider2>
	);
};
