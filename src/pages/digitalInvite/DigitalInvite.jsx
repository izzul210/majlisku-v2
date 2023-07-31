/** @format */

import React from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
import { useRsvp } from '../../hooks/useRsvp';
//Page import
import Setting from './Setting';
import Content from './Content';
import Template from './Template';
//Component import
import DigitalInviteTabs from '../../components/atom/TabsProvider/DigitalInviteTabs';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import './DigitalInvite.scss';
//MUI import
import AppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
//Icons import
import { BackIcon, PreviewIcon } from '../../components/icons/actionIcons';

const DigitalInviteTopBar = () => {
	const phoneSize = useMediaQuery('(max-width:600px)');
	const { inviteState, state } = useDigitalInviteContext();
	const { updateUserRsvp, isPending } = useRsvp();

	let navigate = useNavigate();

	const handleSavePublish = () => {
		updateUserRsvp(inviteState, () => {
			console.log('Done!');
		});
	};

	return (
		<AppBar
			position='fixed'
			sx={{
				display: { xs: 'block', sm: 'block' },
				width: '100vw',
				padding: '0px',
				backgroundColor: 'white',
				boxShadow:
					'0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
			}}>
			<div>
				<div className='flex justify-between items-center p-4 sm:px-6'>
					{phoneSize ? (
						<div className='flex py-4 px-0 sm:px-2 items-center gap-3'>
							<Link to='/'>
								<BackIcon />
							</Link>
						</div>
					) : (
						<div className='flex py-4 px-0 sm:px-2'>
							<Link to='/'>
								<TextProvider
									fontFamily='lora'
									className='uppercase font-bold'
									color='text-gray-400'>
									Majlisku
								</TextProvider>
							</Link>

							<TextProvider fontFamily='lora' className='uppercase font-bold' color='text-gray-800'>
								/ Digital Invite
							</TextProvider>
						</div>
					)}

					<div className='flex items-center gap-2'>
						<ButtonProvider padding='12px 20px' onClick={() => navigate('/invite-preview')}>
							<PreviewIcon />
							{!phoneSize && <TextProvider className='uppercase'>Preview</TextProvider>}
						</ButtonProvider>
						<ButtonProvider
							disabled={isPending}
							padding='12px 20px'
							type='primary'
							onClick={handleSavePublish}>
							<TextProvider color='text-white' className='uppercase'>
								{isPending ? 'Saving...' : 'Save & Publish'}
							</TextProvider>
						</ButtonProvider>
					</div>
				</div>
				<div className='flex justify-center w-full'>
					<DigitalInviteTabs />
				</div>
			</div>
		</AppBar>
	);
};

function DigitalInvite() {
	const { inviteState, state } = useDigitalInviteContext();
	const { dispatch, dispatchInvite } = useDigitalInviteDispatchContext();

	return (
		<div className='digital-invite-container'>
			<DigitalInviteTopBar />
			<Routes>
				<Route exact path='/' element={<Setting />} />
				<Route exact path='/content' element={<Content />} />
				<Route exact path='/template' element={<Template />} />
			</Routes>
		</div>
	);
}

export default DigitalInvite;
