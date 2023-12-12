/** @format */

import React, { useState } from 'react';
import moment from 'moment';
//API
import { useGuestwishes } from '../../hooks/useFetchAPI';
import { usePostGuestWishes } from '../../hooks/usePostAPI';
//MUI
import { useMediaQuery } from '@mui/material';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';

const HideInInvite = (props) => (
	<div className='flex gap-2 items-center cursor-pointer' {...props}>
		<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
			<path
				d='M0.833252 9.99967C0.833252 9.99967 4.16658 3.33301 9.99992 3.33301C15.8333 3.33301 19.1666 9.99967 19.1666 9.99967C19.1666 9.99967 15.8333 16.6663 9.99992 16.6663C4.16658 16.6663 0.833252 9.99967 0.833252 9.99967Z'
				stroke='#667085'
				stroke-width='1.5'
				stroke-linecap='square'
				stroke-linejoin='round'
			/>
			<path
				d='M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z'
				stroke='#667085'
				stroke-width='1.5'
				stroke-linecap='square'
				stroke-linejoin='round'
			/>
		</svg>
		<TextProvider colorStyle='#667085' className='uppercase text-[14px] font-semibold'>
			Hide In Invite
		</TextProvider>
	</div>
);

const ShowInInvite = (props) => (
	<div className='flex gap-2 items-center cursor-pointer' {...props}>
		<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
			<g clip-path='url(#clip0_2411_19866)'>
				<path
					d='M11.7666 11.7664C11.5377 12.012 11.2617 12.209 10.955 12.3456C10.6484 12.4823 10.3173 12.5557 9.98166 12.5617C9.64598 12.5676 9.31255 12.5058 9.00126 12.3801C8.68997 12.2544 8.40719 12.0672 8.16979 11.8298C7.93239 11.5924 7.74525 11.3096 7.61951 10.9984C7.49377 10.6871 7.43202 10.3536 7.43795 10.018C7.44387 9.68228 7.51734 9.35123 7.65398 9.04457C7.79062 8.7379 7.98763 8.4619 8.23325 8.23303M14.9499 14.9497C13.5254 16.0355 11.7908 16.6371 9.99992 16.6664C4.16658 16.6664 0.833252 9.99969 0.833252 9.99969C1.86983 8.06794 3.30753 6.3802 5.04992 5.0497L14.9499 14.9497ZM8.24992 3.53303C8.82353 3.39876 9.4108 3.33164 9.99992 3.33303C15.8333 3.33303 19.1666 9.99969 19.1666 9.99969C18.6607 10.946 18.0575 11.837 17.3666 12.658L8.24992 3.53303Z'
					stroke='#667085'
					stroke-width='1.5'
					stroke-linecap='square'
					stroke-linejoin='round'
				/>
				<path
					d='M0.833252 0.833008L19.1666 19.1663'
					stroke='#667085'
					stroke-width='1.5'
					stroke-linecap='square'
					stroke-linejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_2411_19866'>
					<rect width='20' height='20' fill='white' />
				</clipPath>
			</defs>
		</svg>
		<TextProvider colorStyle='#667085' className='uppercase text-[14px] font-semibold'>
			Show In Invite
		</TextProvider>
	</div>
);

const WishCard = ({ item }) => {
	const { hideWishInInvite, showWishInInvite } = usePostGuestWishes();
	const { name, wish, date, hideWish, from } = item;
	const [hide, setHide] = useState(hideWish || false);

	const handleHideWish = async () => {
		try {
			await hideWishInInvite.mutateAsync({ from, id: item.id });
			setHide(true);
		} catch (err) {
			console.log(err);
		}
	};

	const handleShowWish = async () => {
		try {
			await showWishInInvite.mutateAsync({ from, id: item.id });
			setHide(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='bg-white h-full flex flex-col gap-2 w-full max-w-[343px] p-5 rounded-[8px] border'>
			<div className={`flex flex-col gap-2 ${hide ? 'opacity-30' : ''}`}>
				<div className='flex align-center justify-between'>
					<TextProvider colorStyle='#1D4648' className='text-[16px] text-start font-semibold'>
						{name}
					</TextProvider>
					<TextProvider
						colorStyle='#98A2B3'
						className='text-[14px] w-[100px] text-end font-semibold'>
						{moment(date).fromNow(true)} ago
					</TextProvider>
				</div>
				<TextProvider colorStyle='#475467' className='text-[14px] text-start'>
					{wish}
				</TextProvider>
			</div>
			<div className='border-t flex items-center px-2  pt-3 justify-end'>
				{hide ? (
					<ShowInInvite onClick={() => handleShowWish()} />
				) : (
					<HideInInvite onClick={() => handleHideWish()} />
				)}
			</div>
		</div>
	);
};

function GuestWishes() {
	const { data: wishes } = useGuestwishes();

	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col pt-24 bg-white sm:bg-transparent'>
			<div className='flex flex-row justify-between gap-2 text-start w-full px-5 mt-3 sm:mt-8'>
				<TextProvider colorStyle='#1D4648' className='text-[24px] font-semibold'>
					Guest wishes
				</TextProvider>
			</div>
			<div className='mt-8 justify-center flex flex-row gap-4 flex-wrap'>
				{wishes?.map((guest) => (
					<WishCard key={guest.id} item={guest} />
				))}
			</div>
		</div>
	);
}

export default GuestWishes;
