/** @format */
import React from 'react';
import './Cards.scss';
//Icons import
import { GoToIcon } from '../icons/actionIcons';

export const DashboardCardProvider = ({ children, navigate = false }) => {
	const className = navigate
		? 'dashboard-card-container flex justify-between flex-1 gap-10 cursor-pointer'
		: 'dashboard-card-container flex justify-between flex-1';

	return (
		<div className={className}>
			<div>{children}</div>
			{navigate ? (
				<div className='flex items-center'>
					<GoToIcon />
				</div>
			) : null}
		</div>
	);
};

export const DashboardCardProvider2 = ({ children }) => {
	const className = 'dashboard-card-container';

	return (
		<div className={className}>
			<div>{children}</div>
		</div>
	);
};
