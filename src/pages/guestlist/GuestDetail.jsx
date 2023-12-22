/** @format */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './Guestlist.scss';
import ModalGuestDetail from '../../components/atom/ModalProvider/ModalGuestDetail';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import LoadingButtonProvider from '../../components/atom/ButtonProvider/LoadingButtonProvider';
import { EditGuestModal } from './EditGuest';
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import PaxInputProvider from '../../components/atom/InputField/PaxInputProvider';
import MultipleSelectChip from '../../components/atom/select/MultipleSelect';
//Context import
import { useGuestlistContext } from '../../context/GuestlistContext';
import { useUserContext } from '../../context/UserContext';
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';
import { useFormatTimeSlot } from '../../hooks/useFormat';
//Icons import
import {
	AttendingIcon,
	NotAttendingIcon,
	MaybeIcon,
	InvitedIcon,
} from '../../components/icons/brandIcons';
import { EditIcon, BackIcon, PaxIcon, PreviewIcon } from '../../components/icons/actionIcons';
import { QuoteIcon, GiftIcon, ImportIcon } from '../../components/icons/generalIcons';

export function GuestDetailModal({ isOpen, handleClose, handleOpen }) {
	const { guestlist, guestDetails } = useGuestlistContext();
	const [guestDetail, setGuestDetail] = useState(null);
	const [editGuestModal, setEditGuestModal] = useState(false);

	useEffect(() => {
		if (guestlist) {
			let guest = guestlist.find((guest) => guest.id === guestDetails.id);
			setGuestDetail(guest);
		}
	}, [guestlist, guestDetails]);

	const handleEditGuest = () => {
		handleClose();
		setEditGuestModal(true);
	};

	const handleCloseEditGuest = () => {
		setEditGuestModal(false);
		handleOpen();
	};

	const handlePostDeleteGuest = () => {
		setEditGuestModal(false);
	};

	return (
		<>
			<ModalGuestDetail
				isOpen={isOpen}
				handleEdit={handleEditGuest}
				handleClose={handleClose}
				name={guestDetail?.name}>
				<GuestDetailContent guestDetails={guestDetail} />
			</ModalGuestDetail>
			<EditGuestModal
				isOpen={editGuestModal}
				handleClose={handleCloseEditGuest}
				handlePostDeleteGuest={handlePostDeleteGuest}
			/>
		</>
	);
}

export function OpenInviteGuestDetailModal({ isOpen, handleClose, handleOpen }) {
	const { newguestlist, openInviteGuestDetails } = useGuestlistContext();
	const [guestDetail, setGuestDetail] = useState(null);

	useEffect(() => {
		if (newguestlist) {
			let guest = newguestlist.find((guest) => guest.id === openInviteGuestDetails.id);
			setGuestDetail(guest);
		}
	}, [newguestlist, openInviteGuestDetails]);

	return (
		<>
			<ModalGuestDetail
				openInvite
				isOpen={isOpen}
				handleEdit={() => null}
				handleClose={handleClose}
				name={guestDetail?.name}>
				<GuestDetailContent
					guestDetails={guestDetail}
					handleCloseMainModal={handleClose}
					openInvite
				/>
			</ModalGuestDetail>
		</>
	);
}

export function GuestDetailPage() {
	const { guestlist } = useGuestlistContext();
	const [guestDetails, setGuestDetails] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		if (guestlist) {
			let guest = guestlist.find((guest) => guest.id === id);
			setGuestDetails(guest);
		}
	}, [id, guestlist]);

	const topBarStyle = {
		background: 'linear-gradient(180deg, #FFDBCF 0%, #FFF 100%)',
	};

	function handleEditGuest() {
		navigate(`/guestlist/edit/${id}`);
	}

	return (
		<div className='bg-white overflow-x-hidden'>
			<div style={topBarStyle}>
				<div className='px-6 py-12 flex gap-5 items-center justify-between  w-full'>
					<div onClick={() => navigate(-1)} className='cursor-pointer'>
						<BackIcon width={24} height={24} />
					</div>
					<div onClick={handleEditGuest} className='cursor-pointer'>
						<EditIcon width={24} height={24} fill='#1D4648' />
					</div>
				</div>
				<TextProvider fontFamily='lora' className='text-2xl font-semibold text-left px-6'>
					{guestDetails?.name}
				</TextProvider>
			</div>

			<div>{guestDetails ? <GuestDetailContent guestDetails={guestDetails} /> : null}</div>
		</div>
	);
}

