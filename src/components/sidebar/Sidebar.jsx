/** @format */

import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
//MUI Stuff
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
//Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
//Component import
import ModalProvider from '../atom/ModalProvider/ModalProvider';
import ModalProvider2 from '../atom/ModalProvider/ModalProvider2';
import TextProvider from '../atom/TextProvider/TextProvider';
import ButtonProvider from '../atom/ButtonProvider/ButtonProvider';
import NotificationBox from './NotificationBox';
import useScrollTrigger from '@mui/material/useScrollTrigger';
//Auth import
import { useLogout } from '../../hooks/useAuth';
//Context import
import { useUserContext, useUserDispatchContext } from '../../context/UserContext';
//Icons import
import {
	ChecklistActive,
	GuestActive,
	HomeActive,
	RsvpActive,
	ChecklistDefault,
	FeedbackDefault,
	GuestDefault,
	HomeDefault,
	RsvpDefault,
	GiftRegistryIcon,
} from './sidebaricons';
import { MajliskuWithText, MajliskuIcon } from '../icons/brandIcons';
import { HelpIcon, RSVPIcon } from '../icons/generalIcons';
import {
	CollapseIcon,
	LogoutIcon,
	HamburgerIcon,
	TipsIcon,
	NotificationIcon,
	PreviewIcon,
} from '../icons/actionIcons';
//Assets import
import TipsImage1 from '../../assets/images/tips-img-1.png';
import TipsImage2 from '../../assets/images/tips-img-2.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//Constants
const WIDTH_WEB_DRAWER = 241;
const WIDTH_TAB_DRAWER = 96;
const ICON_WIDTH_WEB = 26;
const ICON_HEIGHT_WEB = 26;
const ICON_WIDTH_PHONE = 20;
const ICON_HEIGHT_PHONE = 20;

const checkForActiveTabIcon = (path, activeTab) => {
	if (activeTab === path) {
		return 'sidebar-navigate active';
	} else return 'sidebar-navigate normal';
};

const checkForActiveTabText = (path, activeTab) => {
	if (activeTab === path) {
		return 'sidebar-navigate-text-active';
	} else return 'sidebar-navigate-text';
};

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	const elevatedChildren = React.cloneElement(children, {
		style: {
			boxShadow: trigger ? '0px 0px 20px rgba(0, 0, 0, 0.2)' : 'none',
		},
	});
	return elevatedChildren;
}

