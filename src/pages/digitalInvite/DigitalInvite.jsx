/** @format */

import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
	useDigitalInviteInputErrorContext,
} from '../../context/DigitalInviteContext';
import { useUserContext } from '../../context/UserContext';
import { useRsvp } from '../../hooks/useRsvp';
//Page import
import Setting from './Setting';
import Content from './Content';
import Template from './Template';
import GiftRegistry from './GiftRegistry';
import ShareInvite from './ShareInvite';
//Component import
import DigitalInviteTabs from '../../components/atom/TabsProvider/DigitalInviteTabs';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalProvider from '../../components/atom/ModalProvider/ModalProvider2';
import './DigitalInvite.scss';
//MUI import
import AppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
//Icons import
import { BackIcon, PreviewIcon } from '../../components/icons/actionIcons';

const cloudApi = import.meta.env.VITE_APP_API_KEY;

const GenerateInviteLink = ({ isOpen, handleClose }) => {
	const [inviteId, setInviteId] = useState('');
	const [approved, setApproved] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { addInviteId, isPending } = useRsvp();

	function hasSpecialChars(str) {
		const specialChars = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/;
		return specialChars.test(str);
	}

	function checkInviteIdAvailability() {
		setLoading(true);
		setError(null);

		if (inviteId?.split(' ').length > 1) {
			setLoading(false);
			setError('✗ URL cannot have a space');
		} else if (hasSpecialChars(inviteId)) {
			setLoading(false);
			setError('✗ URL cannot have special characters');
		} else {
			axios.get(`${cloudApi}/checkinviteid/${inviteId.toLowerCase()}`).then((response) => {
				setLoading(false);
				if (response.data === 0) {
					setApproved(inviteId);
				} else {
					setApproved(false);
					setError('✗ URL not available, please try a different one.');
				}
			});
		}
	}

	function saveInviteId() {
		addInviteId(inviteId, () => {
			handleClose();
		});
	}

	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose} title='Generate Invite Link'>
			<div className='p-4 sm:p-6'>
				<TextProvider className='uppercase font-semibold'>Generate Unique Url*</TextProvider>
				<div className='flex border border-gray-300 rounded-lg'>
					<TextProvider className='text-gray-400 p-3 border-r'>invite.majlisku.app/</TextProvider>
					<input
						type='text'
						value={inviteId}
						onChange={(e) => setInviteId(e.target.value)}
						placeholder='Enter url'
						className=' rounded-lg w-full p-3 appearance-none'
					/>
				</div>
				{error && (
					<TextProvider colorStyle='#D83232' className='text-sm mt-1'>
						{error}
					</TextProvider>
				)}
				{approved === inviteId && (
					<TextProvider colorStyle='#419E6A' className='text-sm mt-1'>
						✓ URL available ! Click Save
					</TextProvider>
				)}
				<TextProvider className='text-gray-400 py-2 text-sm'>
					Create a distinctive and memorable URL. If not specified, random URL will be used as
					default
				</TextProvider>
				{approved === inviteId ? (
					<ButtonProvider
						disabled={isPending}
						className='uppercase mt-3'
						width='86px'
						type='primary'
						onClick={() => saveInviteId()}>
						{isPending ? 'Saving...' : 'Save'}
					</ButtonProvider>
				) : (
					<ButtonProvider
						disabled={loading}
						className='uppercase mt-3'
						width='136px'
						type='primary'
						onClick={() => checkInviteIdAvailability()}>
						{loading ? 'Checking...' : 'Generate URL'}
					</ButtonProvider>
				)}
			</div>
		</ModalProvider>
	);
};

const DigitalInviteTopBar = () => {
	const phoneSize = useMediaQuery('(max-width:600px)');
	const { inviteState, state } = useDigitalInviteContext();
	const { scrollEventTitle1, checkForInputError } = useDigitalInviteInputErrorContext();
	const [modal, setModal] = useState(false);
	const { updateUserRsvp, isPending } = useRsvp();
	const { userData } = useUserContext();

	let navigate = useNavigate();

	const handlePreview = () => {
		if (checkForInputError()) {
			navigate('/invite-preview');
		} else {
			console.log('Fix those errors!');
		}
	};

	const handleSavePublish = () => {
		//checkForInputError returns true if no errors
		if (checkForInputError()) {
			if (userData?.inviteId) {
				updateUserRsvp(inviteState, () => {
					console.log('Done!');
				});
			} else {
				setModal(true);
			}
		} else {
			console.log('inviteState', inviteState);
		}
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
						<ButtonProvider padding='12px 20px' onClick={handlePreview}>
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

			<GenerateInviteLink isOpen={modal} handleClose={() => setModal(false)} />
		</AppBar>
	);
};

function DigitalInvite() {
	return (
		<div className='digital-invite-container'>
			<DigitalInviteTopBar />
			<Routes>
				<Route exact path='/' element={<Setting />} />
				<Route exact path='/content' element={<Content />} />
				<Route exact path='/template' element={<Template />} />
				<Route exact path='/gift' element={<GiftRegistry />} />
				<Route exact path='/share' element={<ShareInvite />} />
			</Routes>
		</div>
	);
}

export default DigitalInvite;
