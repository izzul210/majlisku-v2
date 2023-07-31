/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import TextProvider from '../../../components/atom/TextProvider/TextProvider';
import WholePageLoadingState from '../../../components/atom/loading/WholePageLoadingState';
import { AddGiftContent } from '../GiftRegistry';
//Icons import
import { BackIcon } from '../../../components/icons/actionIcons';

function AddGiftPage() {
	let navigate = useNavigate();

	// const submitToFirestore = (guestDetails) => {
	// 	addGuest(guestDetails, () => {
	// 		navigate(-1);
	// 	});
	// };

	return (
		<div className='bg-white w-full min-h-screen text-start'>
			<WholePageLoadingState loadingState={false} noOpacity={true} heightVh='100%' />
			<div className='p-4 pt-10 flex gap-5 items-center border-b border-gray-200'>
				<div onClick={() => navigate(-1)} className='cursor-pointer'>
					<BackIcon />
				</div>
				<TextProvider className='text-lg font-semibold text-gray-900'>ADD GIFT</TextProvider>
			</div>

			<div>
				<AddGiftContent handleCancel={() => navigate(-1)} />
			</div>
		</div>
	);
}

export default AddGiftPage;
