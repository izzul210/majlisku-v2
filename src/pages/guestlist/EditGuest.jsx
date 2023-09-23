/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
//Components  import
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import InputField from '../../components/atom/InputField/InputField';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import MultipleSelectChip from '../../components/atom/select/MultipleSelect';
import BasicSelect from '../../components/atom/select/BasicSelect';
import PaxInputProvider from '../../components/atom/InputField/PaxInputProvider';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';
import { useUserContext } from '../../context/UserContext';
//Icons import
import { BackIcon, DeleteIcon } from '../../components/icons/actionIcons';
import { useGuestlistContext } from '../../context/GuestlistContext';

export function EditGuestModal({ isOpen, handleClose, handlePostDeleteGuest }) {
	const { guestDetails } = useGuestlistContext();
	const { updateGuestDetails, isPending } = useGuestlist();

	const handleSubmit = ({ name, phone, email, groups, timeSlot, pax, notes, guestId }) => {
		updateGuestDetails({ name, phone, email, groups, timeSlot, pax, notes }, guestId, () => {
			handleClose();
		});
	};

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Edit Guest'>
			<EditGuestContent
				handleCancel={handleClose}
				handleSubmit={handleSubmit}
				handlePostDeleteGuest={handlePostDeleteGuest}
				id={guestDetails?.id}
			/>
		</ModalProvider2>
	);
}

export function EditGuestPage() {
	const { updateGuestDetails, isPending } = useGuestlist();
	let navigate = useNavigate();
	let { id } = useParams();

	const handleSubmit = ({ name, phone, email, groups, timeSlot, pax, notes, guestId }) => {
		updateGuestDetails({ name, phone, email, groups, timeSlot, pax, notes }, guestId, () => {
			navigate(-1);
		});
	};

	const handlePostDeleteGuest = () => {
		navigate('/guestlist');
	};

	return (
		<div className='bg-white'>
			<WholePageLoadingState loadingState={isPending} noOpacity={true} heightVh='100%' />
			<div className='p-4 pt-12 flex gap-5 items-center border-b border-gray-200'>
				<div onClick={() => navigate(-1)} className='cursor-pointer'>
					<BackIcon />
				</div>
				<TextProvider className='text-lg font-semibold'>EDIT GUEST</TextProvider>
			</div>

			<div>
				<EditGuestContent
					handleCancel={() => navigate(-1)}
					handleSubmit={handleSubmit}
					handlePostDeleteGuest={handlePostDeleteGuest}
					id={id}
				/>
			</div>
		</div>
	);
}

