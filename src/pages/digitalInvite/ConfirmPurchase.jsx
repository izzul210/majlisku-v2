/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Context import
import { useUserContext } from '../../context/UserContext';
//Hooks import
import { useInviteThemes } from '../../hooks/useFetchAPI';
import { usePurchaseTheme } from '../../hooks/usePostAPI';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';

const BackButton = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<path
			d='M7.13095 5.68945L8.19159 6.75009L3.69173 11.25H23.25V12.75H3.69187L8.19159 17.2497L7.13095 18.3104L0.820406 11.9999L7.13095 5.68945Z'
			fill='#1E1E1E'
		/>
	</svg>
);

const PremiumIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
		<path
			d='M2.27741 6.39562H15.7794M7.60715 2.13184L6.18588 6.39562L9.02841 14.5679L11.8709 6.39562L10.4497 2.13184M9.46515 14.3991L15.8314 6.75957C15.9393 6.6301 15.9933 6.56536 16.0139 6.4931C16.0321 6.42939 16.0321 6.36186 16.0139 6.29815C15.9933 6.22589 15.9393 6.16115 15.8314 6.03168L12.752 2.33639C12.6894 2.2612 12.658 2.22361 12.6196 2.19658C12.5856 2.17263 12.5476 2.15485 12.5075 2.14404C12.4621 2.13184 12.4132 2.13184 12.3153 2.13184H5.74153C5.64365 2.13184 5.59471 2.13184 5.54936 2.14404C5.50918 2.15485 5.47121 2.17263 5.43718 2.19658C5.39878 2.22361 5.36745 2.2612 5.30479 2.33639L2.22539 6.03167C2.11749 6.16115 2.06354 6.22588 2.04293 6.29815C2.02475 6.36186 2.02475 6.42939 2.04293 6.4931C2.06354 6.56536 2.11749 6.6301 2.22539 6.75957L8.59167 14.3991C8.74166 14.5791 8.81665 14.6691 8.90643 14.7019C8.9852 14.7307 9.07162 14.7307 9.15039 14.7019C9.24017 14.6691 9.31516 14.5791 9.46515 14.3991Z'
			stroke='#F1BFBE'
			stroke-width='1.27914'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
		<path
			d='M2.27741 6.39562H15.7794M7.60715 2.13184L6.18588 6.39562L9.02841 14.5679L11.8709 6.39562L10.4497 2.13184M9.46515 14.3991L15.8314 6.75957C15.9393 6.6301 15.9933 6.56536 16.0139 6.4931C16.0321 6.42939 16.0321 6.36186 16.0139 6.29815C15.9933 6.22589 15.9393 6.16115 15.8314 6.03168L12.752 2.33639C12.6894 2.2612 12.658 2.22361 12.6196 2.19658C12.5856 2.17263 12.5476 2.15485 12.5075 2.14404C12.4621 2.13184 12.4132 2.13184 12.3153 2.13184H5.74153C5.64365 2.13184 5.59471 2.13184 5.54936 2.14404C5.50918 2.15485 5.47121 2.17263 5.43718 2.19658C5.39878 2.22361 5.36745 2.2612 5.30479 2.33639L2.22539 6.03167C2.11749 6.16115 2.06354 6.22588 2.04293 6.29815C2.02475 6.36186 2.02475 6.42939 2.04293 6.4931C2.06354 6.56536 2.11749 6.6301 2.22539 6.75957L8.59167 14.3991C8.74166 14.5791 8.81665 14.6691 8.90643 14.7019C8.9852 14.7307 9.07162 14.7307 9.15039 14.7019C9.24017 14.6691 9.31516 14.5791 9.46515 14.3991Z'
			stroke='black'
			stroke-opacity='0.15'
			stroke-width='1.27914'
			stroke-linecap='round'
			stroke-linejoin='round'
		/>
	</svg>
);

const convertString = (str) => {
	return str.replace(/ /g, '_');
};

function ConfirmPurchase() {
	const { design_details } = useUserContext();
	const { purchaseTheme } = usePurchaseTheme();
	const { data: themes } = useInviteThemes();

	const [themeName, setThemeName] = useState('');
	const [price, setPrice] = useState(0);
	const [img, setImg] = useState('');

	let navigate = useNavigate();

	useEffect(() => {
		if (design_details) {
			const themesDetail = themes?.find((theme) => theme.design_id === design_details.id);
			setThemeName(themesDetail?.title || '');
			setPrice(themesDetail?.price || 0);
			setImg(themesDetail?.img || '');
		}
	}, [design_details, themes]);

	const handlePostPurchaseTheme = async () => {
		await purchaseTheme.mutateAsync({
			themeId: design_details.id,
			themeName: convertString(themeName),
			price: price * 100,
		});
	};

	return (
		<div className='min-h-screen p-6 w-full flex justify-center items-start bg-[#F9FAFB]'>
			<div className='w-full max-w-[1200px]'>
				<div className='w-full gap-6 flex items-center'>
					<div onClick={() => navigate('/digitalinvite')} className='cursor-pointer bg-transparent'>
						<BackButton />
					</div>
					<TextProvider className='text-start sm:text-center mt-1 w-full uppercase font-semibold text-[20px]'>
						Confirm Purchase
					</TextProvider>
				</div>
				<div className='w-full flex flex-col items-center justify-center'>
					<div className='w-full max-w-[600px]'>
						<div className='flex flex-col sm:flex-row items-start gap-12 mt-4 sm:mt-16'>
							<div className='w-full flex justify-center'>
								<img src={img} alt='theme' className='w-[225px] h-[410px] shadow-xl' />
							</div>
							<div className='bg-white h-auto w-full py-6 rounded-lg shadow flex flex-col gap-4'>
								<TextProvider className='px-6 text-[18px] text-start border-b pb-4 uppercase font-semibold'>
									Order Summary
								</TextProvider>
								<div className='px-6 py-4 flex flex-col gap-6'>
									<div className='text-start'>
										<TextProvider
											className='text-[14px] flex items-center gap-1 uppercase'
											colorStyle='#F1BFBE'>
											<PremiumIcon /> Premium
										</TextProvider>
										<TextProvider className='text-[16px] font-semibold uppercase'>
											{themeName}
										</TextProvider>
									</div>
									<div className='flex flex-col gap-1'>
										<div className='flex justify-between items-center'>
											<TextProvider
												className='text-[14px] uppercase font-semibold'
												colorStyle='#98A2B3'>
												Price
											</TextProvider>
											<TextProvider
												className='text-[14px] uppercase font-semibold'
												colorStyle='#98A2B3'>
												RM {price}.00
											</TextProvider>
										</div>
										<div className='flex justify-between items-center'>
											<TextProvider className='text-[18px] uppercase font-semibold'>
												Total
											</TextProvider>
											<TextProvider className='text-[18px] uppercase font-semibold'>
												RM {price}.00
											</TextProvider>
										</div>
									</div>
									<ButtonProvider
										onClick={() => handlePostPurchaseTheme()}
										type='primary'
										className='uppercase'>
										Proceed to payment
									</ButtonProvider>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmPurchase;
