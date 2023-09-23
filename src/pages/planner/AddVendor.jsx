/** @format */

import React, { useState } from 'react';
//MUI import
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//Components  import
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import InputField from '../../components/atom/InputField/InputField';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import VendorCategorySelect from '../../components/atom/select/VendorCategorySelect';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import WholePageLoadingState from '../../components/atom/loading/WholePageLoadingState';
//Hooks import
import { useVendor } from '../../hooks/useVendor';

export function AddVendorModal({ isOpen, handleClose }) {
	const { addVendor, isPending } = useVendor();
	const submitToFirestore = (vendorDetails) => {
		addVendor(vendorDetails, () => {
			handleClose();
		});
	};

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Add Vendor'>
			<AddVendorContent handleCancel={handleClose} handleSubmit={submitToFirestore} />
		</ModalProvider2>
	);
}

export const AddVendorContent = ({ handleCancel, handleSubmit }) => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('venue');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [link, setLink] = useState('https://');
	const [rating, setRating] = useState(1);
	const [notes, setNotes] = useState('');
	//Error state
	const [inputError, setInputError] = useState(false);

	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#ff6d75',
		},
		'& .MuiRating-iconHover': {
			color: '#ff3d47',
		},
	});

	function isEmptyOrSpaces(str) {
		return str === null || str.trim() === '';
	}

	const handleSave = () => {
		if (isEmptyOrSpaces(title)) {
			setInputError(true);
		} else {
			setInputError(false);
			handleSubmit({
				title,
				price,
				category,
				phone_number: phone,
				email,
				link,
				rating,
				notes,
				status: 'shortlisted',
			});
		}
	};

	return (
		<div className='w-screen sm:w-auto text-left'>
			<div className='p-5 flex flex-col gap-4'>
				{/** Title **/}
				<div>
					<InputFieldProvider
						title='Title'
						placeholder='Enter vendor name'
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
						placeholder='100'
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
