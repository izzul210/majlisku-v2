/** @format */

import React, { useState, useEffect } from 'react';
//Component import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
//Context import
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
//Styling import
import design_0 from '../../assets/images/design_0.png';
import design_1 from '../../assets/images/design_1.png';
import design_2 from '../../assets/images/design_2.png';
import './DigitalInvite.scss';

const designArrays = [
	{
		title: 'Majlisku Wedding',
		id: 0,
		img: design_0,
	},
	{
		title: 'Minimalist 1',
		id: 1,
		img: design_1,
	},
	{
		title: 'Minimalist 2',
		id: 2,
		img: design_2,
	},
];

const TemplateCard = ({ title, id, img, active = false, handleUseTemplate }) => {
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
						<ButtonProvider className='uppercase'>Preview</ButtonProvider>
					</div>
				)}
			</div>
			<TextProvider className='mt-4 font-semibold uppercase text-base'>{title}</TextProvider>
		</div>
	);
};

function Template() {
	const { state } = useDigitalInviteContext();
	const { dispatch } = useDigitalInviteDispatchContext();
	const { design } = state;

	const checkUserDesign = (id) => {
		if (design === id) {
			return true;
		} else return false;
	};

	const handleUseTemplate = (id) => {
		dispatch({ type: 'SET_DESIGN', payload: id });
	};

	return (
		<div className='w-full gap-2 sm:gap-5 px-0 pb-6 sm:px-4 h-full flex flex-col pt-24 bg-white sm:bg-transparent'>
			<div className='flex flex-col gap-2 text-start w-full px-5 mt-3 sm:mt-8'>
				<TextProvider colorStyle='#1D4648' className='text-base font-semibold'>
					Choose an invitation design
				</TextProvider>
				<TextProvider colorStyle='#667085' className='text-sm font-normal'>
					Beautiful and customizable template to get you inspired
				</TextProvider>
			</div>
			<div className='mt-12 justify-center flex flex-row gap-8 flex-wrap'>
				{designArrays.map((item) => (
					<TemplateCard
						key={item.id}
						title={item.title}
						id={item.id}
						img={item.img}
						active={checkUserDesign(item.id)}
						handleUseTemplate={handleUseTemplate}
					/>
				))}
			</div>
		</div>
	);
}

export default Template;
