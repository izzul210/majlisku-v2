/** @format */

import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//MUI
import { useMediaQuery } from '@mui/material';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import FloatingAdd from '../../components/atom/buttons/FloatingAdd';
import ModalProvider from '../../components/atom/ModalProvider/ModalProvider2';
import ModalWithEdit from '../../components/atom/ModalProvider/ModalWIthEdit';
import ImageUpload from '../../components/atom/ImageUpload/ImageUpload';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
//Context import
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
import { useUserContext } from '../../context/UserContext';
//Icons impoort
import { PlusIcon, DeleteIcon } from '../../components/icons/actionIcons';
import { InfoIcon } from '../../components/icons/inviteIcons';
import './DigitalInvite.scss';

const initialState = {
	gift_image_file: null,
	edit_gift_image_file: null,
	gift_details: {},
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_GIFT_IMAGE':
			return {
				...state,
				gift_image_file: action.payload,
			};
		case 'SET_EDIT_GIFT_IMAGE':
			return {
				...state,
				edit_gift_image_file: action.payload,
			};
		case 'SET_GIFT_DETAILS':
			return {
				...state,
				gift_details: action.payload,
			};
		default:
			return initialState;
	}
};

const TickIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16' fill='none'>
		<path
			d='M13.8332 4L6.49984 11.3333L3.1665 8'
			stroke='#F1BFBE'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M13.8332 4L6.49984 11.3333L3.1665 8'
			stroke='black'
			stroke-opacity='0.5'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const InputTitle = ({ children }) => (
	<TextProvider className='uppercase text-sm font-semibold' color='text-gray-600'>
		{children}
	</TextProvider>
);

const GiftCard = ({ item, onClickGift }) => {
	const { category, imageUrl, name, reserved, reservedDate } = item;

	const giftImageStyleProp = {
		backgroundImage: `url(${imageUrl})`,
		height: '228px',
		borderTopRightRadius: '8px',
		borderTopLeftRadius: '8px',
	};

	return (
		<div className='gift-registry-card' onClick={() => onClickGift(item.id)}>
			<div className='gift-registry-img-container ' style={giftImageStyleProp}></div>
			<div className='p-4 sm:p-5'>
				<div className='flex items-center justify-between'>
					<div className='rounded-full bg-gray-100 px-2'>
						<TextProvider className='text-sm uppercase font-semibold'>{category}</TextProvider>
					</div>
					{reserved ? (
						<div
							className='rounded-full px-2 flex gap-1 items-center justify-center'
							style={{
								background:
									'var(--nude-tint-50, linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), #F1BFBE)',
							}}>
							<TickIcon />
							<TextProvider className='uppercase text-sm font-semibold'>Reserved</TextProvider>
						</div>
					) : null}
				</div>
				<div className='mt-4 text-start'>
					<TextProvider colorStyle='#101828' className='text-lg font-semibold'>
						{name}
					</TextProvider>
				</div>
			</div>
		</div>
	);
};

export const AddGiftContent = ({ handleCancel }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { gift_image_file } = state;
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [link, setLink] = useState('');
	return (
		<div>
			<div className='p-4 sm:p-6 flex flex-col gap-4'>
				<div>
					<InputTitle>Image</InputTitle>
					<ImageUpload
						defaultImgUrl={gift_image_file ? URL.createObjectURL(gift_image_file) : null}
						dispatch={dispatch}
						type='SET_GIFT_IMAGE'
						aspectRatio={1.48}
						key='SET_GIFT_IMAGE'
					/>
				</div>
				<InputFieldProvider
					title='Item Name'
					placeholder='Electric Kettle'
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<InputFieldProvider
					title='Category'
					placeholder='Kitchen'
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				/>
				<InputFieldProvider
					title='Link (Optional)'
					placeholder='https://shopee.com/electrickettle'
					value={link}
					onChange={(event) => setLink(event.target.value)}
				/>
			</div>

			<div className='flex justify-between items-center gap-4 p-5 border-t border-gray-200'>
				<div className='flex gap-2 items-center cursor-pointer'></div>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider width='auto' type='primary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm text-white'>SAVE</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</div>
	);
};

