/** @format */

import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
//Context import
import { useUserContext } from '../../context/UserContext';
import { usePlannerContext, usePlannerDispatchContext } from '../../context/PlannerContext';
//MUI import
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//Components import
import { SearchBar } from '../../components/atom/SearchBar/SearchBar';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import { AddVendorModal } from './AddVendor';
import { VendorDetailModal } from './VendorDetail';
import FloatingAdd from '../../components/atom/buttons/FloatingAdd';
//Icons imoprt
import { PlusIcon } from '../../components/icons/generalIcons';
import {
	ShortlistedIcon,
	DepositedIcon,
	FinalizedIcon,
	PaidIcon,
} from '../../components/icons/brandIcons';

//VendorCard
const VendorCard = ({ vendor, ...props }) => {
	const { category, notes, price, rating, status, title, id } = vendor || {};

	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#ff6d75',
		},
		'& .MuiRating-iconHover': {
			color: '#ff3d47',
		},
	});

	const notesStyle = {
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		height: 50,
		width: 280,
	};

	const statusTag = (status) => {
		if (status === 'finalized') {
			return (
				<div className='finalized'>
					<TextProvider className='flex gap-2 items-center uppercase font-medium'>
						<FinalizedIcon /> Finalized
					</TextProvider>
				</div>
			);
		} else if (status === 'paid') {
			return (
				<div className='paid'>
					<TextProvider className='flex gap-2 items-center uppercase font-medium'>
						<PaidIcon /> Paid
					</TextProvider>
				</div>
			);
		} else if (status === 'deposited') {
			return (
				<div className='deposited'>
					<TextProvider className='flex gap-2 items-center uppercase font-medium'>
						<DepositedIcon /> Deposited
					</TextProvider>
				</div>
			);
		} else {
			return (
				<div className='shortlisted'>
					<TextProvider className='flex gap-2 items-center uppercase font-medium'>
						<ShortlistedIcon /> Shortlisted
					</TextProvider>
				</div>
			);
		}
	};

	return (
		<div className='vendor-card' {...props}>
			<div className='p-4 sm:p-5'>
				<div className='flex items-center justify-between gap-3 border-b pb-3'>
					<TextProvider
						colorStyle='#101828'
						className='text-lg font-semibold whitespace-nowrap ellipsis overflow-hidden'>
						{title}
					</TextProvider>
					<div className='rounded-full bg-gray-100 px-2'>
						<TextProvider className='text-sm uppercase font-semibold'>{category}</TextProvider>
					</div>
				</div>
				<div className='flex flex-col gap-2 mt-4'>
					<div className='flex flex-row justify-between items-center'>
						<TextProvider colorStyle='#98a2b3' className='text-base font-semibold uppercase'>
							Price
						</TextProvider>
						<TextProvider colorStyle='#101828' className='text-base font-semibold'>
							{parseFloat(price).toLocaleString('en-MY', { style: 'currency', currency: 'MYR' })}
						</TextProvider>
					</div>
					<div className='flex flex-row justify-between items-center'>
						<TextProvider colorStyle='#98a2b3' className='text-base font-semibold uppercase'>
							My Rating
						</TextProvider>
						<div>
							<StyledRating
								name='customized-color'
								readOnly
								value={rating}
								getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
								precision={0.5}
								size='medium'
								icon={<FavoriteIcon fontSize='inherit' />}
								emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
							/>
						</div>
					</div>
					<div className='flex flex-row justify-between items-center'>
						<TextProvider colorStyle='#98a2b3' className='text-base font-semibold uppercase'>
							Status
						</TextProvider>
						<div>{statusTag(status)}</div>
					</div>
					<div className='flex flex-col items-start'>
						<TextProvider colorStyle='#98a2b3' className='text-base font-semibold uppercase'>
							Notes
						</TextProvider>
						<TextProvider className='text-start text-sm '>
							<div style={notesStyle}>{notes ? notes : '. . .'}</div>
						</TextProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

const Vendor = () => {
	const dispatch = usePlannerDispatchContext();
	const { vendorlist, loadingVendor } = usePlannerContext();
	const [searchVendor, setSearchVendor] = useState('');
	//Modal states
	const [addVendorModal, setAddVendorModal] = useState(false);
	const [vendorDetailModal, setVendorDetailModal] = useState(false);
	const phoneSize = useMediaQuery('(max-width:600px)');

	let navigate = useNavigate();

	const filterSearch = (vendor) => {
		if (searchVendor !== '') {
			return vendor.title.toLowerCase().startsWith(searchVendor);
		} else {
			return vendor;
		}
	};

	const openVendorDetail = (vendorDetail) => {
		dispatch({ type: 'SET_VENDOR_DETAILS', payload: vendorDetail });
		if (phoneSize) {
			navigate(`/planner/vendordetail/${vendorDetail.id}`);
		} else {
			setVendorDetailModal(true);
		}
	};

	return (
		<div className='w-full flex-grow flex-col pt-8 justify-start h-full'>
			{/******* Top Section ****/}
			<div className='flex justify-between items-center w-full px-4'>
				<SearchBar setSearch={setSearchVendor} search={searchVendor} />

				{!phoneSize ? (
					<div className='flex gap-2'>
						<ButtonProvider
							onClick={() => {
								setAddVendorModal(true);
							}}
							type='primary'
							padding='12px 20px'>
							<PlusIcon />
							<TextProvider className='text-white'>ADD VENDOR</TextProvider>
						</ButtonProvider>
					</div>
				) : null}
			</div>

			{loadingVendor ? (
				<div className='h-3/4 w-full flex justify-center items-center'>
					<CircularProgress color='success' />
				</div>
			) : (
				<>
					{vendorlist?.length === 0 ? (
						<div className='flex flex-col gap-2 justify-center items-center h-full pb-32'>
							<ButtonProvider width='154px' type='primary' padding='12px 20px'>
								<PlusIcon />
								<TextProvider className='text-white'>ADD VENDOR</TextProvider>
							</ButtonProvider>
						</div>
					) : (
						<div className='flex p-4 mt-4 flex-row justify-center md:justify-start flex-wrap w-full gap-4'>
							{vendorlist?.filter(filterSearch).map((vendor) => (
								<VendorCard
									key={vendor.id}
									vendor={vendor}
									onClick={() => openVendorDetail(vendor)}
								/>
							))}
						</div>
					)}
				</>
			)}

			<FloatingAdd
				setAddFunc={() => {
					navigate('/planner/addvendor');
				}}
			/>
			<AddVendorModal isOpen={addVendorModal} handleClose={() => setAddVendorModal(false)} />
			<VendorDetailModal
				isOpen={vendorDetailModal}
				handleClose={() => setVendorDetailModal(false)}
				handleOpen={() => setVendorDetailModal(true)}
			/>
		</div>
	);
};

export default Vendor;
