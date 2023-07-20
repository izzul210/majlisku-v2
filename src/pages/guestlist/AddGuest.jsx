/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';
//Icons import
import { BackIcon } from '../../components/icons/actionIcons';

export function AddGuestModal({ isOpen, handleClose }) {
	const { addGuest, isPending } = useGuestlist();

	const submitToFirestore = (guestDetails) => {
		addGuest(guestDetails, () => {
			handleClose();
		});
	};

	return (
		<ModalProvider2 loading={isPending} isOpen={isOpen} handleClose={handleClose} title='Add Guest'>
			<AddGuestContent handleCancel={handleClose} handleSubmit={submitToFirestore} />
		</ModalProvider2>
	);
}

export function AddGuestPage() {
	const { addGuest, isPending } = useGuestlist();
	let navigate = useNavigate();

	const submitToFirestore = (guestDetails) => {
		addGuest(guestDetails, () => {
			navigate(-1);
		});
	};

	return (
		<div className='bg-white'>
			<WholePageLoadingState loadingState={isPending} noOpacity={true} heightVh='100%' />
			<div className='p-4 pt-12 flex gap-5 items-center border-b border-gray-200'>
				<div onClick={() => navigate(-1)} className='cursor-pointer'>
					<BackIcon />
				</div>
				<TextProvider className='text-lg font-semibold'>ADD GUEST</TextProvider>
			</div>

			<div>
				<AddGuestContent handleCancel={() => navigate(-1)} handleSubmit={submitToFirestore} />
			</div>
		</div>
	);
}

export const AddGuestContent = ({ handleCancel, handleSubmit }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [groups, setGroups] = useState([]);
	const [timeSlot, setTimeSlot] = useState('');
	const [pax, setPax] = useState(1);
	const [notes, setNotes] = useState('');
	//Error state
	const [inputError, setInputError] = useState(false);

	function isEmptyOrSpaces(str) {
		return str === null || str.trim() === '';
	}

	const handleSave = () => {
		if (isEmptyOrSpaces(name)) {
			setInputError(true);
		} else {
			setInputError(false);
			handleSubmit({ name, phone, email, groups, timeSlot, pax, notes });
		}
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
				<div className='flex gap-2 items-center cursor-pointer'></div>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider onClick={handleSave} width='auto' type='primary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm text-white'>SAVE</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</div>
	);
};
