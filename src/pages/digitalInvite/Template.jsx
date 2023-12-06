/** @format */

import React, { useState, useEffect } from 'react';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalProviderPreviewInvite from '../../components/atom/ModalProvider/ModalProviderPreviewInvite';
//Context import
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
import { useUserContext } from '../../context/UserContext';
//Styling import
import design_0 from '../../assets/images/design_0.png';
import design_1 from '../../assets/images/design_1.png';
import design_2 from '../../assets/images/design_2.png';
import design_5 from '../../assets/images/design_5.png';
import design_6 from '../../assets/images/design_6.png';
import design_7 from '../../assets/images/design_7.png';
import design_20 from '../../assets/images/design_20.png';
import design_21 from '../../assets/images/design_21.png';
import design_22 from '../../assets/images/design_22.png';
import design_23 from '../../assets/images/design_23.png';
import design_24 from '../../assets/images/design_24.png';
import design_25 from '../../assets/images/design_25.png';
import design_26 from '../../assets/images/design_26.png';
import design_27 from '../../assets/images/design_27.png';
import './DigitalInvite.scss';

const designArrays = [
	{
		title: 'Classic',
		category: 'free',
		price: 0,
		id: 2,
		img: design_2,
	},
	{
		title: 'Modern Simplicity',
		category: 'free',
		price: 0,
		id: 1,
		img: design_1,
	},
	{
		title: 'Minimal Chic',
		category: 'free',
		price: 0,
		id: 0,
		img: design_0,
	},

	{
		title: 'Sacred Symmetry',
		category: 'premium',
		price: 79,
		id: 5,
		img: design_5,
	},
	{
		title: 'Majestic Mosaic',
		category: 'premium',
		price: 79,
		id: 6,
		img: design_6,
	},
	{
		title: 'Ethnic Radiance',
		category: 'premium',
		price: 79,
		id: 7,
		img: design_7,
	},
	{
		title: 'Celestial Elegance 01',
		category: 'premium',
		price: 79,
		id: 20,
		img: design_20,
	},
	{
		title: 'Celestial Elegance 02',
		category: 'premium',
		price: 79,
		id: 25,
		img: design_25,
	},
	{
		title: 'Celestial Elegance 03',
		category: 'premium',
		price: 79,
		id: 27,
		img: design_27,
	},
	{
		title: 'Celestial Elegance 04',
		category: 'premium',
		price: 79,
		id: 26,
		img: design_26,
	},
	{
		title: 'Celestial Elegance 05',
		category: 'premium',
		price: 79,
		id: 21,
		img: design_21,
	},
	{
		title: 'Celestial Elegance 06',
		category: 'premium',
		price: 79,
		id: 22,
		img: design_22,
	},
	{
		title: 'Celestial Elegance 07',
		category: 'premium',
		price: 79,
		id: 23,
		img: design_23,
	},
	{
		title: 'Celestial Elegance 08',
		category: 'premium',
		price: 79,
		id: 24,
		img: design_24,
	},
];

const GeneratePreview = ({ isOpen, handleClose, themeId = 1, themeName = 'Classic' }) => {
	const { userData } = useUserContext();

	return (
		<ModalProviderPreviewInvite
			isOpen={isOpen}
			handleClose={handleClose}
			title={`${themeName} Preview`}>
			<div className='h-full w-full flex justify-center'>
				<div className='w-full max-w-[400px]'>
					<iframe
						src={`https://invite-majlisku-git-invite-react-query-izzul210-s-team.vercel.app/preview/${themeId}/${userData.userId}`}
						width='100%'
						height='670'></iframe>
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
}) => {
	const styleProp = active
		? { border: '2px solid rgba(0,0,0,0.5)', backgroundImage: `url(${img})` }
		: { backgroundImage: `url(${img})` };

	return (
		<div className='template-card-container'>
			<div className='template-card ' style={styleProp}>
				{active ? (
					<div className='template-buttons h-full flex flex-col gap-2 justify-center px-4'>
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
							onClick={() => handleUseTemplate(id)}>
							Use Template
						</ButtonProvider>
						<ButtonProvider className='uppercase' onClick={() => handlePreview(id, title)}>
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
	const { state } = useDigitalInviteContext();
	const { dispatch } = useDigitalInviteDispatchContext();
	const { design } = state;
	const [previewModal, setPreviewModal] = useState(false);
	const [previewDetails, setPreviewDetails] = useState({
		id: 0,
		title: 'Classic',
	});

	const checkUserDesign = (id) => {
		if (design === id) {
			return true;
		} else return false;
	};

	const handlePreview = (id, title) => {
		setPreviewDetails({
			id,
			title,
		});
		setPreviewModal(true);
	};

	const handleUseTemplate = (id) => {
		dispatch({ type: 'SET_DESIGN', payload: id });
	};

	return (
		<>
			<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col pt-24 bg-white sm:bg-transparent'>
				<div className='flex flex-col gap-2 text-start w-full px-5 mt-3 sm:mt-8'>
					<TextProvider colorStyle='#1D4648' className='text-[20px] sm:text-[24px] font-semibold'>
						Select theme
					</TextProvider>
					<TextProvider colorStyle='#667085' className='text-[16px] font-semibold'>
						Beautiful themes to get you inspired. You can change it anytime
					</TextProvider>
				</div>
				<div className='mt-12 justify-center flex flex-row gap-8 flex-wrap'>
					{designArrays.map((item) => (
						<TemplateCard
							key={item.id}
							title={item.title}
							id={item.id}
							img={item.img}
							category={item.category}
							price={item.price}
							active={checkUserDesign(item.id)}
							handleUseTemplate={handleUseTemplate}
							handlePreview={handlePreview}
						/>
					))}
				</div>
			</div>
			<GeneratePreview
				themeId={previewDetails.id}
				themeName={previewDetails.title}
				isOpen={previewModal}
				handleClose={() => setPreviewModal(false)}
			/>
		</>
	);
}

export default Template;
