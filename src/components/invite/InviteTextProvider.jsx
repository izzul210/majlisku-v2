/** @format */
import React from 'react';
import './InviteComponent.scss';

function InviteTextProvider({ children, fontFamily = 'ebGaramond', color = '#1D4648', className }) {
	/*
    fontFamily = sansPro, lora, poppins
    */

	return (
		<div className={`${fontFamily} ${className}`} style={{ color: color }}>
			{children}
		</div>
	);
}

export default InviteTextProvider;