export function OpenInviteGuestDetailPage() {
	const { newguestlist } = useGuestlistContext();
	const [guestDetails, setGuestDetails] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		if (newguestlist) {
			let guest = newguestlist.find((guest) => guest.id === id);
			setGuestDetails(guest);
		}
	}, [id, newguestlist]);

	const topBarStyle = {
		background: 'linear-gradient(180deg, #FFDBCF 0%, #FFF 100%)',
	};

	return (
		<div className='bg-white overflow-x-hidden w-full'>
			<div style={topBarStyle}>
				<div className='px-6 py-12 flex gap-5 items-center justify-between  w-full'>
					<div onClick={() => navigate(-1)} className='cursor-pointer'>
						<BackIcon width={24} height={24} />
					</div>
				</div>
				<TextProvider fontFamily='lora' className='text-2xl font-semibold text-left px-6'>
					{guestDetails?.name}
				</TextProvider>
			</div>

			<div>
				{guestDetails ? (
					<GuestDetailContent
						guestDetails={guestDetails}
						openInvite
						handleCloseMainModal={() => {
							navigate(-1);
						}}
					/>
				) : null}
			</div>
		</div>
	);
}

export const GuestDetailContent = ({
	guestDetails,
	handleCloseMainModal = () => {},
	openInvite = false,
}) => {
	const { formatTimeSlot } = useFormatTimeSlot();
	const [guestGroup, setGuestGroup] = useState([]);
	const [guestTimeSlot, setGuestTimeSlot] = useState(null);
	const [editPaxLimitModal, setEditPaxLimitModal] = useState(false);
	const [importGuestModal, setImportGuestModal] = useState(false);

	const openEditPaxLimitModal = () => {
		setEditPaxLimitModal(true);
	};

	//Make sure old user group is included
	useEffect(() => {
		const renderGroupTag = () => {
			if (guestDetails?.groups) {
				setGuestGroup(guestDetails.groups);
			} else {
				if (guestDetails?.group) {
					setGuestGroup([guestDetails?.group]);
				}
			}
		};

		if (guestDetails) {
			if (guestDetails?.timeSlot) {
				setGuestTimeSlot(guestDetails?.timeSlot);
			} else if (guestDetails?.response?.timeSlot) {
				setGuestTimeSlot(guestDetails?.response?.timeSlot);
			} else {
				return;
			}
		}

		renderGroupTag();
	}, [guestDetails]);

	return (
		<div className='w-auto sm:min-w-[400px] overflow-hidden text-left'>
			{/**** RSVP Status */}
			<RSVPStatus guestId={guestDetails?.id} rsvp={guestDetails?.rsvp} openInvite={openInvite} />
			{/*** Guest Details */}
			<div className='flex flex-col gap-5 px-7 py-4 border-y border-gray-200'>
				{/***** Contact */}
				<div className='flex items-start'>
					<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
						Contact:
					</TextProvider>
					{guestDetails?.phone || guestDetails?.email ? (
						<div className='flex flex-col gap-1'>
							<TextProvider className='text-gray-900 font-bold text-lg'>
								{guestDetails?.phone}
							</TextProvider>
							<TextProvider className='text-gray-900 font-medium text-lg'>
								{guestDetails?.email}
							</TextProvider>
						</div>
					) : (
						<TextProvider className='text-gray-500 font-bold text-base'>NONE</TextProvider>
					)}
				</div>
				{/***** Pax */}
				<div className='flex items-center'>
					<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
						Pax:
					</TextProvider>
					<div className='flex items-center justify-center rounded-full bg-gray-200 w-7 h-7'>
						<TextProvider className='text-gray-900 font-bold text-lg'>
							{guestDetails?.pax}
						</TextProvider>
					</div>
				</div>
				{/*** Group */}
				{!openInvite && (
					<div className='flex items-start'>
						<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
							Group:
						</TextProvider>
						{guestGroup?.length !== 0 ? (
							<div className='flex gap-2 items-start flex-col'>
								{guestGroup?.map((group) => (
									<div
										key={group}
										className='flex items-center justify-center rounded-full bg-gray-200 px-4 py-1'>
										<TextProvider className='text-gray-900 font-bold text-base uppercase'>
											{group}
										</TextProvider>
									</div>
								))}
							</div>
						) : (
							<TextProvider className='text-gray-500 font-bold text-base'>NONE</TextProvider>
						)}
					</div>
				)}

				{/*** Timeslot */}
				<div className='flex items-center'>
					<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
						Timeslot:
					</TextProvider>
					{guestDetails?.timeSlot || guestDetails?.response?.timeSlot ? (
						<div className='flex items-center justify-center rounded-full bg-gray-200 px-4 py-1'>
							<TextProvider className='text-gray-900 font-bold text-base uppercase'>
								{formatTimeSlot(guestDetails)}
							</TextProvider>
						</div>
					) : (
						<TextProvider className='text-gray-500 font-bold text-base'>NONE</TextProvider>
					)}
				</div>
			</div>
			{/*** RSVP */}
			{!openInvite ? (
				<>
					<RSVPLink guestDetails={guestDetails} openEditPaxLimitModal={openEditPaxLimitModal} />
					<EditPaxLimit
						isOpen={editPaxLimitModal}
						handleClose={() => setEditPaxLimitModal(false)}
						guestDetails={guestDetails}
					/>
				</>
			) : (
				<div className='w-full'>
					<RSVPResponses
						key={guestDetails?.id}
						response={{
							wish: guestDetails?.wish,
							rsvp: guestDetails?.rsvp,
							date: guestDetails?.date,
						}}
						guestId={guestDetails?.id}
						otherGuest
					/>
					<div className='px-5 sm:px-0'>
						<ButtonProvider
							onClick={() => {
								setImportGuestModal(true);
							}}
							width='auto'
							type='secondary'
							padding='12px 20px'>
							<ImportIcon />
							<TextProvider className='font-semibold uppercase'>
								Import to My Guestlist
							</TextProvider>
						</ButtonProvider>
					</div>
					<ImportToMyGuestlist
						isOpen={importGuestModal}
						handleClose={() => setImportGuestModal(false)}
						guestDetails={guestDetails}
						closeModalPostImport={handleCloseMainModal}
					/>
				</div>
			)}
		</div>
	);
};

