/** @format */

import React from 'react';
import './TextProvider.scss';

function TextProvider({ children, fontFamily = 'sansPro', color = 'text-gray-900', className }) {
	/*
    fontFamily = sansPro, lora, poppins
    */

	return <div className={`${fontFamily} ${color} ${className}`}>{children}</div>;
}

export default TextProvider;
