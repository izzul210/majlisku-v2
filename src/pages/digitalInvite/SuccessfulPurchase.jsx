/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';

const SuccessIcon = () => (
	<div className='bg-[#F1BFBE] rounded-full w-6 h-6 flex justify-center items-center'>
		<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
			<path
				d='M16.6673 5L7.50065 14.1667L3.33398 10'
				stroke='white'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	</div>
);

function SuccessfulPurchase() {
	let navigate = useNavigate();

	return (
		<div className='min-h-screen p-6 w-full flex justify-center items-center bg-[#F9FAFB]'>
			<div className='bg-white h-auto w-full max-w-[440px] p-6 rounded-lg shadow flex flex-col gap-4'>
				<div className='flex flex-col items-center py-4 gap-4'>
					<SuccessIcon />
					<TextProvider className='text-[24px] text-center font-semibold'>
						Thank you! Your purchase was successful!
					</TextProvider>
				</div>
				<TextProvider className='text-[16px] font-semibold'>
					You can easily switch theme whenever you want
				</TextProvider>

				<div className='py-4 flex flex-col gap-6'>
					<ButtonProvider
						onClick={() => navigate('/digitalinvite/share')}
						type='primary'
						className='uppercase'>
						Continue
					</ButtonProvider>
				</div>
				<TextProvider className='text-[14px]' colorStyle='#667085'>
					Thank you for supporting our small business!
				</TextProvider>
			</div>
		</div>
	);
}

export default SuccessfulPurchase;