const EditPaxLimit = ({ isOpen, handleClose, guestDetails }) => {
	const { updateGuestDetails, isPending } = useGuestlist();

	const [pax, setPax] = useState(guestDetails?.allocatedPax ? guestDetails.allocatedPax : 1);

	const handleSave = () => {
		updateGuestDetails({ allocatedPax: pax }, guestDetails?.id, () => {
			handleClose();
		});
	};

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Edit Pax Limit'>
			<div>
				<div className='p-3 sm:p-4'>
					<TextProvider className='font-semibold uppercase'>
						Max Guests Including Themselves
					</TextProvider>
					<div className='my-3 w-24'>
						<PaxInputProvider pax={pax} setPax={setPax} />
					</div>
				</div>
				<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
					<div className='flex gap-2 items-center'>
						<ButtonProvider onClick={handleClose} width='auto' type='secondary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold '>CANCEL</TextProvider>
						</ButtonProvider>
						<ButtonProvider onClick={handleSave} width='auto' type='primary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold  text-white'>SAVE</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};

export const ImportToMyGuestlist = ({
	isOpen,
	handleClose,
	guestDetails,
	closeModalPostImport = () => {},
}) => {
	const { addOpenInviteGuest, isPending } = useGuestlist();
	const [groups, setGroups] = useState([]);

	const handleImport = () => {
		addOpenInviteGuest({ ...guestDetails, groups }, () => {
			handleClose();
			closeModalPostImport();
		});
	};

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Import to My Guestlist'>
			<div>
				<div className='p-3 sm:p-4'>
					<TextProvider className='font-medium'>
						Importing <b className='uppercase'>{guestDetails?.name}</b> to your guestlist?
					</TextProvider>
					<div className='my-3 w-full'>
						<MultipleSelectChip group={groups} setGroup={setGroups} />
					</div>
				</div>
				<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
					<div className='flex gap-2 items-center'>
						<ButtonProvider onClick={handleClose} width='auto' type='secondary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold'>CANCEL</TextProvider>
						</ButtonProvider>
						<ButtonProvider onClick={handleImport} width='auto' type='primary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold text-white'>IMPORT</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};

