/** @format */

import React, { useState, useEffect } from 'react';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalProviderPreviewInvite from '../../components/atom/ModalProvider/ModalProviderPreviewInvite';
import WholePageLoading from '../../components/atom/loading/WholePageLoading';
//Hook import
import { useUserData, useInviteThemes } from '../../hooks/useFetchAPI';
import { useUserLogic } from '../../hooks/useUserLogic';
import { useSelectTheme } from '../../hooks/usePostAPI';
import { notifySuccess, notifyError } from '../../components/toast/toastprovider';
import './DigitalInvite.scss';

const GeneratePreview = ({ isOpen, handleClose, themeId = 1, themeName = 'Classic' }) => {
	return (
		<ModalProviderPreviewInvite
			isOpen={isOpen}
			handleClose={handleClose}
			title={`${themeName} Preview`}>
			<div className='h-full w-full flex justify-center'>
				<div className='w-full max-w-[400px]'>
					<iframe
						src={`https://invite-majlisku-git-invite-react-query-izzul210-s-team.vercel.app/preview/${themeId}/eEBYP8ZKknVPcN6G601Mv073Kg13`}
						width='100%'
						height='670'></iframe>
				</div>
			</div>
		</ModalProviderPreviewInvite>
	);
};

const ConfirmTheme = ({
	isOpen,
	handleClose,
	themeId = 1,
	themeName = 'Classic',
	img,
	handleUseTemplate = () => {},
}) => {
	useEffect(() => {}, [themeId]);

	return (
		<ModalProviderPreviewInvite
			isOpen={isOpen}
			handleClose={handleClose}
			title={`Choose ${themeName}?`}>
			<div className='h-full w-full flex gap-3 flex-col items-center p-4 justify-center'>
				<img src={img} alt={themeName} className='w-[200px] rounded-md border-2 border-black' />
				<div className='flex gap-4 items-center'>
					<ButtonProvider
						type='primary'
						width={200}
						onClick={() => handleUseTemplate(themeId)}
						className='w-full uppercase'>
						Confirm and Use
					</ButtonProvider>
				</div>
			</div>
		</ModalProviderPreviewInvite>
	);
};

const TemplateTitle = ({ title, category, price }) => {
	if (category === 'free')
		return (
			<div className='flex flex-col mt-2 gap-0'>
				<TextProvider className='text-start font-semibold uppercase text-base'>
					{title}
				</TextProvider>
				<TextProvider
					colorStyle='#98A2B3'
					className='text-start font-semibold uppercase text-[14px]'>
					FREE
				</TextProvider>
			</div>
		);

	if (category === 'premium')
		return (
			<div className='flex flex-col mt-2 gap-0'>
				<TextProvider
					colorStyle='#98A2B3'
					className='text-start flex items-center gap-1 font-semibold uppercase text-[14px]'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'>
						<path
							d='M1.77643 6.39562H15.2784M7.10617 2.13184L5.68491 6.39562L8.52743 14.5679L11.37 6.39562L9.9487 2.13184M8.96417 14.3991L15.3305 6.75957C15.4384 6.6301 15.4923 6.56536 15.5129 6.4931C15.5311 6.42939 15.5311 6.36186 15.5129 6.29815C15.4923 6.22589 15.4384 6.16115 15.3305 6.03168L12.2511 2.33639C12.1884 2.2612 12.1571 2.22361 12.1187 2.19658C12.0846 2.17263 12.0467 2.15485 12.0065 2.14404C11.9611 2.13184 11.9122 2.13184 11.8143 2.13184H5.24055C5.14267 2.13184 5.09373 2.13184 5.04839 2.14404C5.0082 2.15485 4.97023 2.17263 4.93621 2.19658C4.8978 2.22361 4.86647 2.2612 4.80381 2.33639L1.72441 6.03167C1.61651 6.16115 1.56257 6.22588 1.54195 6.29815C1.52378 6.36186 1.52378 6.42939 1.54195 6.4931C1.56257 6.56536 1.61651 6.6301 1.72441 6.75957L8.0907 14.3991C8.24068 14.5791 8.31567 14.6691 8.40546 14.7019C8.48423 14.7307 8.57064 14.7307 8.64941 14.7019C8.7392 14.6691 8.81419 14.5791 8.96417 14.3991Z'
							stroke='#F1BFBE'
							stroke-width='1.27914'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M1.77643 6.39562H15.2784M7.10617 2.13184L5.68491 6.39562L8.52743 14.5679L11.37 6.39562L9.9487 2.13184M8.96417 14.3991L15.3305 6.75957C15.4384 6.6301 15.4923 6.56536 15.5129 6.4931C15.5311 6.42939 15.5311 6.36186 15.5129 6.29815C15.4923 6.22589 15.4384 6.16115 15.3305 6.03168L12.2511 2.33639C12.1884 2.2612 12.1571 2.22361 12.1187 2.19658C12.0846 2.17263 12.0467 2.15485 12.0065 2.14404C11.9611 2.13184 11.9122 2.13184 11.8143 2.13184H5.24055C5.14267 2.13184 5.09373 2.13184 5.04839 2.14404C5.0082 2.15485 4.97023 2.17263 4.93621 2.19658C4.8978 2.22361 4.86647 2.2612 4.80381 2.33639L1.72441 6.03167C1.61651 6.16115 1.56257 6.22588 1.54195 6.29815C1.52378 6.36186 1.52378 6.42939 1.54195 6.4931C1.56257 6.56536 1.61651 6.6301 1.72441 6.75957L8.0907 14.3991C8.24068 14.5791 8.31567 14.6691 8.40546 14.7019C8.48423 14.7307 8.57064 14.7307 8.64941 14.7019C8.7392 14.6691 8.81419 14.5791 8.96417 14.3991Z'
							stroke='black'
							stroke-opacity='0.15'
							stroke-width='1.27914'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					PREMIUM
				</TextProvider>
				<TextProvider className='text-start font-semibold uppercase text-base'>
					{title}
				</TextProvider>
				<TextProvider
					colorStyle='#98A2B3'
					className='text-start font-semibold uppercase text-[14px]'>
					RM{price}
				</TextProvider>
			</div>
		);
};

