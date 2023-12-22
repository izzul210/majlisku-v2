/** @format */

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
//Page import
import Setting from './Setting';
import Template from './Template';
import GiftRegistry from './GiftRegistry';
import ShareInvite from './ShareInvite';
import GuestWishes from './GuestWishes';
//Component import
import DigitalInviteTabs from '../../components/atom/TabsProvider/DigitalInviteTabs';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalProviderPreviewInvite from '../../components/atom/ModalProvider/ModalProviderPreviewInvite';
import WholePageLoading from '../../components/atom/loading/WholePageLoading';
import './DigitalInvite.scss';
//MUI import
import AppBar from '@mui/material/AppBar';
import useMediaQuery from '@mui/material/useMediaQuery';
//Icons import
import { BackIcon, PreviewIcon } from '../../components/icons/actionIcons';
//Hooks & Context Logic
import {
	useDigitalInviteContext,
	useDigitalInviteDispatchContext,
} from '../../context/DigitalInviteContext';
import { useUserContext } from '../../context/UserContext';
import { useUserData } from '../../hooks/useFetchAPI';
import { useUserLogic, hasUserPurchaseThisTheme } from '../../hooks/useUserLogic';
import { notifySuccess, notifyError } from '../../components/toast/toastprovider';
import { usePostRsvp, usePurchaseTheme } from '../../hooks/usePostAPI';

const GeneratePreview = ({ iframeKey, isOpen, handleClose }) => {
	const { design_details } = useUserContext() || { id: 0 };
	const { data: userData } = useUserData();

	return (
		<ModalProviderPreviewInvite
			isOpen={isOpen}
			handleClose={handleClose}
			title='Digital Invite Preview'>
			<div className='h-full w-full flex justify-center'>
				<div className='w-full max-w-[400px]'>
					<iframe
						key={iframeKey}
						src={`https://invite-majlisku-git-invite-react-query-izzul210-s-team.vercel.app/preview/${design_details?.id}/${userData?.userId}`}
						width='100%'
						height='670'></iframe>
				</div>
			</div>
		</ModalProviderPreviewInvite>
	);
};

/******* TOP BUTTONS FOR THEME PAGE */
const ThemeTopBar = () => {
	let navigate = useNavigate();
	const { checkIfUserHasSelectedTheme } = useUserLogic();

	if (checkIfUserHasSelectedTheme()) {
		return (
			<div className='flex'>
				<ButtonProvider
					button
					padding='12px 20px'
					type='primary'
					onClick={() => {
						navigate('/digitalinvite');
					}}>
					<TextProvider color='text-white' className='uppercase'>
						Next: Details
					</TextProvider>
				</ButtonProvider>
			</div>
		);
	} else return null;
};

/******* TOP BUTTONS FOR DETAILS PAGE */
const DetailsButtons = () => {
	const { handleSubmit, inviteState } = useDigitalInviteContext();
	const { design_details } = useUserContext();
	const { savePreviewDetails, saveRsvpDetails } = usePostRsvp();
	const { purchaseTheme } = usePurchaseTheme();
	const { dispatch } = useDigitalInviteDispatchContext();
	const [previewModal, setPreviewModal] = useState(false);
	const phoneSize = useMediaQuery('(max-width:600px)');
	const [loading, setLoading] = useState(false);
	const [iframeKey, setIframeKey] = useState(0);
	let navigate = useNavigate();

	const handlePreview = () => {
		setPreviewModal(true);
	};

	const themePurchased = hasUserPurchaseThisTheme(design_details.id);

	const onSaveAsPreview = async (formValues) => {
		setLoading(true);
		try {
			await savePreviewDetails.mutateAsync({
				...formValues,
				...inviteState,
			});
			notifySuccess('Saved as preview');
			handlePreview();
			setIframeKey((prevKey) => prevKey + 1);
			setLoading(false);
		} catch (error) {
			console.log('error:', error);
			notifyError(error);
			setLoading(false);
		}
	};

	const handlePostPurchaseTheme = async () => {
		try {
			await purchaseTheme.mutateAsync({ id: design_details.id });
			notifySuccess('Successfully purchased the theme!');
			navigate('share');
		} catch (error) {
			console.log('error:', error);
			notifyError(error);
		}
	};

	const onSubmit = async (formValues) => {
		setLoading(true);
		try {
			await saveRsvpDetails.mutateAsync({
				...formValues,
				...inviteState,
			});
			if (themePurchased) {
				notifySuccess('Saved & Publish!');
				navigate('share');
			} else {
				handlePostPurchaseTheme();
			}

			setLoading(false);
		} catch (error) {
			console.log('error:', error);
			notifyError(error);
			setLoading(false);
		}
	};

	const onError = (error) => {
		console.log('error:', error);
		dispatch({ type: 'SET_ACCORDIANS_COLLAPSE', payload: false });
		notifyError('Please fill all required fields');
	};

	return (
		<>
			<WholePageLoading loading={loading} text='Saving....' />
			<div className='flex items-center gap-2'>
				<ButtonProvider button padding='12px 20px' onClick={handleSubmit(onSaveAsPreview, onError)}>
					<PreviewIcon />
					{!phoneSize && <TextProvider className='uppercase'>Preview</TextProvider>}
				</ButtonProvider>
				<ButtonProvider
					button
					padding='12px 20px'
					type='primary'
					onClick={handleSubmit(onSubmit, onError)}>
					<TextProvider color='text-white' className='uppercase'>
						Save & Publish
					</TextProvider>
				</ButtonProvider>
			</div>
			<GeneratePreview
				iframeKey={iframeKey}
				isOpen={previewModal}
				handleClose={() => setPreviewModal(false)}
			/>
		</>
	);
};

