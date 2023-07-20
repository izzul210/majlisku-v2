/** @format */

import React, { useState, useEffect } from 'react';
import './Guestlist.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
//Context import
import { useGuestlistContext, useGuestlistDispatchContext } from '../../context/GuestlistContext';
import { useUserContext } from '../../context/UserContext';
//Components import
import OpenInviteTable from '../../components/table/OpenInviteTable';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import { SearchBarWithFilter } from '../../components/atom/SearchBar/SearchBar';
import { OpenInviteGuestDetailModal, ImportToMyGuestlist } from './GuestDetail';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import MultipleSelectChip from '../../components/atom/select/MultipleSelect';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import FloatingShareButton from '../../components/atom/buttons/FloatingShareButton';
//Assets import
import EmptyGuestImg from '../../assets/images/openinvitedefault.png';
import { ImportIcon, RSVPIcon } from '../../components/icons/generalIcons';
import { DeleteIcon, PreviewIcon, WhatsappIcon } from '../../components/icons/actionIcons';
//Icons import
import {
	AttendingIcon,
	NotAttendingIcon,
	MaybeIcon,
	InvitedIcon,
} from '../../components/icons/brandIcons';
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';

const OpenInvites = () => {
	const { newguestlist, openInviteTotal, openInviteLoading } = useGuestlistContext();
	const { deleteOpenInviteGuest, deleteBulkOpenInviteGuest, isPending } = useGuestlist();
	const { userData } = useUserContext();
	//States
	const [guestlistSelected, setGuestlistSelected] = useState([]);
	const [searchGuest, setSearchGuest] = useState('');
	const [guestToImport, setGuestToImport] = useState({});
	const [guestToBeDeleted, setGuestToBeDeleted] = useState(null);
	//Filter states
	const [guestRsvp, setGuestRsvp] = useState([]);
	//Modal states
	const [filterModal, setFilterModal] = useState(false);
	const [shareInviteModal, setShareInviteModal] = useState(false);
	const [guestDetailModal, setGuestDetailModal] = useState(false);
	const [guestImportModal, setGuestImportModal] = useState(false);
	const [guestDeleteModal, setGuestDeleteModal] = useState(false);
	const [guestDeleteBulkModal, setGuestDeleteBulkModal] = useState(false);
	const [guestImportBulkModal, setGuestImportBulkModal] = useState(false);

	const phoneSize = useMediaQuery('(max-width:600px)');
	const dispatch = () => {
		console.log('dispatch');
	};
	const dispatchGuestlist = useGuestlistDispatchContext();

	let navigate = useNavigate();

	let tableStyle = phoneSize ? 'px-0 h-full' : 'px-4 h-5/6';
	let textTitleStyle = phoneSize ? 'text-base text-gray-900' : 'text-lg text-gray-900';
	let tableBorderRadius = phoneSize ? 'rounded-none' : 'rounded-lg';

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = newguestlist.map((n) => n.id);
			setGuestlistSelected(newSelected);
			return;
		}
		setGuestlistSelected([]);
	};

	const handleImportAll = () => {
		const newSelected = newguestlist.map((n) => n.id);
		setGuestlistSelected(newSelected);
		handleOpenImportBulkModal();
	};

	const filterSearch = (guest) => {
		if (searchGuest !== '') {
			return guest.name.toLowerCase().includes(searchGuest);
		} else {
			return guest;
		}
	};

	const filterRsvp = (guest) => {
		const { rsvp } = guest;
		if (guestRsvp.length === 0) {
			return 1;
		} else {
			if (guestRsvp.includes('none')) {
				if (rsvp === '' || rsvp === null || !rsvp) return 1;
			}

			return guestRsvp.includes(rsvp);
		}
	};

	const openGuestModal = (guestDetail) => {
		dispatchGuestlist({ type: 'SET_OPEN_INVITE_GUEST_DETAILS', payload: guestDetail });
		if (phoneSize) {
			navigate(`/guestlist/openinvite/${guestDetail.id}`);
		} else {
			setGuestDetailModal(true);
		}
	};

	const handleOpenImportModal = (guestDetail) => {
		setGuestToImport(guestDetail);
		setGuestImportModal(true);
	};

	const handleOpenDeleteModal = (guest) => {
		setGuestToBeDeleted(guest);
		setGuestDeleteModal(true);
	};

	const handleOpenDeleteBulkModal = () => {
		setGuestDeleteBulkModal(true);
	};

	const handleGuestDelete = () => {
		deleteOpenInviteGuest(guestToBeDeleted.id, () => {
			setGuestDeleteModal(false);
			setGuestToBeDeleted(null);
		});
	};

	const handleGuestDeleteBulk = () => {
		deleteBulkOpenInviteGuest(guestlistSelected, () => {
			setGuestDeleteBulkModal(false);
			setGuestlistSelected([]);
		});
	};

	const handleOpenImportBulkModal = () => {
		setGuestImportBulkModal(true);
	};

	const resetGuestSelected = () => {
		setGuestlistSelected([]);
	};

	const handleShareInvite = () => {
		if (userData?.eventDetails) {
			setShareInviteModal(true);
		} else {
			alert('Please create a digital invite first!');
		}
	};

	const filteredNewGuestlist = newguestlist?.filter(filterSearch).filter(filterRsvp);

	return (
		<div className='w-full flex-grow flex-col pt-8 justify-start h-full'>
			{/******* Top Section ****/}
			<div className='flex justify-between items-center w-full px-4'>
				<SearchBarWithFilter
					setSearch={setSearchGuest}
					search={searchGuest}
					setFilter={setFilterModal}
					filteredCount={guestRsvp?.length || 0}
				/>
				{!phoneSize ? (
					<div>
						<ButtonProvider onClick={handleShareInvite} padding='12px 20px'>
							<InvitedIcon />
							<TextProvider className='uppercase font-semibold'>Share Invite</TextProvider>
						</ButtonProvider>
					</div>
				) : null}
			</div>
			{/******* Guestlist Table ****/}
			<div className={tableStyle}>
				<div className={`guestlist-table h-full w-full mt-8 flex-1 bg-white ${tableBorderRadius}`}>
					{/*********** Table Header **/}
					<div className='py-5 px-6 flex justify-between w-full text-left items-center'>
						<div className='flex gap-5 items-center'>
							<TextProvider className={`${textTitleStyle} font-semibold`}>
								RESPONDED GUESTS
							</TextProvider>
							<div className='filter-button'>
								<div className='font-medium text-gray-900'>{openInviteTotal}</div>
							</div>
						</div>
						{filteredNewGuestlist.length > 0 ? (
							<div className='flex items-center gap-3 cursor-pointer' onClick={handleImportAll}>
								<ImportIcon />
								<TextProvider className='text-black'>
									{phoneSize ? 'ALL' : 'IMPORT ALL'}
								</TextProvider>
							</div>
						) : null}
					</div>

					{openInviteLoading ? (
						<div className='h-3/4 w-full flex justify-center items-center'>
							<CircularProgress color='success' />
						</div>
					) : (
						<>
							{newguestlist?.length === 0 ? (
								<div className='flex flex-col gap-2 justify-center items-center h-full pb-32'>
									<img src={EmptyGuestImg} alt='Empty Guest' />
								</div>
							) : (
								<OpenInviteTable
									dispatch={dispatch}
									rows={filteredNewGuestlist}
									openGuestModal={openGuestModal}
									selected={guestlistSelected}
									setSelected={setGuestlistSelected}
									handleSelectAllClick={handleSelectAllClick}
									handleOpenImportModal={handleOpenImportModal}
									handleOpenDeleteModal={handleOpenDeleteModal}
									handleOpenDeleteBulkModal={handleOpenDeleteBulkModal}
									handleOpenImportBulkModal={handleOpenImportBulkModal}
								/>
							)}
						</>
					)}
				</div>
			</div>

			{guestlistSelected?.length === 0 ? (
				<FloatingShareButton handleOnClick={handleShareInvite} />
			) : null}

			{/********** Filter Modal ****/}
			<ModalProvider2
				title='Filter Guest'
				isOpen={filterModal}
				handleClose={() => setFilterModal(false)}>
				<FilterGuestModalContent
					guestRsvp={guestRsvp}
					setGuestRsvp={setGuestRsvp}
					handleCancel={() => setFilterModal(false)}
				/>
			</ModalProvider2>

			<ShareOpenInviteModal
				isOpen={shareInviteModal}
				handleClose={() => setShareInviteModal(false)}
			/>
			<OpenInviteGuestDetailModal
				isOpen={guestDetailModal}
				handleClose={() => setGuestDetailModal(false)}
			/>
			<ImportToMyGuestlist
				isOpen={guestImportModal}
				handleClose={() => setGuestImportModal(false)}
				guestDetails={guestToImport}
			/>
			<ImportBulkToMyGuestlist
				isOpen={guestImportBulkModal}
				handleClose={() => setGuestImportBulkModal(false)}
				guestlistIds={guestlistSelected}
				resetGuestSelected={resetGuestSelected}
			/>
			<ModalConfirmation
				key='guest'
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE GUEST</TextProvider>
					</div>
				}
				loading={isPending}
				isOpen={guestDeleteModal}
				handleConfirm={handleGuestDelete}
				handleClose={() => setGuestDeleteModal(false)}>
				{guestToBeDeleted ? (
					<TextProvider>
						Are you sure want to remove
						<b className='uppercase font-semibold'> {guestToBeDeleted?.name}</b>?
					</TextProvider>
				) : (
					<TextProvider>Are you sure want to remove these guests?</TextProvider>
				)}
			</ModalConfirmation>
			<ModalConfirmation
				key='bulkGuest'
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE GUEST</TextProvider>
					</div>
				}
				loading={isPending}
				isOpen={guestDeleteBulkModal}
				handleConfirm={handleGuestDeleteBulk}
				handleClose={() => setGuestDeleteBulkModal(false)}>
				<TextProvider>Are you sure want to remove these guests?</TextProvider>
			</ModalConfirmation>
		</div>
	);
};