const TemplateCard = ({
	title,
	id,
	img,
	category,
	price,
	active = false,
	handleUseTemplate,
	handlePreview,
	handleChooseTheme,
}) => {
	const styleProp = active
		? { border: '2px solid rgba(0,0,0,0.5)', backgroundImage: `url(${img})`, opacity: 0.7 }
		: { backgroundImage: `url(${img})` };

	return (
		<div className='template-card-container '>
			<div className='template-card' style={styleProp}>
				{active ? (
					<div className='h-full flex flex-col gap-2 justify-center px-4'>
						<div className='text-center bg-white p-4'>
							<TextProvider className='text-sm font-semibold uppercase' colorStyle='#1D4648'>
								Your Current Template
							</TextProvider>
						</div>
					</div>
				) : (
					<div className='template-buttons h-full flex flex-col gap-2 justify-center px-4'>
						<ButtonProvider
							type='primary'
							className='uppercase'
							onClick={() => handleChooseTheme(id, title, img)}>
							Use Template
						</ButtonProvider>
						<ButtonProvider className='uppercase' onClick={() => handlePreview(id, title, img)}>
							Preview
						</ButtonProvider>
					</div>
				)}
			</div>
			<TemplateTitle title={title} category={category} price={price} />
		</div>
	);
};

function Template() {
	const { data: userInfo } = useUserData();
	const { sanitizeOldTheme } = useUserLogic();
	const { selectTheme } = useSelectTheme();
	const [previewModal, setPreviewModal] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [previewDetails, setPreviewDetails] = useState({
		id: 0,
		title: 'Classic',
		img: '',
	});
	const [loading, setLoading] = useState(false);
	const { data: themes } = useInviteThemes();

	//Extract design template from user
	const designNum = userInfo?.design_num
		? userInfo?.design_num
		: userInfo?.type
		? userInfo?.type
		: null;
	let design = sanitizeOldTheme(designNum);

	const checkUserDesign = (id) => {
		if (design === id) {
			return true;
		} else return false;
	};

	const handlePreview = (id, title, img) => {
		setPreviewDetails({
			id,
			title,
			img,
		});
		setPreviewModal(true);
	};

	const handleChooseTheme = (id, title, img) => {
		setPreviewDetails({
			id,
			title,
			img,
		});
		setConfirmModal(true);
	};

	const handleUseTemplate = async (id) => {
		setLoading(true);
		try {
			await selectTheme.mutateAsync({ id: id });
			setConfirmModal(false);
			setLoading(false);
			notifySuccess('Successfully saved!');
		} catch (err) {
			console.log(err);
			notifyError(err.message);
			setLoading(false);
		}
	};

	return (
		<>
			<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col pt-24 bg-white sm:bg-transparent'>
				<WholePageLoading loading={loading} text='Saving your theme of choice..' />
				<div className='flex flex-col gap-2 text-start w-full px-5 mt-3 sm:mt-8'>
					<TextProvider colorStyle='#1D4648' className='text-[20px] sm:text-[24px] font-semibold'>
						Select theme
					</TextProvider>
					<TextProvider colorStyle='#667085' className='text-[16px] font-semibold'>
						Beautiful themes to get you inspired. You can change it anytime
					</TextProvider>
				</div>
				<div className='mt-12 justify-center flex flex-row gap-8 flex-wrap'>
					{themes?.map((item) => (
						<TemplateCard
							key={item.id}
							title={item.title}
							id={item.design_id}
							img={item.img}
							category={item.premium ? 'Premium' : 'Free'}
							price={item.price}
							active={checkUserDesign(item.design_id)}
							handleUseTemplate={handleUseTemplate}
							handlePreview={handlePreview}
							handleChooseTheme={handleChooseTheme}
						/>
					))}
				</div>
			</div>
			<GeneratePreview
				themeId={previewDetails?.id}
				themeName={previewDetails?.title}
				isOpen={previewModal}
				handleClose={() => setPreviewModal(false)}
			/>
			<ConfirmTheme
				isOpen={confirmModal}
				handleClose={() => setConfirmModal(false)}
				themeId={previewDetails?.id}
				themeName={previewDetails?.title}
				img={previewDetails?.img}
				handleUseTemplate={handleUseTemplate}
			/>
		</>
	);
}

export default Template;
