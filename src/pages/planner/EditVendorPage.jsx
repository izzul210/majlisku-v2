/** @format */
import React, { useState, useEffect } from 'react';
//Hooks import
import { useNavigate, useParams } from 'react-router-dom';
//Components import
import { EditVendorContent } from './EditVendor';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
//Icons import
import { BackIcon } from '../../components/icons/actionIcons';

function EditVendorPage() {
	let navigate = useNavigate();
	let { id } = useParams();

	let isPending = false;

	const handlePostDeleteGuest = () => {
		navigate('/planner/vendor');
	};

	return (
		<div className='bg-white min-h-screen'>
			<WholePageLoadingState loadingState={isPending} noOpacity={true} heightVh='100%' />
			<div className='p-4 pt-12 flex gap-5 items-center border-b border-gray-200'>
				<div onClick={() => navigate(-1)} className='cursor-pointer'>
					<BackIcon />
				</div>
				<TextProvider className='text-lg font-semibold'>EDIT GUEST</TextProvider>
			</div>

			<div>
				<EditVendorContent
					handleCancel={() => navigate(-1)}
					handlePostDeleteGuest={handlePostDeleteGuest}
					id={id}
				/>
			</div>
		</div>
	);
}

export default EditVendorPage;
