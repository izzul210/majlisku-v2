/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import { AddVendorContent } from './AddVendor';
//Hooks import
import { useVendor } from '../../hooks/useVendor';
//Icosn import
import { BackIcon } from '../../components/icons/actionIcons';

function AddVendorPage() {
	const { addVendor, isPending } = useVendor();
	let navigate = useNavigate();

	const submitToFirestore = (vendorDetails) => {
		addVendor(vendorDetails, () => {
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
				<TextProvider className='text-lg font-semibold text-gray-900'>ADD VENDOR</TextProvider>
			</div>

			<div>
				<AddVendorContent handleCancel={() => navigate(-1)} handleSubmit={submitToFirestore} />
			</div>
		</div>
	);
}

export default AddVendorPage;
