/** @format */

import React from 'react';
import './ButtonProvider.scss';

function LoadingButtonProvider({
	children,
	button = false,
	padding = '13px 8px',
	width = '100%',
	type = 'default',
	...props
}) {
	const buttonClassName = `button-style ${type}-button`;

	return (
		<button
			className={buttonClassName}
			disabled
			style={{ padding, width, opacity: 0.5 }}
			{...props}>
			<div
				class='inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]'
				role='status'>
				<span class='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
					Loading...
				</span>
			</div>
			{children}
		</button>
	);
}

export default LoadingButtonProvider;