export const EditGiftContent = ({ handleCancel, giftId }) => {
	const [giftState, dispatch] = useReducer(reducer, initialState);
	const { gift_image_file } = giftState;
	const { giftlist } = useUserContext();
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [link, setLink] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [reserved, setReserved] = useState(null);
	//Modal state
	const [deleteModal, setDeleteModal] = useState(false);

	useEffect(() => {
		initiateInput(giftId);
	}, [giftId]);

	function initiateInput(id) {
		if (id) {
			const tempGiftDetails = giftlist?.find((gift) => gift.id === id);

			if (tempGiftDetails) {
				setName(tempGiftDetails.name);
				setCategory(tempGiftDetails.category);
				setLink(tempGiftDetails.link);
				setImageUrl(tempGiftDetails.imageUrl);
				tempGiftDetails?.reserved && setReserved(tempGiftDetails?.reserved);
			}
		}
	}

	return (
		<div>
			<div className='p-4 sm:p-6 flex flex-col gap-4'>
				{reserved && reserved !== '' ? (
					<div
						className='p-4 flex items-center gap-4 border border-gray-100'
						style={{
							background:
								'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
						}}>
						<div>
							<InfoIcon />
						</div>
						<div className='flex flex-col gap-1'>
							<TextProvider colorStyle='#1D4648' className='text-sm font-semibold'>
								These item is already reserved by guests and can't be edited
							</TextProvider>
						</div>
					</div>
				) : null}

				<div>
					<InputTitle>Image</InputTitle>
					<ImageUpload
						defaultImgUrl={imageUrl}
						dispatch={dispatch}
						type='SET_EDIT_GIFT_IMAGE'
						aspectRatio={1.48}
						key='SET_EDIT_GIFT_IMAGE'
						disabled={reserved}
					/>
				</div>
				<InputFieldProvider
					title='Item Name'
					placeholder='Electric Kettle'
					value={name}
					onChange={(event) => setName(event.target.value)}
					disabled={reserved}
				/>
				<InputFieldProvider
					title='Category'
					placeholder='Kitchen'
					value={category}
					onChange={(event) => setCategory(event.target.value)}
					disabled={reserved}
				/>
				<InputFieldProvider
					title='Link (Optional)'
					placeholder='https://shopee.com/electrickettle'
					value={link}
					onChange={(event) => setLink(event.target.value)}
					disabled={reserved}
				/>
			</div>

			<div className='flex justify-between items-center gap-4 p-5 border-t border-gray-200'>
				<div className='flex gap-2 items-center cursor-pointer'>
					<div
						className='flex gap-2 items-center cursor-pointer'
						onClick={() => setDeleteModal(true)}>
						<DeleteIcon />
						<TextProvider className='text-red-700 font-semibold'>REMOVE</TextProvider>
					</div>
				</div>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider width='auto' type='primary' padding='12px 20px' disabled={reserved}>
						<TextProvider className='text-base font-semibold text-sm text-white'>SAVE</TextProvider>
					</ButtonProvider>
				</div>
			</div>
			<ModalConfirmation
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE GIFT</TextProvider>
					</div>
				}
				loading={false}
				isOpen={deleteModal}
				handleConfirm={() => console.log('confirmed!')}
				handleClose={() => setDeleteModal(false)}>
				<TextProvider>
					Are you sure want to remove <b>{name}</b>?
				</TextProvider>
			</ModalConfirmation>
		</div>
	);
};

const AddGiftModal = ({ isOpen, handleClose }) => {
	return (
		<ModalProvider loading={false} isOpen={isOpen} handleClose={handleClose} title='Add Gift'>
			<AddGiftContent handleCancel={handleClose} />
		</ModalProvider>
	);
};

const EditGiftModal = ({ isOpen, handleClose, giftId }) => {
	return (
		<ModalProvider loading={false} isOpen={isOpen} handleClose={handleClose} title='Edit Gift'>
			<EditGiftContent handleCancel={handleClose} giftId={giftId} />
		</ModalProvider>
	);
};

