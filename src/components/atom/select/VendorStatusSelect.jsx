/** @format */

import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import TextProvider from '../TextProvider/TextProvider';
import CardLoadingState from '../loading/CardLoadingState';
import { FinalizedIcon, ShortlistedIcon, DepositedIcon, PaidIcon } from '../../icons/brandIcons';
//Hooks import
import { useVendor } from '../../../hooks/useVendor';
import './Select.scss';
const DropDownIcon = () => (
	<svg width='16' height='7' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M0.710051 1.71L3.30005 4.3C3.69005 4.69 4.32005 4.69 4.71005 4.3L7.30005 1.71C7.93005 1.08 7.48005 0 6.59005 0H1.41005C0.520051 0 0.0800515 1.08 0.710051 1.71Z'
			fill='#1D4648'
		/>
	</svg>
);

export default function StatusDropdown({ vendorStatus, vendorId }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [status, setStatus] = useState(vendorStatus);
	const { updateVendorDetails, isPending } = useVendor();

	useEffect(() => {
		setStatus(vendorStatus);
	}, [vendorId]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const statusCard = {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		padding: '10px 5px',
		cursor: 'pointer',
		fontSize: '14px',
	};

	const renderStatus = (status, display) => {
		const clickStatus = () => {
			if (!display) {
				updateVendorDetails({ status: status }, vendorId, () => {
					setStatus(status);
					handleClose();
				});
			}
		};

		if (status === 'shortlisted') {
			return (
				<div style={statusCard} onClick={() => clickStatus('shortlisted')}>
					<ShortlistedIcon width='14px' height='18px' />
					<TextProvider className='font-semibold text-base'>SHORTLISTED</TextProvider>
				</div>
			);
		}
		if (status === 'finalized') {
			return (
				<div style={statusCard} onClick={() => clickStatus('finalized')}>
					<FinalizedIcon width='14px' height='18px' />
					<TextProvider className='font-semibold text-base'>FINALIZED</TextProvider>
				</div>
			);
		}

		if (status === 'deposited') {
			return (
				<div style={statusCard} onClick={() => clickStatus('deposited')}>
					<DepositedIcon width='16.8px' height='16.8px' />
					<TextProvider className='font-semibold text-base'>DEPOSITED</TextProvider>
				</div>
			);
		}

		if (status === 'paid') {
			return (
				<div style={statusCard} onClick={() => clickStatus('paid')}>
					<PaidIcon width='16.8px' height='16.8px' />
					<TextProvider className='font-semibold text-base'>PAID</TextProvider>
				</div>
			);
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div style={{ width: '200px' }}>
			<div className='selectInput' onClick={handleClick} style={{ padding: '0px 7px' }}>
				<div className='inputOption'>{renderStatus(status, true)}</div>
				<DropDownIcon />
			</div>
			<Popover
				slotProps={{
					paper: {
						style: {
							borderRadius: 15,
							width: '190px',
							background: 'rgba(255, 255, 255, 1)',
							boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
							padding: '8px',
							marginTop: '7px',
							height: 'auto',
						},
					},
				}}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}>
				<CardLoadingState loadingState={isPending} />
				<div className='selectOptions'>
					{/**** Shortlisted */}
					{renderStatus('shortlisted', false)}
					{/**** Finalized */}
					{renderStatus('finalized', false)}
					{/**** Deposited */}
					{renderStatus('deposited', false)}
					{/**** Paid */}
					{renderStatus('paid', false)}
				</div>
			</Popover>
		</div>
	);
}
