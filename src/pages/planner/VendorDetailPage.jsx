/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//Context import
import { usePlannerContext } from '../../context/PlannerContext';
//Components import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import { VendorDetailContent } from './VendorDetail';
//Hooks import
//Icons import
import { EditIcon, BackIcon } from '../../components/icons/actionIcons';

function VendorDetailPage() {
	const { vendorlist } = usePlannerContext();
	const [vendorDetail, setVendorDetail] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		if (vendorlist) {
			let vendor = vendorlist.find((vendor) => vendor.id === id);
			setVendorDetail(vendor);
		}
	}, [id, vendorlist]);

	const topBarStyle = {
		background: 'linear-gradient(180deg, #a8a4a284 0%, #fff 100%)',
	};

	function handleEditVendor() {
		navigate(`/planner/editvendor/${id}`);
	}

	return (
		<div className='bg-white overflow-x-hidden w-full h-screen'>
			<div style={topBarStyle}>
				<div className='px-6 py-12 flex gap-5 items-center justify-between w-full'>
					<div onClick={() => navigate(-1)} className='cursor-pointer'>
						<BackIcon width={24} height={24} />
					</div>
					<div onClick={handleEditVendor} className='cursor-pointer'>
						<EditIcon width={24} height={24} fill='#1D4648' />
					</div>
				</div>
				<TextProvider fontFamily='lora' className='text-2xl font-semibold text-left px-6'>
					<div
						style={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
							height: 50,
						}}>
						{vendorDetail?.title}
					</div>
				</TextProvider>
			</div>

			<div>{vendorDetail ? <VendorDetailContent vendorDetail={vendorDetail} /> : null}</div>
		</div>
	);
}

export default VendorDetailPage;