const RenderTopButtons = () => {
	const location = useLocation();

	if (location.pathname === '/digitalinvite') {
		return <DetailsButtons />;
	} else if (location.pathname === '/digitalinvite/template') {
		return <ThemeTopBar />;
	}
	return null;
};

const PremiumThemeAlert = () => {
	const { design_details } = useUserContext();

	if (hasUserPurchaseThisTheme(design_details.id)) {
		return null;
	}

	return (
		<div
			className='w-full py-3 px-4 flex items-start gap-2 justify-center'
			style={{
				background:
					'var(--Yellow-Tint-25, linear-gradient(0deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 100%), #FFDE81)',
			}}>
			<div className='w-[16px]'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'>
					<path
						d='M1.66636 6H14.333M6.66636 2L5.33302 6L7.99969 13.6667L10.6664 6L9.33302 2M8.40941 13.5083L14.3818 6.34143C14.4831 6.21997 14.5337 6.15924 14.553 6.09144C14.5701 6.03167 14.5701 5.96833 14.553 5.90856C14.5337 5.84076 14.4831 5.78003 14.3818 5.65857L11.4929 2.1919C11.4342 2.12136 11.4048 2.08609 11.3687 2.06074C11.3368 2.03827 11.3012 2.02159 11.2635 2.01145C11.221 2 11.175 2 11.0832 2H4.91616C4.82434 2 4.77843 2 4.73588 2.01145C4.69819 2.02159 4.66257 2.03827 4.63064 2.06074C4.59461 2.08609 4.56522 2.12136 4.50644 2.1919L1.61755 5.65857C1.51633 5.78003 1.46572 5.84076 1.44638 5.90855C1.42933 5.96832 1.42933 6.03167 1.44638 6.09144C1.46572 6.15924 1.51633 6.21997 1.61755 6.34143L7.58997 13.5083C7.73068 13.6772 7.80103 13.7616 7.88526 13.7924C7.95916 13.8194 8.04023 13.8194 8.11412 13.7924C8.19835 13.7616 8.26871 13.6772 8.40941 13.5083Z'
						stroke='#1D4648'
						stroke-width='1.5'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
			</div>

			<TextProvider className='text-start font-semibold text-[14px]'>
				You're customizing a Premium theme. After clicking 'Save and Publish,' you'll proceed to
				payment
			</TextProvider>
		</div>
	);
};

const DigitalInviteTopBar = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();
	const phoneSize = useMediaQuery('(max-width:600px)');
	const [modal, setModal] = useState(false);

	return (
		<>
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

								<TextProvider
									fontFamily='lora'
									className='uppercase font-bold'
									color='text-gray-800'>
									/ Digital Invite
								</TextProvider>
							</div>
						)}
						<RenderTopButtons />
					</div>
					<div className='flex justify-center w-full border-t border-gray-200'>
						<DigitalInviteTabs />
					</div>
					<PremiumThemeAlert />
				</div>
			</AppBar>
			<PremiumThemeAlert />
		</>
	);
};

function DigitalInvite() {
	return (
		<div className='digital-invite-container'>
			<DigitalInviteTopBar />
			<Routes>
				<Route exact path='/' element={<Setting />} />
				<Route exact path='/template' element={<Template />} />
				<Route exact path='/gift' element={<GiftRegistry />} />
				<Route exact path='/wishes' element={<GuestWishes />} />
				<Route exact path='/share' element={<ShareInvite />} />
			</Routes>
		</div>
	);
}

export default DigitalInvite;