const WebSideBar = ({ activeTab = '', handleLogout }) => {
	const { userInfo, userPhotoURL } = useUserContext();

	return (
		<>
			<div className='sidebar-container'>
				<div className='sidebar-main'>
					<div className='sidebar-top'>
						<MajliskuWithText fill='rgba(252, 252, 253, 1)' />
						<CollapseIcon />
					</div>
					<div className='sidebar-navigation-container'>
						<Link to='/' className={checkForActiveTabIcon('', activeTab)}>
							{activeTab === '' ? (
								<HomeActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							) : (
								<HomeDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							)}
							<div className={checkForActiveTabText('', activeTab)}>Home</div>
						</Link>
						<Link to='/guestlist' className={checkForActiveTabIcon('guestlist', activeTab)}>
							{activeTab === 'guestlist' ? (
								<GuestActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							) : (
								<GuestDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							)}
							<div className={checkForActiveTabText('guestlist', activeTab)}>Guestlist</div>
						</Link>
						<Link to='/digitalinvite' className={checkForActiveTabIcon('digitalinvite', activeTab)}>
							{activeTab === 'digitalinvite' ? (
								<RsvpActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							) : (
								<RsvpDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							)}
							<div className={checkForActiveTabText('digitalinvite', activeTab)}>
								Digital Invite
							</div>
						</Link>
						<Link to='/' className={checkForActiveTabIcon('gift', activeTab)}>
							{activeTab === 'gift' ? (
								<GiftRegistryIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							) : (
								<GiftRegistryIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							)}
							<div className={checkForActiveTabText('gift', activeTab)}>Gift Registry</div>
						</Link>
						<Link
							to='/'
							className={activeTab === '' ? 'sidebar-navigate active' : 'sidebar-navigate normal'}>
							{activeTab === '' ? (
								<ChecklistActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							) : (
								<ChecklistDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
							)}
							<div className='sidebar-navigate-text'>Planner</div>
						</Link>
					</div>
				</div>
				<div className='sidebar-bottom'>
					<div className='sidebar-user-profile'>
						<img src={userPhotoURL} alt='user' />
						<div className='sidebar-user-profile-name'>{userInfo?.displayName?.split(' ')[0]}</div>
					</div>
					<Link
						to='/'
						className={activeTab === '' ? 'sidebar-navigate active' : 'sidebar-navigate normal'}>
						{activeTab === '' ? (
							<FeedbackDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<FeedbackDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
						<div className='sidebar-navigate-text'>Feedback</div>
					</Link>
					<div className='sidebar-navigate cursor-pointer active' onClick={() => handleLogout()}>
						{activeTab === '' ? (
							<LogoutIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<LogoutIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
						<div className='sidebar-navigate-text'>Logout</div>
					</div>
				</div>
			</div>
		</>
	);
};

const TabletSideBar = ({ activeTab = '', handleLogout }) => {
	const { userPhotoURL } = useUserContext();

	return (
		<div className='sidebar-container'>
			<div className='sidebar-main'>
				<div className='sidebar-top'>
					<MajliskuIcon fill='rgba(252, 252, 253, 1)' />
				</div>
				<div className='sidebar-navigation-container'>
					<Link to='/' className={checkForActiveTabIcon('', activeTab)}>
						{activeTab === '' ? (
							<HomeActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<HomeDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
					</Link>
					<Link to='/guestlist' className={checkForActiveTabIcon('guestlist', activeTab)}>
						{activeTab === 'guestlist' ? (
							<GuestActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<GuestDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
					</Link>
					<Link to='/digitalinvite' className={checkForActiveTabIcon('digitalinvite', activeTab)}>
						{activeTab === 'digitalinvite' ? (
							<RsvpActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<RsvpDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
					</Link>
					<Link to='/' className={checkForActiveTabIcon('gift', activeTab)}>
						{activeTab === 'gift' ? (
							<GiftRegistryIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<GiftRegistryIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
					</Link>
					<Link
						to='/'
						className={activeTab === '' ? 'sidebar-navigate active' : 'sidebar-navigate normal'}>
						{activeTab === '' ? (
							<ChecklistActive width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						) : (
							<ChecklistDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
						)}
					</Link>
				</div>
			</div>
			<div className='sidebar-bottom'>
				<div className='sidebar-user-profile'>
					<img src={userPhotoURL} alt='user' />
				</div>
				<Link
					to='/'
					className={activeTab === '' ? 'sidebar-navigate active' : 'sidebar-navigate normal'}>
					{activeTab === '' ? (
						<FeedbackDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
					) : (
						<FeedbackDefault width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
					)}
				</Link>
				<div className='sidebar-navigate cursor-pointer active' onClick={() => handleLogout()}>
					{activeTab === '' ? (
						<LogoutIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
					) : (
						<LogoutIcon width={ICON_WIDTH_WEB} height={ICON_HEIGHT_WEB} />
					)}
				</div>
			</div>
		</div>
	);
};

const PhoneAppBar = ({ handleDrawerToggle, activeTab = '', subTab = '' }) => {
	const { userPhotoURL } = useUserContext();
	const [tipsModal, setTipsModal] = useState(false);

	const circleButtonStyle =
		'w-10 h-10 rounded-full border flex justify-center items-center bg-white cursor-pointer';

	const boxShadowStyle = { boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)' };

	switch (activeTab) {
		case 'guestlist':
			return (
				<div className='phone-app-bar-container'>
					<div onClick={handleDrawerToggle}>
						<HamburgerIcon />
					</div>
					<div className='flex justify-end gap-1'>
						<div
							className={circleButtonStyle}
							style={boxShadowStyle}
							onClick={() => setTipsModal(true)}>
							<TipsIcon width={19} height={19} />
						</div>
						<NotificationBox />
					</div>
					<TipsModal isOpen={tipsModal} handleClose={() => setTipsModal(false)} />
				</div>
			);
		case 'digitalinvite':
			return (
				<div className='phone-app-bar-container'>
					<div onClick={handleDrawerToggle}>
						<HamburgerIcon />
					</div>
					<div className='flex justify-end gap-1'>
						<div
							className={circleButtonStyle}
							style={boxShadowStyle}
							onClick={() => setTipsModal(true)}>
							<TipsIcon width={19} height={19} />
						</div>
						<NotificationBox />
					</div>
					<TipsModal isOpen={tipsModal} handleClose={() => setTipsModal(false)} />
				</div>
			);
		default:
			return (
				<div className='phone-app-bar-container'>
					<div onClick={handleDrawerToggle}>
						<HamburgerIcon />
					</div>
					<div className='flex justify-end gap-2'>
						<NotificationBox />
						<div className='phone-app-bar-user-profile'>
							<img src={userPhotoURL} alt='user' />
						</div>
					</div>
					<TipsModal isOpen={tipsModal} handleClose={() => setTipsModal(false)} />
				</div>
			);
	}
};

const TipsModal = ({ isOpen, handleClose }) => {
	let navigation = useNavigate();
	const { userData } = useUserContext();

	const notDigitalInviteResponse = () => {
		alert('Please create a digital invite first!');
	};

	const handlePreview = () => {
		if (!userData?.eventDetails) {
			notDigitalInviteResponse();
		}
	};

	const handleCopy = () => {
		if (!userData?.eventDetails) {
			notDigitalInviteResponse();
		} else {
			const value = `https://invite.majlisku.app/${userData?.inviteId}`;
			navigator.clipboard.writeText(value).then(() => {
				alert(`Invitation link copied!`);
			});
		}
	};

	const Tip1 = () => (
		<div className='pb-4'>
			<img src={TipsImage1} alt='tips' />
			<div className='p-5 sm:p-6'>
				<TextProvider className='font-semibold'>
					Send personalized link so your guest doesn't have to fill in their details!
				</TextProvider>
				<div className='mt-2 flex flex-col gap-1'>
					<TextProvider>1. Click guest's name</TextProvider>
					<TextProvider>2. Generate unique link</TextProvider>
					<TextProvider>3. Share to your guest</TextProvider>
				</div>
				<div className='flex justify-center sm:justify-end mt-3'>
					<ButtonProvider
						width={200}
						height={40}
						onClick={() => {
							navigation('/digitalinvite');
							handleClose();
						}}>
						<RSVPIcon />
						<TextProvider className='font-semibold uppercase'>Edit E-Invite</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</div>
	);

	const Tip2 = () => (
		<div className='pb-4'>
			<img src={TipsImage2} alt='tips' />
			<div className='p-5 sm:p-6'>
				<TextProvider className='font-semibold'>Send open invite to make it merrier!</TextProvider>
				<div className='mt-2 flex flex-col gap-1'>
					<TextProvider>1. Share invitation link</TextProvider>
					<TextProvider>2. Import RSVP'd guests into My Guestlist</TextProvider>
				</div>
				<div className='flex flex-col sm:flex-row justify-center mt-3 gap-2'>
					<div className='flex gap-2 flex-1'>
						<ButtonProvider
							onClick={() => {
								navigation('/digitalinvite');
								handleClose();
							}}>
							<RSVPIcon />
							<TextProvider className='font-semibold uppercase'>Edit E-Invite</TextProvider>
						</ButtonProvider>
						<ButtonProvider disabled={!userData?.eventDetails} onClick={handlePreview}>
							<PreviewIcon />
							<TextProvider className='font-semibold uppercase'>Preview</TextProvider>
						</ButtonProvider>
					</div>
					<div className='flex-2' style={{ minWidth: '180px' }} onClick={handleCopy}>
						<ButtonProvider type='primary' disabled={!userData?.eventDetails}>
							<TextProvider className='font-semibold uppercase text-white'>Copy Link</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<ModalProvider2
			title={
				<div className='flex gap-2 items-center'>
					<HelpIcon /> Tips
				</div>
			}
			isOpen={isOpen}
			handleClose={handleClose}>
			<div className='pb-3'>
				<Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
					<SwiperSlide>
						<Tip1 />
					</SwiperSlide>
					<SwiperSlide>
						<Tip2 />
					</SwiperSlide>
				</Swiper>
			</div>
		</ModalProvider2>
	);
};

function Sidebar(props) {
	const [activeTab, setActiveTab] = useState('');
	const [subTab, setSubTab] = useState('');
	const [tabOff, setTabOff] = useState(false);
	const [tabSize, setTabSize] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openLogoutModal, setOpenLogoutModal] = useState(false);
	const location = useLocation();
	const dispatch = useUserDispatchContext();

	const { logout } = useLogout();

	//Detecting mobile use
	const phoneSize = useMediaQuery('(max-width:600px)');
	let navigate = useNavigate();

	useEffect(() => {
		window.addEventListener('resize', funcTabSize);
		funcTabSize();
	}, []);

	useEffect(() => {
		setActiveTab(location.pathname.split('/')[1]);
		if (location.pathname.split('/')[2] !== undefined) {
			setSubTab(location.pathname.split('/')[2]);
		} else {
			setSubTab('');
		}
		if (location.pathname.split('/')[3] === undefined) {
			setTabOff(true);
		}
	}, [location]);

	const checkPageWithTab = () => {
		const isTabValid =
			![
				'login',
				'register',
				'onboarding',
				'add',
				'detail',
				'edit',
				'openinvite',
				'digitalinvite',
				'invite-preview',
			].includes(activeTab) && !['add', 'detail', 'edit', 'openinvite'].includes(subTab);

		return isTabValid;
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const funcTabSize = () => {
		if (window.innerWidth <= 1420) {
			setTabSize(true);
		} else {
			setTabSize(false);
		}
	};

	const handleLogout = () => {
		setOpenLogoutModal(true);
	};

	const handleLogoutAction = () => {
		logout();
		setOpenLogoutModal(false);
		dispatch({ type: 'RESET_USER' });
		navigate('/login');
	};

	const backgroundColorBarStyle = activeTab === 'digitalinvite' ? '#fff' : '#fdf6f6';

	if (checkPageWithTab()) {
		return (
			<>
				<ElevationScroll {...props}>
					<AppBar
						position='fixed'
						sx={{
							display: { xs: 'block', sm: 'block' },
							width: '100vw',
							padding: '12px 18px',
							backgroundColor: backgroundColorBarStyle,
							boxShadow: 'none',
							transform: 'translateY(-1%)',
						}}>
						<PhoneAppBar
							handleDrawerToggle={handleDrawerToggle}
							activeTab={activeTab}
							subTab={subTab}
						/>
					</AppBar>
				</ElevationScroll>

				<Box
					component='nav'
					sx={{
						width: {
							sm: WIDTH_TAB_DRAWER,
							lg: tabSize ? WIDTH_TAB_DRAWER : WIDTH_WEB_DRAWER,
						},
						flexShrink: { sm: 0 },
					}}
					aria-label='mailbox folders'>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer
						anchor={'left'}
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: 'auto',
								boxShadow: 'none',
								padding: '56px 24px',
								backgroundColor: 'rgba(20, 62, 55, 1)',
								height: '100vh',
							},
						}}>
						<WebSideBar activeTab={activeTab} handleLogout={handleLogout} />
					</Drawer>
				</Box>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block', md: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: {
								sm: WIDTH_TAB_DRAWER,
								lg: tabSize ? WIDTH_TAB_DRAWER : WIDTH_WEB_DRAWER,
							},
							height: '100vh',
							padding: '56px 24px',
							backgroundColor: 'rgba(20, 62, 55, 1)',
						},
					}}
					open>
					{tabSize ? (
						<TabletSideBar activeTab={activeTab} handleLogout={handleLogout} />
					) : (
						<WebSideBar activeTab={activeTab} handleLogout={handleLogout} />
					)}
				</Drawer>

				<ModalProvider
					title='Logout Confirmation'
					mainButtonTitle='Yes, Logout'
					isOpen={openLogoutModal}
					handleClose={() => setOpenLogoutModal(false)}
					handleMain={() => handleLogoutAction()}>
					<div className='p-4'>
						<div className='logout-modal-message'>Are you sure you want to logout?</div>
					</div>
				</ModalProvider>
			</>
		);
	} else return null;
}

export default Sidebar;
