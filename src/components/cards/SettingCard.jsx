/** @format */

import React, { useEffect, useState } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DropDownSettingIcon, CollapseIcon } from '../icons/actionIcons';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import './Cards.scss';
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';

const ArrowForwardIosSharpIcon = () => <div>Arrow</div>;

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: '1px solid #e6e6e6',
	borderRadius: '8px',
	// border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordianPhone = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	// border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	borderRadius: '8px',
	backgroundColor: 'rgba(255, 255, 255, 255)',
	flexDirection: 'row',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: 0,
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: '0px 0px 26px 0px',
	borderTop: '1px solid rgba(0, 0, 0, .125)',
	'@media (max-width: 600px)': {
		borderTop: 'none',
	},
}));

function SettingCard(props) {
	const { stepNum = null, cardTitle = 'General', children } = props;
	const { state } = useDigitalInviteContext();
	const { accordiansCollapsed } = state;
	const [expanded, setExpanded] = useState(true);

	const phoneSize = useMediaQuery('(max-width:600px)');

	useEffect(() => {
		setExpanded(!accordiansCollapsed);
	}, [accordiansCollapsed]);

	const handleChange = () => {
		setExpanded(!expanded);
	};

	return (
		<div className='setting-card box-border w-full border-b sm:border-none'>
			{phoneSize ? (
				<AccordianPhone expanded={expanded} defaultExpanded={true} onChange={handleChange}>
					<AccordionSummary
						expandIcon={<DropDownSettingIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
						styles={phoneSize ? { background: 'black' } : null}>
						<div className='p-4 px-2 flex gap-3 items-center w-full'>
							{stepNum && (
								<div className='settingCard-number w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center'>
									<TextProvider className='font-bold text-lg'>{stepNum}</TextProvider>
								</div>
							)}

							<TextProvider className='settingCard-title uppercase font-bold text-lg'>
								{cardTitle}
							</TextProvider>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className='settingCard-content'>{children}</div>
					</AccordionDetails>
				</AccordianPhone>
			) : (
				<Accordion expanded={expanded} defaultExpanded={true} onChange={handleChange}>
					<AccordionSummary
						expandIcon={<DropDownSettingIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
						styles={phoneSize ? { background: 'black' } : null}>
						<div className='py-4 px-2 flex gap-3 items-center'>
							{stepNum && (
								<div className='settingCard-number w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center'>
									<TextProvider className='font-bold text-lg'>{stepNum}</TextProvider>
								</div>
							)}
							<TextProvider className='settingCard-title uppercase font-bold text-lg'>
								{cardTitle}
							</TextProvider>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className='settingCard-content'>{children}</div>
					</AccordionDetails>
				</Accordion>
			)}
		</div>
	);
}

export default SettingCard;