export const EditGuestContent = ({ handleCancel, handleSubmit, handlePostDeleteGuest, id }) => {
	const { guestlist } = useGuestlistContext();
	const { userData } = useUserContext();
	const { deleteGuest, isPending } = useGuestlist();
	const [guestId, setGuestId] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);
	//User details input
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [groups, setGroups] = useState([]);
	const [timeSlot, setTimeSlot] = useState('');
	const [pax, setPax] = useState(1);
	const [notes, setNotes] = useState('');
	//Error state
	const [inputError, setInputError] = useState(false);

	useEffect(() => {
		initiateInput(id);
	}, [id]);

	function initiateInput(id) {
		if (id) {
			setGuestId(id);
			const tempGuestDetails = guestlist?.find((guest) => guest.id === id);

			if (tempGuestDetails) {
				setName(tempGuestDetails.name || '');
				setPhone(tempGuestDetails.phone || '');
				setEmail(tempGuestDetails.email || '');
				setPax(tempGuestDetails.pax || '');
				setNotes(tempGuestDetails.notes || '');
				setGroups(
					tempGuestDetails.groups
						? tempGuestDetails.groups
						: tempGuestDetails?.group !== ''
						? [tempGuestDetails.group]
						: []
				);
				if (tempGuestDetails?.timeSlot) {
					initiateTimeslot(tempGuestDetails.timeSlot);
				} else if (tempGuestDetails?.response?.timeSlot) {
					initiateTimeslot(tempGuestDetails.response.timeSlot);
				} else {
					setTimeSlot(null);
				}
			}
		}
	}

	function initiateTimeslot(timeSlot) {
		const timeSlot_1 = userData?.eventDetails?.event_time?.start;
		const timeSlot_2 = userData?.eventDetails?.event_time_slot_2;
		const formatted_timeSlot_1 = moment(timeSlot_1).format('h:mm A');
		const formatted_timeSlot_2 = moment(timeSlot_2).format('h:mm A');

		const formatted_timeSlot = moment(timeSlot).format('h:mm A');

		if (formatted_timeSlot === formatted_timeSlot_1) {
			setTimeSlot(timeSlot_1);
		} else if (formatted_timeSlot === formatted_timeSlot_2) {
			setTimeSlot(timeSlot_2);
		} else {
			setTimeSlot(null);
		}
	}

	function isEmptyOrSpaces(str) {
		return str === null || str.trim() === '';
	}

	const handleSave = () => {
		if (isEmptyOrSpaces(name)) {
			setInputError(true);
		} else {
			setInputError(false);
			handleSubmit({ name, phone, email, groups, timeSlot, pax, notes, guestId });
		}
	};

	const handleDeleteGuest = () => {
		deleteGuest(guestId, () => {
			setDeleteModal(false);
			handlePostDeleteGuest();
		});
	};

	return (
		<div className='w-screen sm:w-auto text-left'>
			<div className='p-5 flex flex-col gap-4'>
				{/** Name **/}
				<div>
					<InputFieldProvider
						title='Name'
						placeholder='Enter name'
						error={inputError}
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					{inputError && (
						<TextProvider className='text-sm text-red-500 mt-1 text-right'>
							Name is required!
						</TextProvider>
					)}
				</div>

				{/** Contact **/}
				<div>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>Contact</TextProvider>
					<div className='flex gap-2 flex-wrap flex-col sm:flex-row'>
						<InputField
							name='Phone Number'
							id='phone'
							placeholder='Phone Number'
							value={phone}
							flex
							onChange={(event) => setPhone(event.target.value)}
						/>
						<InputField
							name='Email Address'
							id='email'
							placeholder='Email Address'
							value={email}
							flex
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
				</div>
				{/** Groups **/}
				<div>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>Groups</TextProvider>
					<MultipleSelectChip group={groups} setGroup={setGroups} />
				</div>
				{/** Timeslot **/}
				<div>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>Timeslot</TextProvider>
					<BasicSelect timeSlot={timeSlot} setTimeSlot={setTimeSlot} />
				</div>
				{/** Pax (Plus Ones) **/}
				<div className='flex items-center justify-between'>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>
						Pax (Plus Ones)
					</TextProvider>
					<div className='flex justify-end'>
						<PaxInputProvider pax={pax} setPax={setPax} />
					</div>
				</div>
				<TextAreaProvider
					title='Notes (Optional)'
					placeholder='Enter notes'
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
				/>
			</div>
			<div className='flex justify-between items-center gap-4 p-5 border-t border-gray-200'>
				<div
					className='flex gap-2 items-center cursor-pointer'
					onClick={() => setDeleteModal(true)}>
					<DeleteIcon />
					<TextProvider className='text-red-700 font-semibold'>REMOVE</TextProvider>
				</div>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider onClick={handleSave} width='auto' type='primary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm text-white'>SAVE</TextProvider>
					</ButtonProvider>
				</div>
			</div>
			<ModalConfirmation
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE GUEST</TextProvider>
					</div>
				}
				loading={isPending}
				isOpen={deleteModal}
				handleConfirm={handleDeleteGuest}
				handleClose={() => setDeleteModal(false)}>
				<TextProvider>
					Are you sure want to remove <b>{name}</b>?
				</TextProvider>
			</ModalConfirmation>
		</div>
	);
};
