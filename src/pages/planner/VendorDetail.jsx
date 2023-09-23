/** @format */

import React, { useState, useEffect } from 'react';
//MUI import
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//Context import
import { usePlannerContext } from '../../context/PlannerContext';
//Components import
import ModalVendorDetail from '../../components/atom/ModalProvider/ModalVendorDetail';
import { EditVendorModal } from './EditVendor';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import VendorStatusSelect from '../../components/atom/select/VendorStatusSelect';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import LoadingButtonProvider from '../../components/atom/ButtonProvider/LoadingButtonProvider';
import './Planner.scss';

export function VendorDetailModal({ isOpen, handleClose, handleOpen }) {
	const { vendorlist, vendorDetails } = usePlannerContext();
	const [vendorDetail, setVendorDetail] = useState(null);
	const [editVendorModal, setEditVendorModal] = useState(false);

	useEffect(() => {
		if (vendorDetails) {
			let vendor_ = vendorlist.find((vendor) => vendor.id === vendorDetails.id);
			setVendorDetail(vendor_);
		}
	}, [vendorDetails, vendorlist]);

	const handleEditVendor = () => {
		handleClose();
		setEditVendorModal(true);
	};

	const handleCloseEditVendor = () => {
		setEditVendorModal(false);
		handleOpen();
	};

	const handlePostDeleteVendor = () => {
		setEditVendorModal(false);
	};

	return (
		<>
			<ModalVendorDetail
				isOpen={isOpen}
				handleEdit={handleEditVendor}
				handleClose={handleClose}
				title={vendorDetail?.title}>
				<VendorDetailContent vendorDetail={vendorDetail} />
			</ModalVendorDetail>
			<EditVendorModal
				isOpen={editVendorModal}
				handleClose={handleCloseEditVendor}
				handlePostDeleteGuest={handlePostDeleteVendor}
			/>
		</>
	);
}

export const VendorDetailContent = ({ vendorDetail }) => {
	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#ff6d75',
		},
		'& .MuiRating-iconHover': {
			color: '#ff3d47',
		},
	});

	return (
		<div className='w-auto overflow-hidden text-left'>
			{/*** Guest Details */}
			<div className='flex flex-col gap-5 px-7 sm:px-2 py-8 border-y border-gray-200'>
				{/*** Category */}
				<div className='flex items-center'>
					<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
						Category:
					</TextProvider>
					<div className='flex items-center justify-center rounded-full bg-gray-200 py-1 px-4'>
						<TextProvider className='text-gray-900 capitalize font-semibold text-lg'>
							{vendorDetail?.category}
						</TextProvider>
					</div>
				</div>
				{/**** Price ***/}
				<div className='flex items-center'>
					<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
						Price:
					</TextProvider>
					<div className='flex items-center justify-center round'>
						<TextProvider className='text-gray-500 font-normal text-base'>
							{parseFloat(vendorDetail?.price).toLocaleString('en-MY', {
								style: 'currency',
								currency: 'MYR',
							})}
						</TextProvider>
					</div>
				</div>
				{/**** My Rating ****/}
				<div className='flex items-center'>
					<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
						My Rating:
					</TextProvider>
					<div>
						<StyledRating
							name='customized-color'
							readOnly
							value={vendorDetail?.rating}
							getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
							precision={0.5}
							size='medium'
							icon={<FavoriteIcon fontSize='inherit' />}
							emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
						/>
					</div>
				</div>

				{/***** Contact */}
				{vendorDetail?.phone_number || vendorDetail?.email ? (
					<div className='flex items-start'>
						<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
							Contact:
						</TextProvider>

						<div className='flex flex-col gap-1'>
							<TextProvider className='text-gray-900 font-normal text-lg'>
								{vendorDetail?.phone_number}
							</TextProvider>
							<TextProvider className='text-gray-900 font-normal text-lg'>
								{vendorDetail?.email}
							</TextProvider>
						</div>
					</div>
				) : null}
				{/***** Link */}
				{vendorDetail?.link && vendorDetail?.link !== '' ? (
					<div className='flex items-center'>
						<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
							Link:
						</TextProvider>
						<a href={vendorDetail?.link} target='_blank'>
							<TextProvider className='text-gray-900 font-bold underline text-lg'>
								Visit Page
							</TextProvider>
						</a>
					</div>
				) : null}
				{vendorDetail?.notes ? (
					<div className='flex flex-col gap-1'>
						<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
							Notes:
						</TextProvider>
						<div>
							<TextProvider className='text-gray-400 font-normal text-lg'>
								{vendorDetail?.notes}
							</TextProvider>
						</div>
					</div>
				) : null}
				<div className='flex w-full justify-end'>
					<VendorStatusSelect vendorStatus={vendorDetail?.status} vendorId={vendorDetail?.id} />
				</div>
			</div>
		</div>
	);
};
