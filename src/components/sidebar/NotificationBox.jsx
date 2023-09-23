/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
//MUI Import
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
//Firebase import
import { onSnapshot, collection, query, orderBy, doc, limit } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';
//Components import
import TextProvider from '../atom/TextProvider/TextProvider';
//Context import
import { useUserContext } from '../../context/UserContext';
//Hooks import
import { useNotifications } from '../../hooks/useNotifications';
//Icon import
import { NotificationIcon, CloseIcon } from '../icons/actionIcons';

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: 14,
		top: 36,
		border: 'none',
		padding: '0px 4px',
		backgroundColor: '#F1BFBE',
		color: 'white',
		fontWeight: 'bold',
		fontSize: '12px',
	},
}));

const circleButtonStyle =
	'w-10 h-10 rounded-full border flex justify-center items-center bg-white cursor-pointer';

const boxShadowStyle = { boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)' };

function NotificationBox() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [totalNotifications, setTotalNotifications] = useState(0);
	const { userId, guestlist, newguestlist } = useUserContext();
	const { markNotificationsRead } = useNotifications();
	let navigate = useNavigate();

	const open = Boolean(anchorEl);

	//Real-time update for Notifications
	useEffect(() => {
		if (userId) {
			const userRef = doc(collection(projectFirestore, 'users'), userId);
			const notificationRef = collection(userRef, 'notifications');
			const notificationQuery = query(notificationRef, orderBy('date', 'desc'), limit(6));

			const unsubscribe = onSnapshot(notificationQuery, (querySnapshot) => {
				let tempNotifications = [];
				let count = 0;
				querySnapshot.forEach((doc) => {
					tempNotifications.push({ ...doc.data(), id: doc.id });
					if (!doc.data().read) count++;
				});

				setNotifications(tempNotifications);
				setTotalNotifications(count);
			});

			return unsubscribe;
		}
	}, [userId]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		onMenuOpened();
	};

	const onClickFunc = (page) => {
		navigate(page);
	};

	const onMenuOpened = () => {
		let unreadNotifications = notifications.filter((not) => !not.read).map((not) => not.id);
		markNotificationsRead(unreadNotifications);
	};

	const statusCircleStyle = 'w-3 h-3 rounded-full';
	const notificationBoxStyle = 'flex gap-2 pr-3 sm:pr-4 cursor-pointer';

	const NotificationInfo = ({ body }) => {
		if (body.guestId) {
			const guestBody =
				guestlist.find((guest) => guest.id === body.guestId) ||
				newguestlist.find((guest) => guest.id === body.guestId);

			if (!guestBody) {
				return;
			}

			const rsvpResponse = (rsvpBody) => {
				if (rsvpBody === 'attending') return 'ATTENDING';
				else if (rsvpBody === 'maybe') return 'MAYBE';
				else return 'NOT ATTENDING';
			};

			return (
				<div
					className={notificationBoxStyle}
					style={body.read ? { opacity: 0.7 } : { opacity: 1 }}
					onClick={() => onClickFunc(guestBody?.guestInviteId ? 'guestlist' : 'guestlist/open')}>
					<div className='w-4 pt-1'>
						<div
							className={statusCircleStyle}
							style={body.read ? { opacity: 0 } : { opacity: 1, backgroundColor: '#F1BFBE' }}
						/>
					</div>

					<div className='w-64'>
						<TextProvider className='text-base font-semibold'>
							{guestBody.name?.length > 16
								? `${guestBody?.name.substring(0, 16)}...`
								: guestBody?.name}
						</TextProvider>
						<TextProvider className='text-sm text-gray-500'>
							has submitted RSVP - <b>{rsvpResponse(body.rsvp)}</b>
						</TextProvider>
						<TextProvider className='text-sm text-gray-500'>
							{moment(body.date).format('lll')}
						</TextProvider>
					</div>
				</div>
			);
		} else {
			const guestBody =
				guestlist.find((guest) => guest.id === body.reserved) ||
				newguestlist.find((guest) => guest.id === body.reserved);

			if (!guestBody) {
				return;
			}

			return (
				<div
					className={notificationBoxStyle}
					style={body.read ? { opacity: 0.7 } : { opacity: 1 }}
					onClick={() => onClickFunc('digitalinvite/gift')}>
					<div className='w-4 pt-1'>
						<div
							className={statusCircleStyle}
							style={body.read ? { opacity: 0 } : { opacity: 1, backgroundColor: '#F1BFBE' }}
						/>
					</div>

					<div>
						<TextProvider className='text-base font-semibold'>
							{guestBody.name?.length > 16
								? `${guestBody?.name.substring(0, 16)}...`
								: guestBody?.name}
						</TextProvider>
						<TextProvider className='text-sm text-gray-500'>
							has reserved a gift - <b className='uppercase'>{body.giftReserved}</b>
						</TextProvider>
						<TextProvider className='text-sm text-gray-500'>
							{moment(body.date).format('lll')}
						</TextProvider>
					</div>
				</div>
			);
		}
	};

	return (
		<StyledBadge badgeContent={totalNotifications} color='primary'>
			<Button
				style={{ padding: 0, margin: 0 }}
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<div className={circleButtonStyle} style={boxShadowStyle}>
					<NotificationIcon width={19} height={19} />
				</div>
			</Button>
			<Menu
				PaperProps={{
					style: { borderRadius: '8px', boxShadow: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)' },
				}}
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				<div>
					<div className='p-4 flex items-center justify-between gap-6 border-b border-gray-200'>
						<TextProvider className='font-semibold uppercase'>Notifications</TextProvider>
						<div onClick={() => handleClose()} style={{ cursor: 'pointer' }}>
							<CloseIcon width='14px' height='14px' fill='rgba(152, 162, 179, 1)' />
						</div>
					</div>
					{notifications?.length > 0 ? (
						<div className='flex flex-col gap-2 px-4 sm:px-7 pt-3'>
							{notifications.map((notification) => (
								<NotificationInfo key={notification.id} body={notification} />
							))}
						</div>
					) : (
						<div className='h-36 px-4 flex items-center justify-center'>
							<TextProvider className='text-center text-sm text-gray-300'>
								Send digital invite to <br /> receive notifications!
							</TextProvider>
						</div>
					)}
				</div>
			</Menu>
		</StyledBadge>
	);
}

export default NotificationBox;
