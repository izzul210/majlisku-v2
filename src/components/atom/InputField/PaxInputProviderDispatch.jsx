/** @format */

import React from 'react';
import { PlusIcon, MinusIcon } from '../../icons/actionIcons';
import TextProvider from '../TextProvider/TextProvider';

const PaxButton = ({ children, ...props }) => {
	return (
		<div
			className='border-gray-300 w-8 h-8 rounded-full border flex justify-center items-center cursor-pointer'
			{...props}>
			{children}
		</div>
	);
};

function PaxInputProviderDispatch({ pax, dispatch, type }) {
	const handleIncrement = () => {
		dispatch({ type, payload: pax + 1 });
	};

	const handleDecrement = () => {
		if (pax > 1) {
			dispatch({ type, payload: pax - 1 });
		}
	};

	return (
		<div className='w-auto flex justify-between items-center'>
			<PaxButton onClick={handleDecrement}>
				<MinusIcon />
			</PaxButton>
			<TextProvider className='flex gap-2 items-center w-8 justify-center font-semibold'>
				{pax}
			</TextProvider>

			<PaxButton onClick={handleIncrement}>
				<PlusIcon />
			</PaxButton>
		</div>
	);
}

export default PaxInputProviderDispatch;
