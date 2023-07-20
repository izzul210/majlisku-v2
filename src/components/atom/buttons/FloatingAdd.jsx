/** @format */

import React from 'react';
import './Button.scss';

function FloatingAdd({ setAddFunc = () => {} }) {
	return (
		<div className='floatingAddButton' onClick={() => setAddFunc(true)}>
			<svg
				width='20'
				height='20'
				viewBox='0 0 15 15'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M14.5 8.375H8.5V14.375H6.5V8.375H0.5V6.375H6.5V0.375H8.5V6.375H14.5V8.375Z'
					fill='white'
				/>
			</svg>
		</div>
	);
}

export default FloatingAdd;