const RSVPStatus = ({ guestId, rsvp, openInvite = false }) => {
	const { updateGuestDetails } = useGuestlist();
	const listofRsvpStatus = ['invited', 'attending', 'notattending', 'maybe'];

	function handleOnClickRSVP(rsvpStatus) {
		if (rsvp !== rsvpStatus) {
			updateGuestDetails({ rsvp: rsvpStatus }, guestId, () => {
				console.log('updateGuestDetails');
			});
		} else {
			updateGuestDetails({ rsvp: '' }, guestId, () => {
				console.log('updateGuestDetails');
			});
		}
	}
	function renderRSVPTag(rsvpStatus) {
		switch (rsvpStatus) {
			case 'invited':
				return (
					<RSVPTag
						key={'invited'}
						active={rsvp === 'invited'}
						onClick={() => handleOnClickRSVP('invited')}>
						<InvitedIcon /> Invited
					</RSVPTag>
				);
			case 'attending':
				return (
					<RSVPTag
						key={'attending'}
						active={rsvp === 'attending'}
						onClick={() => handleOnClickRSVP('attending')}>
						<AttendingIcon /> Attending
					</RSVPTag>
				);

			case 'notattending':
				return (
					<RSVPTag
						key={'notattending'}
						active={rsvp === 'notattending'}
						onClick={() => handleOnClickRSVP('notattending')}>
						<NotAttendingIcon /> Not Attending
					</RSVPTag>
				);
			case 'maybe':
				return (
					<RSVPTag
						key={'maybe'}
						active={rsvp === 'maybe'}
						onClick={() => handleOnClickRSVP('maybe')}>
						<MaybeIcon />
						Maybe
					</RSVPTag>
				);
			default:
				return null;
		}
	}

	return (
		<div className='flex gap-4 overflow-x-scroll pt-4 pb-6 px-4 sm:px-0'>
			{rsvp ? <>{renderRSVPTag(rsvp)}</> : null}
			{!openInvite && listofRsvpStatus.map((status) => status !== rsvp && renderRSVPTag(status))}
		</div>
	);
};

const RSVPLink = ({ guestDetails, openEditPaxLimitModal }) => {
	const { userData } = useUserContext();
	const { generateGuestInviteId, isPending } = useGuestlist();
	const [inviteLink, setInviteLink] = useState('');

	useEffect(() => {
		if (guestDetails?.guestInviteId)
			setInviteLink(`${userData?.inviteId}/${guestDetails?.guestInviteId}`);
	}, [guestDetails]);

	function createGuestInviteLink() {
		if (userData?.eventDetails) {
			let guestInviteId = guestDetails?.name.replace(/\s+/g, '-').toLowerCase();
			generateGuestInviteId(guestInviteId, guestDetails.id, (inviteID) => {
				setInviteLink(inviteID);
				console.log('post InviteID:', inviteID);
			});
		} else {
			alert('Please create a DIGITAL INVITE first!');
		}
	}

	function copyToClipboard() {
		const value = `https://invite.majlisku.app/${inviteLink}`;
		navigator.clipboard.writeText(value).then(() => {
			alert(`Invitation link copied!`);
		});
	}

	return (
		<>
			<div className='pt-4 px-5 md:px-0'>
				<TextProvider className='text-gray-400 font-semibold uppercase w-24 sm:w-40'>
					RSVP
				</TextProvider>
			</div>

			{guestDetails?.response ? (
				<RSVPResponses
					response={guestDetails.response}
					guestId={guestDetails.id}
					otherGuest={guestDetails?.otherGuest}
				/>
			) : null}

			{guestDetails?.guestInviteId ? (
				<div className='pb-4 px-5 md:px-0 flex items-start justify-between flex-col gap-5'>
					{guestDetails?.response ? null : (
						<div className='flex flex-col gap-1'>
							<TextProvider className='text-gray-900 font-medium text-base'>
								Share the link and set guest status as <b>INVITED</b>
							</TextProvider>
						</div>
					)}

					<div className='w-full grid sm:grid-cols-3 gap-2'>
						<ButtonProvider width={'100%'} type='secondary' onClick={openEditPaxLimitModal}>
							<PaxIcon />
							<TextProvider>PAX LIMIT</TextProvider>
						</ButtonProvider>
						<a
							style={{ flex: 1, width: '100%', color: 'black' }}
							href={`https://invite.majlisku.app/${inviteLink}`}
							target='_blank'>
							<ButtonProvider width={'100%'} type='secondary' onClick={() => {}}>
								<PreviewIcon />
								PREVIEW
							</ButtonProvider>
						</a>

						<ButtonProvider
							width={'100%'}
							type='primary'
							onClick={() => {
								copyToClipboard();
							}}>
							SHARE LINK
						</ButtonProvider>
					</div>
				</div>
			) : guestDetails?.otherGuest ? null : (
				<div className='py-4 px-5 md:px-0 flex items-left justify-between flex-col md:flex-row gap-5'>
					<div className='flex flex-col gap-1'>
						<TextProvider className='text-gray-900 font-medium text-base'>
							Generate unique invitation-link for your guest
						</TextProvider>
					</div>
					<div className='w-full md:w-40'>
						{isPending ? (
							<LoadingButtonProvider type='primary' />
						) : (
							<ButtonProvider
								width={'100%'}
								type='primary'
								disabled={!userData?.eventDetails}
								onClick={() => createGuestInviteLink()}>
								GENERATE LINK
							</ButtonProvider>
						)}
					</div>
				</div>
			)}
		</>
	);
};

