/** @format */

import React, { useState } from 'react';
import moment from 'moment';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';
//Components import
import {
	DashboardCardProvider,
	DashboardCardProvider2,
} from '../../components/cards/dashboardCards';
import ModalProvider from '../../components/atom/ModalProvider/ModalProvider';
import InputField from '../../components/atom/InputField/InputField';
//Hooks import
import { useCalculation } from '../../hooks/useCalculation';
//Icons import
import {
	InvitedIcon,
	AttendingIcon,
	NotAttendingIcon,
	MaybeIcon,
	GiftRegistryIcon,
	EInviteIcon,
	ChecklistIcon,
	VendorIcon,
} from '../../components/icons/brandIcons';
import { ViewAllIcon } from '../../components/icons/actionIcons';
import { TwitterIcon, InstagramIcon } from '../../components/icons/generalIcons';

const weddingDefault =
	'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2FweddingDefault-min.png?alt=media&token=6d0f5e9e-e689-4d00-af6a-ab15853d6501';

const InputFieldProvider = ({ title, placeholder, value, id, onChange, type = 'text' }) => {
	return (
		<div>
			<div className='font-semibold text-sm uppercase mb-1'>{title}</div>
			<InputField
				type={type}
				name={title}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

//Card components
const MainDashboardCard = () => {
	const [modal, setModal] = useState(false);
	const { userData } = useUserContext();
	const { event_title_1, event_location, italic_title, event_date, rsvp_header_image } =
		userData?.eventDetails ? userData.eventDetails : {};
	const [eventTitle1, setEventTitle1] = useState(event_title_1);
	const [eventTitle2, setEventTitle2] = useState(italic_title);
	const [eventLocation, setEventLocation] = useState(event_location);

	const { calculateEventCountDown } = useCalculation();

	const eventCountDown = calculateEventCountDown(event_date);
	return (
		<>
			<div
				className='main-dashboard-card'
				onClick={() => {
					setModal(true);
				}}
				style={{
					cursor: 'pointer',
					backgroundImage: `linear-gradient(rgb(37, 37, 37, 0.5), rgb(1, 1, 1, 0.5)), url(${weddingDefault})`,
				}}>
				<div className='main-dashboard-content flex-1 px-4 py-5 md:px-8 md:py-10'>
					<div>{event_title_1 ? event_title_1 : 'Title'}</div>
					<div className='event-main-title text-4xl'>{italic_title ? italic_title : 'Title'}</div>
					<div className='uppercase'>
						{event_date ? moment(event_date).format('D MMMM YYYY') : 'Date'}
					</div>
					<div className='uppercase'>{event_location ? event_location : 'Location'}</div>
				</div>
				<div className='dashboard-event-countdown flex items-center justify-center gap-4'>
					{event_date ? (
						<>
							<div>
								<b>{eventCountDown.weeks}</b> Weeks
							</div>
							<div>
								<b>{eventCountDown.days}</b> Days
							</div>
							<div>
								<b>{eventCountDown.hours}</b> Hours
							</div>
						</>
					) : (
						<div className='flex gap-5 items-center'>
							Set your event details <ViewAllIcon fill='white' />
						</div>
					)}
				</div>
			</div>

			<ModalProvider
				title='Event Details'
				mainButtonTitle='Save'
				isOpen={modal}
				handleClose={() => setModal(false)}>
				<div className='p-4 flex flex-col gap-4 w-full'>
					<InputFieldProvider
						title='Event Title'
						placeholder='Majlis Resepsi'
						value={eventTitle1}
						onChange={(e) => setEventTitle1(e.target.value)}
					/>
					<InputFieldProvider
						title='Event Title 2'
						placeholder='Izzul & Syaff'
						value={eventTitle2}
						onChange={(e) => setEventTitle2(e.target.value)}
					/>
					<InputFieldProvider
						title='Location'
						placeholder='Shah Alam, Selangor'
						value={eventLocation}
						onChange={(e) => setEventLocation(e.target.value)}
					/>
				</div>
			</ModalProvider>
		</>
	);
};

const GuestStatusCard = ({ title, value, id }) => {
	const IconRendered = () => {
		switch (id) {
			case 'invited':
				return <InvitedIcon />;
			case 'attending':
				return <AttendingIcon />;
			case 'not':
				return <NotAttendingIcon />;
			case 'maybe':
				return <MaybeIcon />;
			default:
				return <InvitedIcon />;
		}
	};

	return (
		<DashboardCardProvider>
			<div className='flex flex-col md:flex-row gap-2'>
				<div className={`guest-icon-container ${id}-color`}>
					<IconRendered />
				</div>
				<div className='flex flex-col items-start'>
					<div className='light-text-title uppercase'>{title}</div>
					<div className='bold-text-value'>{value}</div>
				</div>
			</div>
		</DashboardCardProvider>
	);
};

const StatusCard = ({ title, value, id }) => {
	const IconRendered = () => {
		switch (id) {
			case 'gift':
				return <GiftRegistryIcon />;
			case 'attending':
				return <AttendingIcon />;
			default:
				return <InvitedIcon />;
		}
	};

	return (
		<DashboardCardProvider navigate>
			<div className='flex flex-row gap-2'>
				<div className={`guest-icon-container ${id}-color`}>
					<IconRendered />
				</div>
				<div className='flex flex-col items-start'>
					<div className='light-text-title uppercase'>{title}</div>
					<div className='bold-text-value'>{value}</div>
				</div>
			</div>
		</DashboardCardProvider>
	);
};

const ToolsCard = ({ title, descripton, id }) => {
	const IconRendered = () => {
		switch (id) {
			case 'einvite':
				return <EInviteIcon />;
			case 'gift':
				return <GiftRegistryIcon width='20' height='27' />;
			case 'checklist':
				return <ChecklistIcon width='22' height='27' />;
			case 'vendor':
				return <VendorIcon width='25' height='28' />;
			default:
				return <InvitedIcon />;
		}
	};

	return (
		<DashboardCardProvider navigate>
			<div className='flex flex-row gap-4'>
				<div style={{ width: '30px', height: '46px' }}>
					<IconRendered />
				</div>
				<div className='flex flex-col items-start'>
					<div className='small-bold-text-title '>{title}</div>
					<div className='normal-text-description'>{descripton}</div>
				</div>
			</div>
		</DashboardCardProvider>
	);
};

const InviteDashboardCard = () => {
	return (
		<div className='invite-dashboard-card w-auto p-5 lg:p-8 cursor-pointer'>
			<div className='card-container flex flex-col gap-1'>
				<div className='text-bold-title'>Suggested For You</div>
				<div className='text-main-title'>Send personalized e-invite to your guest!</div>
				<div className='text-normal'>
					Learn how to maximise effiency when managing guestlist by inviting them personally
				</div>
				<div className='learn-more-button'>Learn More</div>
			</div>
		</div>
	);
};

const SocialMediaCard = () => {
	return (
		<DashboardCardProvider2>
			<div className='flex flex-col p-2 gap-1 text-left'>
				<div className='text-bold-title'>Follow Us</div>
				<div className='text-normal'>Get latest updates on news and tips</div>
				<div className='social-media-section flex flex-row gap-5 mt-3'>
					<a
						className='flex gap-2 items-center text-black'
						href={'https://twitter.com/majlisku_app'}
						target='_blank'
						rel='noreferrer'>
						<TwitterIcon /> @majlisku_app
					</a>
					<a
						className='flex gap-2 items-center text-black'
						href={'https://www.instagram.com/majliskuapp/'}
						target='_blank'
						rel='noreferrer'>
						<InstagramIcon /> @majliksuapp
					</a>
				</div>
			</div>
		</DashboardCardProvider2>
	);
};

//Container components
const GuestlistContainer = () => {
	const { guestlistSummary } = useUserContext();
	const { invited, attending, notAttending, maybe, leftOver } = guestlistSummary;

	let navigate = useNavigate();

	return (
		<div className='my-guestlist-container mt-4'>
			<div className='container-header'>
				<div className='container-title'>MY GUESTLIST</div>
				<div
					className='view-all flex items-center gap-2 cursor-pointer'
					onClick={() => navigate('/guestlist')}>
					View all <ViewAllIcon />
				</div>
			</div>
			<div className='container-content'>
				<div className='flex flex-row gap-2'>
					<GuestStatusCard title='Invited' value={`${invited}/${leftOver}`} id='invited' />
					<GuestStatusCard title='Attending' value={attending} id='attending' />
				</div>
				<div className='flex flex-row gap-2'>
					<GuestStatusCard title='Not Attending' value={notAttending} id='not' />
					<GuestStatusCard title='Maybe' value={maybe} id='maybe' />
				</div>
			</div>
		</div>
	);
};

const OpenInvitesContainer = () => {
	const { openInvitesSummary } = useUserContext();
	const { attending } = openInvitesSummary;

	let navigate = useNavigate();

	return (
		<div className='my-guestlist-container flex-1'>
			<div className='container-header'>
				<div className='container-title uppercase'>Open Invites</div>
			</div>
			<div className='container-content' onClick={() => navigate('/guestlist/open')}>
				<StatusCard title='Attending' value={attending} id='attending' />
			</div>
		</div>
	);
};

const GiftRegistryContainer = () => {
	const { giftReservedSummary } = useUserContext();
	const { reserved, total } = giftReservedSummary;
	return (
		<div className='my-guestlist-container flex-1'>
			<div className='container-header'>
				<div className='container-title uppercase'>Gift Registry</div>
			</div>
			<div className='container-content'>
				<StatusCard title='Gift Reserved' value={`${reserved}/${total}`} id='gift' />
			</div>
		</div>
	);
};

const QuickAccessContainer = () => {
	return (
		<div className='my-guestlist-container'>
			<div className='container-header'>
				<div className='container-title uppercase'>Quick Access</div>
			</div>
			<div className='container-content'>
				<ToolsCard
					title='E-invite'
					descripton='Create and share digital invite to your guests'
					id='einvite'
				/>
				<ToolsCard
					title='Gift registry'
					descripton='Create and manage reserved gift registry'
					id='gift'
				/>
			</div>
		</div>
	);
};

const PlannerContainer = () => {
	let navigate = useNavigate();

	return (
		<div className='my-guestlist-container'>
			<div className='container-header'>
				<div className='container-title uppercase'>Planner</div>
			</div>
			<div className='container-content'>
				<div className='w-full' onClick={() => navigate('/planner')}>
					<ToolsCard
						title='Checklist'
						descripton='Create and manage your event checklist'
						id='checklist'
					/>
				</div>
				<div className='w-full' onClick={() => navigate('/planner/vendor')}>
					<ToolsCard
						title='Vendor shortlist'
						descripton='Create and manage vendor shortlist for your event'
						id='vendor'
					/>
				</div>
			</div>
		</div>
	);
};

////////////////////Dashboard Template////////////////////
function Dashboard() {
	return (
		<div className='dashboard-container px-4 flex flex-wrap flex-col gap-4 pb-4 lg:flex-row xl:gap-20'>
			<div className='flex-2 flex flex-col gap-4 lg:flex-1'>
				<MainDashboardCard />
				<GuestlistContainer />
				<div className='flex flex-col lg:flex-row gap-3'>
					<OpenInvitesContainer />
					<GiftRegistryContainer />
				</div>
			</div>
			<div className='flex-2 flex flex-col gap-1'>
				<InviteDashboardCard />
				<PlannerContainer />
				<SocialMediaCard />
			</div>
		</div>
	);
}

export default Dashboard;
