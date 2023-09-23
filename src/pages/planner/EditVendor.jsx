/** @format */

import React, { useState, useEffect } from 'react';
//Components  import
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import InputField from '../../components/atom/InputField/InputField';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
import VendorCategorySelect from '../../components/atom/select/VendorCategorySelect';
//MUI import
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//Context import
import { usePlannerContext } from '../../context/PlannerContext';
import { useUserContext } from '../../context/UserContext';
//Hooks import
import { useVendor } from '../../hooks/useVendor';
//Icons import
import { BackIcon, DeleteIcon } from '../../components/icons/actionIcons';

export function EditVendorModal({ isOpen, handleClose, handlePostDeleteGuest }) {
	const { vendorDetails } = usePlannerContext();

	const isPending = false;

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Edit Vendor'>
			<EditVendorContent
				handleCancel={handleClose}
				handlePostDeleteGuest={handlePostDeleteGuest}
				id={vendorDetails?.id}
			/>
		</ModalProvider2>
	);
}

export const EditVendorContent = ({ handleCancel, handlePostDeleteGuest, id }) => {
	const { vendorlist } = usePlannerContext();
	const { userData } = useUserContext();
	const [vendorId, setVendorId] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);
	//User details input
	const [title, setTitle] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [category, setCategory] = useState('venue');
	const [email, setEmail] = useState('');
	const [link, setLink] = useState('https://');
	const [price, setPrice] = useState('');
	const [rating, setRating] = useState(1);
	const [notes, setNotes] = useState('');
	//Error state
	const [inputError, setInputError] = useState(false);
	//API call
	const { updateVendorDetails, deleteVendor, isPending } = useVendor();

	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#ff6d75',
		},
		'& .MuiRating-iconHover': {
			color: '#ff3d47',
		},
	});

	useEffect(() => {
		function initiateInput(id) {
			if (id) {
				setVendorId(id);
				const tempVendorDetails = vendorlist?.find((vendor) => vendor.id === id);

				console.log('tempVendorDetails', tempVendorDetails);

				if (tempVendorDetails) {
					const { title, phone_number, email, link, price, rating, notes, category } =
						tempVendorDetails;
					setTitle(title || '');
					setPhoneNumber(phone_number || '');
					setEmail(email || '');
					setLink(link || '');
					setPrice(price || '');
					setRating(rating || '');
					setNotes(notes || '');
					setCategory(category || '');
				}
			}
		}

		initiateInput(id);
	}, [id]);

	function isEmptyOrSpaces(str) {
		return str === null || str.trim() === '';
	}

	const handleSave = () => {
		if (isEmptyOrSpaces(title)) {
			setInputError(true);
		} else {
			setInputError(false);
			updateVendorDetails(
				{
					title,
					price,
					category,
					phone_number: phoneNumber,
					email,
					link,
					rating,
					notes,
				},
				id,
				() => {
					handleCancel();
				}
			);
		}
	};

	const handleDeleteVendor = () => {
		deleteVendor(id, () => {
			handlePostDeleteGuest();
		});
	};

	return (
		<div className='w-screen sm:w-auto text-left'>
			<WholePageLoadingState loadingState={isPending} />
			<div className='p-5 flex flex-col gap-4'>
				{/** Title **/}
				<div>
					<InputFieldProvider
						title='Title'
						placeholder='Enter title'
						error={inputError}
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					{inputError && (
						<TextProvider className='text-sm text-red-500 mt-1 text-right'>
							Title is required!
						</TextProvider>
					)}
				</div>
				{/** Price **/}
				<div>
					<InputFieldProvider
						icon={<TextProvider>RM</TextProvider>}
						title='Price'
						placeholder='10,000'
						value={price}
						onChange={(event) => setPrice(event.target.value)}
					/>
				</div>
				{/** Category **/}
				<div>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>Category</TextProvider>
					<VendorCategorySelect category={category} setCategory={setCategory} />
				</div>
				{/** Contact **/}
				<div>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>Contact</TextProvider>
					<div className='flex gap-2 flex-wrap flex-col sm:flex-row'>
						<InputField
							name='Phone Number'
							id='phone'
							placeholder='Phone Number'
							value={phoneNumber}
							flex
							onChange={(event) => setPhoneNumber(event.target.value)}
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
				{/** Link **/}
				<div>
					<InputFieldProvider
						title='Link'
						placeholder='Enter link'
						value={link}
						onChange={(event) => setLink(event.target.value)}
					/>
				</div>
				{/** My Rating **/}
				<div>
					<TextProvider className='font-semibold text-sm uppercase mb-1'>My Rating</TextProvider>
					<div className='mt-1'>
						<StyledRating
							name='customized-color'
							value={rating}
							getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
							onChange={(e, newValue) => {
								setRating(newValue);
							}}
							precision={0.5}
							size='large'
							icon={<FavoriteIcon fontSize='inherit' />}
							emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
						/>
					</div>
				</div>
				{/** Notes */}
				<TextAreaProvider
					className='text-gray-900'
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
						<TextProvider className=' font-semibold mt-1'>REMOVE VENDOR</TextProvider>
					</div>
				}
				loading={isPending}
				isOpen={deleteModal}
				handleConfirm={handleDeleteVendor}
				handleClose={() => setDeleteModal(false)}>
				<TextProvider>Are you sure want to remove this vendor?</TextProvider>
			</ModalConfirmation>
		</div>
	);
};
