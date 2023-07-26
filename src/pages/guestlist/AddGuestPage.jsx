/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import { AddGuestContent } from './AddGuest';
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';
//Icons import
import { BackIcon } from '../../components/icons/actionIcons';

function AddGuestPage() {
	const { addGuest, isPending } = useGuestlist();
	let navigate = useNavigate();

	const submitToFirestore = (guestDetails) => {
		addGuest(guestDetails, () => {
			navigate(-1);
		});
	};

	return (
		<div className='bg-white min-h-screen'>
			<WholePageLoadingState loadingState={isPending} noOpacity={true} heightVh='100%' />
			<div className='p-4 pt-12 flex gap-5 items-center border-b border-gray-200'>
				<div onClick={() => navigate(-1)} className='cursor-pointer'>
					<BackIcon />
				</div>
				<TextProvider className='text-lg font-semibold text-gray-900'>ADD GUEST</TextProvider>
			</div>

			<div>
				<AddGuestContent handleCancel={() => navigate(-1)} handleSubmit={submitToFirestore} />
			</div>
		</div>
	);
}

export default AddGuestPage;
