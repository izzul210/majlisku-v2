/** @format */

import React from 'react';
import './TextProvider.scss';

function TextProvider({
	children,
	fontFamily = 'sansPro',
	color = 'text-gray-900',
	colorStyle,
	className,
}) {
	/*
    fontFamily = sansPro, lora, poppins
    */

	return colorStyle ? (
		<div className={`${fontFamily} ${className}`} style={{ color: colorStyle }}>
			{children}
		</div>
	) : (
		<div className={`${fontFamily} ${color} ${className}`}>{children}</div>
	);
}

export default TextProvider;
