/** @format */

import React, { useEffect, useState } from 'react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { DropDownSettingIcon } from '../icons/actionIcons';
import InviteTextProvider from './InviteTextProvider';

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	borderBottom: '1px solid #D0D5DD',
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordianNoBorder = styled(Accordion)(({ theme }) => ({
	border: 'none',
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<></>} {...props} />)(
	({ theme }) => ({
		borderRadius: '0px',

		backgroundColor: 'rgba(255, 255, 255, 255)',
		padding: '0px',
		flexDirection: 'row',
		'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
			transform: 'rotate(180deg)',
		},
		'& .MuiAccordionSummary-content': {
			marginLeft: 0,
		},
	})
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: '0px',
	borderTop: 'none',
	'@media (max-width: 600px)': {
		borderTop: 'none',
	},
}));

function InviteAccordian(props) {
	const { title = 'Accordian', children, noBorder = false } = props;
	const [expanded, setExpanded] = useState(true);

	const handleChange = () => {
		setExpanded(!expanded);
	};

	if (!noBorder) {
		return (
			<Accordion expanded={expanded} defaultExpanded={true} onChange={handleChange}>
				<AccordionSummary
					expandIcon={<DropDownSettingIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<div className='py-2 px-0 flex gap-3 items-center'>
						<InviteTextProvider className='uppercase font-medium text-lg'>
							{title}
						</InviteTextProvider>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div className='settingCard-content'>{children}</div>
				</AccordionDetails>
			</Accordion>
		);
	} else {
		return (
			<AccordianNoBorder expanded={expanded} defaultExpanded={true} onChange={handleChange}>
				<AccordionSummary
					expandIcon={<DropDownSettingIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<div className='py-2 px-0 flex gap-3 items-center'>
						<InviteTextProvider className='uppercase font-medium text-lg'>
							{title}
						</InviteTextProvider>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div className='settingCard-content'>{children}</div>
				</AccordionDetails>
			</AccordianNoBorder>
		);
	}
}

export default InviteAccordian;
