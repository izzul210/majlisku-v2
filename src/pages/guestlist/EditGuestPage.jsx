/** @format */
import React, { useState, useEffect } from 'react';
//Hooks import
import { useNavigate, useParams } from 'react-router-dom';
import { useGuestlist } from '../../hooks/useGuestlist';
//Components import
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import { EditGuestContent } from './EditGuest';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
//Icons import
import { BackIcon } from '../../components/icons/actionIcons';
function EditGuestPage() {
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
		<div className='bg-white h-screen'>
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

export default EditGuestPage;
