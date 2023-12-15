/** @format */

import React from 'react';
import './Button.scss';

function FloatingToTopButton({ onClickToTop = () => {} }) {
	return (
		<div className='floatingToTopButton' onClick={onClickToTop}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'>
				<path
					d='M10 15.8334V4.16675'
					stroke='#1D4648'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M4.1665 10.0001L9.99984 4.16675L15.8332 10.0001'
					stroke='#1D4648'
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</div>
	);
}

export default FloatingToTopButton;
