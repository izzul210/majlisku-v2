/** @format */

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './TabsProvider.scss';
//Context import
import {
	useGuestlistContext,
	useGuestlistDispatchContext,
} from '../../../context/GuestlistContext';

const GrayScaleWarmBlack = '#1D4648';
const NeutralGrey400 = '#98A2B3';

const StyledTabs = styled((props) => (
	<Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	'& .MuiTabs-indicatorSpan': {
		width: '95%',
		backgroundColor: GrayScaleWarmBlack,
	},
});

const StyledTab = styled((props) => (
	<div className='flex items-center'>
		<Tab disableRipple {...props} />
		{props.openinvitetotal ? (
			<div
				style={{ fontFamily: 'Source Sans 3, sans-serif' }}
				className='text-black text-sm bg-red-300 w-6 h-6 flex items-center justify-center rounded-full'>
				{props.openinvitetotal}
			</div>
		) : null}
	</div>
))(({ theme }) => ({
	textTransform: 'none',
	fontWeight: 600,
	fontSize: theme.typography.pxToRem(16),
	color: NeutralGrey400,
	'&.Mui-selected': {
		color: GrayScaleWarmBlack,
	},
	'&.Mui-focusVisible': {
		backgroundColor: 'rgba(100, 95, 228, 0.32)',
	},
}));

export default function CustomizedTabs() {
	const { activeTab, openInviteTotal } = useGuestlistContext();
	const guestDispatch = useGuestlistDispatchContext();
	const [value, setValue] = React.useState('myGuestlist');
	const location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/guestlist') {
			setValue('myGuestlist');
		} else if (location.pathname === '/guestlist/open') {
			setValue('openInvites');
		}
	}, [location]);

	const handleChange = (event, newValue) => {
		// setValue(newValue);
		if (newValue === 'openInvites') {
			navigate('open');
		} else {
			navigate('');
		}

		guestDispatch({ type: 'SET_ACTIVE_TAB', payload: newValue });
	};

	return (
		<Box sx={{ width: '100%', marginTop: '16px' }}>
			<Box sx={{ bgcolor: 'none' }}>
				<StyledTabs value={value} onChange={handleChange} aria-label='styled tabs example'>
					<StyledTab label='MY GUESTLIST' value='myGuestlist' />
					<StyledTab label='OPEN INVITES' value='openInvites' openinvitetotal={openInviteTotal} />
				</StyledTabs>
			</Box>
		</Box>
	);
}