const GiftDetailsModal = ({ isOpen, handleClose, handleEdit, giftId }) => {
	const { giftlist, guestlist } = useUserContext();
	const [giftDetails, setGiftDetails] = useState(null);
	const [guestReserved, setGuestReserved] = useState(null);

	useEffect(() => {
		initiateInput(giftId);
	}, [giftId]);

	function initiateInput(id) {
		if (id) {
			const tempGiftDetails = giftlist?.find((gift) => gift.id === id);

			if (tempGiftDetails) {
				setGiftDetails(tempGiftDetails);

				if (tempGiftDetails.reserved) {
					const guestDetail = guestlist?.find((guest) => guest.id === tempGiftDetails.reserved);

					if (guestDetail) {
						setGuestReserved(guestDetail);
					} else {
						setGuestReserved({ name: 'GUEST REMOVED' });
					}
				}
			}
		} else {
			setGiftDetails(null);
			setGuestReserved(null);
		}
	}

	return (
		<ModalWithEdit
			loading={false}
			isOpen={isOpen}
			handleClose={handleClose}
			handleEdit={handleEdit}
			title='Item Details'>
			<div className='flex flex-col gap-4 p-5 sm:p-6 '>
				<div className='flex flex-row gap-6 flex-wrap'>
					<div className='flex flex-1 items-center justify-center'>
						<img
							src={giftDetails?.imageUrl}
							alt=''
							style={{ maxHeight: '200px', maxWidth: '280px' }}
						/>
					</div>
					<div className='flex flex-col gap-4' style={{ width: '200px' }}>
						{giftDetails?.reserved ? (
							<div
								className='rounded-full px-2 flex gap-1 items-center justify-center w-min'
								style={{
									background:
										'var(--nude-tint-50, linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), #F1BFBE)',
								}}>
								<TickIcon />
								<TextProvider className='uppercase text-sm font-semibold'>Reserved</TextProvider>
							</div>
						) : null}
						<div className='rounded-full bg-gray-100 px-2 w-min'>
							<TextProvider className='text-sm uppercase font-semibold'>
								{giftDetails?.category}
							</TextProvider>
						</div>
						<TextProvider colorStyle='#101828' className='text-lg font-semibold'>
							{giftDetails?.name}
						</TextProvider>
						{giftDetails?.link && giftDetails?.link !== '' ? (
							<a href={giftDetails?.link} target='_blank'>
								<TextProvider colorStyle='#101828' className='text-sm uppercase'>
									Visit Shop
								</TextProvider>
							</a>
						) : null}
					</div>
				</div>
				{guestReserved ? (
					<div
						className='p-4 flex gap-4 border border-gray-100'
						style={{
							background:
								'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
						}}>
						<div>
							<InfoIcon />
						</div>
						<div className='flex flex-col gap-1'>
							<TextProvider colorStyle='#1D4648' className='text-sm font-semibold'>
								This item has been reserved by
							</TextProvider>
							<TextProvider colorStyle='#667085' className='text-sm font-semibold'>
								{guestReserved ? guestReserved?.name : 'GUEST REMOVED'}
							</TextProvider>
						</div>
					</div>
				) : null}
			</div>
		</ModalWithEdit>
	);
};

function GiftRegistry() {
	const { state } = useDigitalInviteContext();
	const { giftlist } = useUserContext();
	const [giftState, dispatch] = useReducer(reducer, initialState);
	const [giftId, setGiftId] = useState(null);
	const [addModal, setAddModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

	const phoneSize = useMediaQuery('(max-width:600px)');

	let navigate = useNavigate();

	const onClickGift = (id) => {
		setGiftId(id);
		setDetailModal(true);
	};

	const onClickEditGift = (id) => {
		if (phoneSize) {
			navigate(`edit/${id}`);
		} else {
			setDetailModal(false);
			setEditModal(true);
		}
	};

	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col pt-24 bg-white sm:bg-transparent'>
			<div className='flex flex-row justify-between gap-2 text-start w-full px-5 mt-3 sm:mt-8'>
				<TextProvider colorStyle='#1D4648' className='text-base font-semibold'>
					Create, manage and track your gift registry
				</TextProvider>
				{!phoneSize && (
					<ButtonProvider
						width='120px'
						padding='8px 16px'
						className='uppercase'
						type='primary'
						onClick={() => setAddModal(true)}>
						<PlusIcon fill='white' width='20px' height='20px' /> Add Item
					</ButtonProvider>
				)}
			</div>
			<div className='mt-8 justify-center flex flex-row gap-8 flex-wrap'>
				{giftlist?.map((item) => (
					<GiftCard key={item.id} item={item} onClickGift={() => onClickGift(item.id)} />
				))}
			</div>
			<FloatingAdd setAddFunc={() => navigate('add')} />

			<AddGiftModal isOpen={addModal} handleClose={() => setAddModal(false)} />
			<GiftDetailsModal
				isOpen={detailModal}
				handleClose={() => setDetailModal(false)}
				handleEdit={() => onClickEditGift(giftId)}
				giftId={giftId}
				key={giftId}
			/>
			<EditGiftModal
				isOpen={editModal}
				handleClose={() => {
					setEditModal(false);
					setDetailModal(true);
				}}
				giftId={giftId}
			/>
		</div>
	);
}

export default GiftRegistry;