const RSVPResponses = ({ response, guestId, otherGuest = false }) => {
	const { giftlist } = useUserContext();
	const [showMore, setShowMore] = useState(false);
	const [rsvpDate, setRsvpDate] = useState('');
	const [giftReserved, setGiftReserved] = useState('');

	useEffect(() => {
		if (response && response?.rsvp !== 'invited' && response?.rsvp !== '') {
			setRsvpDate(moment(response.date).fromNow(true));
		}

		if (giftlist) {
			giftlist.forEach((gift) => {
				if (gift.reserved === guestId) {
					setGiftReserved(gift.name);
				}
			});
		}
	}, [response, guestId, giftlist]);

	const responseStyle = {
		background:
			'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
	};
	return (
		<div className='py-4 px-5 md:px-0'>
			<div className='p-2 my-2 rounded-lg' style={responseStyle}>
				{/**** Wish */}
				{response?.wish ? (
					response?.wish?.length > 70 ? (
						showMore ? (
							<div className='cursor-pointer   flex gap-2' onClick={() => setShowMore(false)}>
								<div>
									<QuoteIcon />
								</div>
								<TextProvider className='text-gray-600'>
									{response?.wish} ...<b>less</b>
								</TextProvider>
							</div>
						) : (
							<div className='cursor-pointer flex gap-2' onClick={() => setShowMore(true)}>
								<div>
									<QuoteIcon />
								</div>
								<TextProvider className='text-gray-600 '>
									{response?.wish.substring(0, 70)} ...<b>more</b>
								</TextProvider>
							</div>
						)
					) : (
						<div className='flex gap-2'>
							<div>
								<QuoteIcon />
							</div>
							<TextProvider className='text-gray-600'>{response?.wish}</TextProvider>
						</div>
					)
				) : (
					<TextProvider className='text-gray-600 uppercase font-semibold text-xs'>
						{response?.rsvp}
					</TextProvider>
				)}

				{giftReserved && giftReserved !== '' ? (
					<div className='flex gap-2 mt-2'>
						<div>
							<GiftIcon />
						</div>
						<TextProvider className='text-gray-600'>{giftReserved}</TextProvider>
					</div>
				) : null}

				<div className='text-right flex gap-1 items-center justify-end mt-4 text-gray-400 text-sm'>
					{otherGuest && (
						<>
							<TextProvider>Open Invited</TextProvider>
							<div className='rounded-full w-1 h-1 bg-gray-400'></div>
						</>
					)}
					<TextProvider>Responded {rsvpDate} ago</TextProvider>
				</div>
			</div>
		</div>
	);
};

const RSVPTag = ({ onClick = () => {}, active = false, children }) => {
	const activeTagStyle = {
		background:
			'var(--green-tint-70, linear-gradient(0deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.80) 100%), #419E6A)',
	};

	return (
		<div
			style={active ? activeTagStyle : {}}
			onClick={onClick}
			className='cursor-pointer text-gray-700  px-8 py-2 flex gap-2 items-center justify-center font-semibold whitespace-nowrap border border-gray-300 rounded-full uppercase'>
			{children}
		</div>
	);
};
