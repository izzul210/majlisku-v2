/** @format */

import React from 'react';
import './ButtonProvider.scss';

function ButtonProvider({
	children,
	button = false,
	padding = '13px 8px',
	width = '100%',
	type = 'default',
	height = 'auto',
	disabled = false,
	noBorder = false,
	className,
	...props
}) {
	const buttonClassName = `button-style ${type}-button ${
		!noBorder ? 'border border-gray-300' : ''
	}`;

	if (button) {
		return (
			<button
				className={buttonClassName}
				style={{ padding, width, height, opacity: disabled ? 0.5 : 1 }}
				{...props}>
				{children}
			</button>
		);
	} else {
		return (
			<div
				className={`${buttonClassName} ${className}`}
				style={{ padding, width, height, opacity: disabled ? 0.5 : 1 }}
				{...props}>
				{children}
			</div>
		);
	}
}

export default ButtonProvider;
