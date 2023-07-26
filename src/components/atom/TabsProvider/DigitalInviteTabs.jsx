/** @format */

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import './TabsProvider.scss';

const GrayScaleWarmBlack = '#1D4648';
const NeutralGrey400 = '#98A2B3';

const StyledTabs = styled((props) => (
	<Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan ' /> }} />
))({
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	'& .MuiTabs-indicatorSpan': {
		width: '88%',
		backgroundColor: GrayScaleWarmBlack,
	},
	'& .MuiTabs-scroller': {
		overflow: 'hidden',
		'@media (max-width: 600px)': {
			overflow: 'scroll !important',
		},
	},
});

const StyledTab = styled((props) => (
	<div className='flex items-center'>
		<Tab disableRipple {...props} />
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

export default function DigitalInviteTabs() {
	const [value, setValue] = React.useState('setting');
	const location = useLocation();
	let navigate = useNavigate();

	const phoneSize = useMediaQuery('(max-width:600px)');

	useEffect(() => {
		console.log('location', location.pathname);
	}, [location]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		// if (newValue === 'openInvites') {
		// 	navigate('open');
		// } else {
		// 	navigate('');
		// }
	};

	return (
		<Box sx={{ width: phoneSize ? '100%' : 'auto' }}>
			<Box sx={{ bgcolor: 'none' }}>
				<StyledTabs value={value} onChange={handleChange} aria-label='styled tabs example'>
					<StyledTab label='SETTING' value='setting' />
					<StyledTab label='TEMPLATE' value='template' />
					<StyledTab label='CONTENT' value='content' />
					<StyledTab label='GIFT' value='gift' />
					<StyledTab label='SHARE' value='share' />
				</StyledTabs>
			</Box>
		</Box>
	);
}