export default OpenInvites;

const ImportBulkToMyGuestlist = ({ isOpen, handleClose, guestlistIds, resetGuestSelected }) => {
	const { addOpenInviteBulkGuest, isPending } = useGuestlist();
	const [groups, setGroups] = useState([]);

	const handleImport = () => {
		addOpenInviteBulkGuest(guestlistIds, groups, () => {
			handleClose();
			resetGuestSelected();
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
					<TextProvider className='font-medium'>Importing these to your guestlist?</TextProvider>
					<div className='my-3 w-full'>
						<MultipleSelectChip group={groups} setGroup={setGroups} />
					</div>
				</div>
				<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
					<div className='flex gap-2 items-center'>
						<ButtonProvider onClick={handleClose} width='auto' type='secondary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
						</ButtonProvider>
						<ButtonProvider onClick={handleImport} width='auto' type='primary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold text-sm text-white'>
								IMPORT
							</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};

const FilterGuestModalContent = ({ guestRsvp, setGuestRsvp, handleCancel }) => {
	const [rsvpFilter, setRsvpFilter] = useState([]);

	useEffect(() => {
		setRsvpFilter(guestRsvp);
	}, [guestRsvp]);

	const rsvpClicked = (status) => {
		return rsvpFilter.includes(status);
	};

	const clickStatus = (status) => {
		if (rsvpFilter.includes(status))
			setRsvpFilter((prev) => prev.filter((rsvp) => rsvp !== status));
		else setRsvpFilter((prev) => [...prev, status]);
	};

	const handleReset = () => {
		setRsvpFilter([]);
		setGuestRsvp([]);
		handleCancel();
	};

	const handleApply = () => {
		setGuestRsvp(rsvpFilter);
		handleCancel();
	};

	return (
		<div className='w-auto'>
			{/*** By RSVP */}
			<div className='p-5'>
				<TextProvider className='text-base font-semibold'>BY RSVP</TextProvider>
				<div className='flex gap-2 mt-2 flex-wrap'>
					{/* <RSVPTag onClick={() => clickStatus('invited')} active={rsvpClicked('invited')}>
						<InvitedIcon width={20} height={20} />
						<div>Invited</div>
					</RSVPTag> */}
					<RSVPTag onClick={() => clickStatus('attending')} active={rsvpClicked('attending')}>
						<AttendingIcon width={20} height={20} />
						<div>Attending</div>
					</RSVPTag>
					<RSVPTag onClick={() => clickStatus('maybe')} active={rsvpClicked('maybe')}>
						<MaybeIcon width={20} height={20} />
						<div>Maybe</div>
					</RSVPTag>
					<RSVPTag onClick={() => clickStatus('notattending')} active={rsvpClicked('notattending')}>
						<NotAttendingIcon width={20} height={20} />
						<div className='whitespace-nowrap'>Not Attending</div>
					</RSVPTag>
					{/* <RSVPTag onClick={() => clickStatus('none')} active={rsvpClicked('none')}>
						<div>None</div>
					</RSVPTag> */}
				</div>
			</div>

			<div className='flex justify-between items-center gap-4 p-5 border-t border-gray-200'>
				<div className='flex gap-2 items-center cursor-pointer' onClick={handleReset}>
					<TextProvider className='text-base font-semibold text-sm'>RESET</TextProvider>
				</div>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider onClick={handleApply} width='auto' type='primary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm text-white'>
							APPLY
						</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</div>
	);
};

const ShareOpenInviteModal = ({ isOpen, handleClose }) => {
	const { userData } = useUserContext();

	const inviteLink = `https://invite.majlisku.app/${userData?.inviteId}`;

	function copyToClipboard() {
		if (userData?.inviteId) {
			const inviteLink = userData?.inviteId;
			const value = `https://invite.majlisku.app/${inviteLink}`;
			navigator.clipboard.writeText(value).then(() => {
				alert(`Invitation link copied!`);
			});
		} else {
			alert(`You have not created Digital Invite yet :/`);
		}
	}

	const buttonTextStyles = 'font-semibold uppercase text-xs sm:text-sm';

	return (
		<ModalProvider2
			loading={false}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Share Open Invite Link'>
			<div className='p-5 sm:p-6 flex gap-6 flex-col'>
				<div>
					<TextProvider className='uppercase font-semibold'>Image Preview</TextProvider>
					<div
						className='w-full h-48 flex items-center justify-center mt-2 rounded-lg'
						style={{
							backgroundImage: `url(${userData?.eventDetails?.rsvp_header_image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
				</div>
				<div>
					<TextProvider className='uppercase font-semibold'>Invitation Url</TextProvider>
					<div className='mt-2 w-full px-4 py-3 rounded-md border bg-blue bg-purple-50'>
						<TextProvider className='text-gray-400'>
							invite.majlisku.app/{userData?.inviteId}
						</TextProvider>
					</div>
				</div>
				<div>
					<TextProvider className='font-medium text-sm sm:text-base text-gray-500'>
						1. Share invitation link
					</TextProvider>
					<TextProvider className='font-medium text-sm sm:text-base text-gray-500'>
						2. Import RSVP'd guests into My Guestlist
					</TextProvider>
				</div>
				<div className='flex gap-2 flex-col'>
					<div className='flex gap-2'>
						<ButtonProvider>
							<RSVPIcon />
							<TextProvider className={buttonTextStyles}>Edit E-Invite</TextProvider>
						</ButtonProvider>
						<ButtonProvider>
							<PreviewIcon />
							<TextProvider className={buttonTextStyles}>Preview</TextProvider>
						</ButtonProvider>
					</div>
					<ButtonProvider
						onClick={() => copyToClipboard()}
						type='primary'
						className='uppercase text-xs sm:text-sm'>
						Copy Link
					</ButtonProvider>
					<a href={`whatsapp://send?text=${inviteLink}`} data-action='share/whatsapp/share'>
						<ButtonProvider>
							<WhatsappIcon />
							<TextProvider className={buttonTextStyles}>Share Via Whatsapp</TextProvider>
						</ButtonProvider>
					</a>
				</div>
			</div>
		</ModalProvider2>
	);
};

///Small Components
const RSVPTag = ({ onClick, active = false, children }) => {
	const divStyle = active
		? {
				border: '1px solid var(--neutral-grey-400, #98A2B3)',
				background: '#f7ebeb',
		  }
		: { border: '1px solid #D0D5DD' };

	return (
		<div
			onClick={onClick}
			className='flex gap-2 items-center py-2 px-3 rounded-full text-xs font-semibold uppercase cursor-pointer'
			style={divStyle}>
			{children}
		</div>
	);
};
