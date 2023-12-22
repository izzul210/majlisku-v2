/** @format */

import React, { useState, useEffect } from 'react';
import readXlsxFile from 'read-excel-file';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './Guestlist.scss';
//MUI import
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
//Context import
import { useUserContext } from '../../context/UserContext';
import { useGuestlistContext, useGuestlistDispatchContext } from '../../context/GuestlistContext';
//Components import
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import { SearchBarWithFilter } from '../../components/atom/SearchBar/SearchBar';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import { ImportIcon, PlusIcon } from '../../components/icons/generalIcons';
import { ThreeDotsIcon, DownloadPDFIcon } from '../../components/icons/actionIcons';
import FloatingAdd from '../../components/atom/buttons/FloatingAdd';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
import { AddGuestModal } from './AddGuest';
import { GuestDetailModal } from './GuestDetail';
import { EditGroupBulkModal } from './GuestModals';
import GuestTableVirtuoso from '../../components/table/GuestTableVirtuoso';
//Icons import
import {
	AttendingIcon,
	NotAttendingIcon,
	MaybeIcon,
	InvitedIcon,
} from '../../components/icons/brandIcons';
import { DeleteIcon, CloseIcon, DownloadIcon } from '../../components/icons/actionIcons';
//Images imprt
import EmptyGuestImg from '../../assets/images/emptyGuest.png';
//Doc import
import XLSXTemplate from '../../assets/docs/GuestListTemplate.xlsx';
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';
import { useFormatTimeSlot } from '../../hooks/useFormat';
import { usePDF } from '../../hooks/usePDF';

const MyGuestlist = () => {
	const { guestlist, guestlistLoading } = useGuestlistContext();
	const dispatchGuestlist = useGuestlistDispatchContext();
	const { deleteBulkGuest, isPending } = useGuestlist();
	const { handleSavePDF } = usePDF();
	const [guestlistSelected, setGuestlistSelected] = useState([]);
	const [previewBulkGuestlist, setPreviewBulkGuestlist] = useState([]);
	//Filter states
	const [searchGuest, setSearchGuest] = useState('');
	const [guestRsvp, setGuestRsvp] = useState([]);
	const [guestTimeSlots, setGuestTimeSlots] = useState([]);
	const [guestGroup, setGuestGroup] = useState([]);
	//Modal states
	const [filterModal, setFilterModal] = useState(false);
	const [createGroupModal, setCreateGroupModal] = useState(false);
	const [editGroupModal, setEditGroupModal] = useState(false);
	const [deleteGroupModal, setDeleteGroupModal] = useState(false);
	const [addGuestModal, setAddGuestModal] = useState(false);
	const [guestDetailModal, setGuestDetailModal] = useState(false);
	const [importBulkModal, setImportBulkModal] = useState(false);
	const [previewBulkModal, setPreviewBulkModal] = useState(false);
	const [editGroupBulkModal, setEditGroupBulkModal] = useState(false);
	const [deleteGroupBulkModal, setDeleteGroupBulkModal] = useState(false);
	//Temporary states
	const [groupToBeDeleted, setGroupToBeDeleted] = useState(null);

	const { formatTimeSlot } = useFormatTimeSlot();
	const phoneSize = useMediaQuery('(max-width:600px)');

	let navigate = useNavigate();

	let filteredGuestlist;

	let tableStyle = phoneSize ? 'px-0 h-full' : 'px-4 mb-20';
	let textTitleStyle = phoneSize ? 'text-base text-gray-900' : 'text-lg text-gray-900';
	let tableBorderRadius = phoneSize ? 'rounded-none' : 'rounded-lg';

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = filteredGuestlist.map((n) => n.id);
			setGuestlistSelected(newSelected);
			return;
		}
		setGuestlistSelected([]);
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

	const filterTimeSlot = (guest) => {
		if (guestTimeSlots.length === 0) {
			return 1;
		} else {
			if (guest?.timeSlot || guest?.response?.timeSlot) {
				return guestTimeSlots.includes(formatTimeSlot(guest));
			} else {
				return 0;
			}
		}
	};

	const filterGroup = (guest) => {
		const { group, groups } = guest;

		if (guestGroup.length === 0) {
			return 1;
		} else {
			if (groups?.length > 0) {
				return guestGroup.some((g) => groups.includes(g));
			} else if (group) {
				return guestGroup.includes(group);
			} else return 0;
		}
	};

	filteredGuestlist = guestlist
		?.filter(filterSearch)
		.filter(filterRsvp)
		.filter(filterTimeSlot)
		.filter(filterGroup);

	const countFilteredGuest = () => {
		return guestGroup?.length + guestRsvp?.length + guestTimeSlots?.length;
	};

	const openGuestModal = (guestDetail) => {
		dispatchGuestlist({ type: 'SET_GUEST_DETAILS', payload: guestDetail });
		if (phoneSize) {
			navigate(`/guestlist/detail/${guestDetail.id}`);
		} else {
			setGuestDetailModal(true);
		}
	};

	const openBulkEditModal = () => {
		setEditGroupBulkModal(true);
	};

	const confirmGuestBulkDeleteModal = () => {
		setDeleteGroupBulkModal(true);
	};

	const handleGuestBulkDelete = () => {
		deleteBulkGuest(guestlistSelected, () => {
			setDeleteGroupBulkModal(false);
			setGuestlistSelected([]);
		});
	};

	const handleAddGroupButton = () => {
		setFilterModal(false);
		setCreateGroupModal(true);
	};

	const handleCloseCreateGroupModal = () => {
		setCreateGroupModal(false);
		setFilterModal(true);
	};

	const handleEditGroupButton = (groupName) => {
		setGroupToBeDeleted(groupName);
		setFilterModal(false);
		setEditGroupModal(true);
	};

	const handleCloseEditGroupModal = () => {
		setEditGroupModal(false);
		setFilterModal(true);
	};

	const saveBulkGuestlistForPreview = (bulkGuestlist) => {
		setPreviewBulkGuestlist(bulkGuestlist);
	};

	const handlePreviewBulkGuestlist = () => {
		setImportBulkModal(false);
		setPreviewBulkModal(true);
	};

	const handleDownloadPdf = () => {
		handleSavePDF(filteredGuestlist);
	};

	const calculateTotalGuest = () => {
		//loop through filteredGuestlist and calculate the total of pax
		let total = 0;
		for (let i = 0; i < filteredGuestlist.length; i++) {
			total += filteredGuestlist[i].pax;
		}

		return total;
	};

	return (
		<div className='w-full flex-grow flex-col pt-8 justify-start h-full'>
			{/******* Top Section ****/}
			<div className='flex justify-between items-center w-full px-4'>
				<SearchBarWithFilter
					setSearch={setSearchGuest}
					search={searchGuest}
					setFilter={setFilterModal}
					filteredCount={countFilteredGuest()}
				/>

				{!phoneSize ? (
					<div className='flex gap-2'>
						<ButtonProvider
							type='default'
							padding='12px 20px'
							onClick={() => setImportBulkModal(true)}>
							<ImportIcon />
							<TextProvider className='text-black'>IMPORT CSV</TextProvider>
						</ButtonProvider>
						<ButtonProvider
							onClick={() => setAddGuestModal(true)}
							type='primary'
							padding='12px 20px'>
							<PlusIcon />
							<TextProvider className='text-white'>ADD GUEST</TextProvider>
						</ButtonProvider>
					</div>
				) : null}
			</div>
			{/******* Guestlist Table ****/}
			<div className={tableStyle}>
				<div className={`guestlist-table h-full w-full mt-8 flex-1 bg-white ${tableBorderRadius}`}>
					{/*********** Table Header **/}
					<div className='py-5 px-6 flex justify-between w-full text-left items-center'>
						<div className='flex gap-4 items-center '>
							<TextProvider className={`${textTitleStyle} font-semibold`}>
								TOTAL ATTENDEES
							</TextProvider>
							<div className='filter-button'>
								<div className='font-medium text-gray-900'>{calculateTotalGuest()}/500</div>
								<div>
									<ThreeDotsIcon />
								</div>
							</div>
						</div>
						<div className='cursor-pointer' onClick={handleDownloadPdf}>
							<DownloadPDFIcon />
						</div>
					</div>

					{guestlistLoading ? (
						<div className='h-3/4 w-full flex justify-center items-center'>
							<CircularProgress color='success' />
						</div>
					) : (
						<>
							{guestlist?.length === 0 ? (
								<div className='flex flex-col gap-2 justify-center items-center h-full pb-32'>
									<img src={EmptyGuestImg} alt='Empty Guest' />
									<ButtonProvider width='154px' type='primary' padding='12px 20px'>
										<PlusIcon />
										<TextProvider className='text-white'>ADD GUEST</TextProvider>
									</ButtonProvider>
								</div>
							) : (
								<GuestTableVirtuoso
									rows={filteredGuestlist}
									openGuestModal={openGuestModal}
									selected={guestlistSelected}
									setSelected={setGuestlistSelected}
									handleSelectAllClick={handleSelectAllClick}
									openBulkEditModal={openBulkEditModal}
									confirmGuestBulkDeleteModal={confirmGuestBulkDeleteModal}
								/>
							)}
						</>
					)}
					{/*********** Table Content ***/}
				</div>
			</div>

			{guestlistSelected.length > 0 ? null : (
				<FloatingAdd
					setAddFunc={() => {
						navigate('/guestlist/add');
					}}
				/>
			)}

			{/*********** Filter Modal ***/}
			<ModalProvider2
				isOpen={filterModal}
				handleClose={() => {
					setFilterModal(false);
				}}
				title='Filter Guest'>
				<FilterGuestModalContent
					guestRsvp={guestRsvp}
					setGuestRsvp={setGuestRsvp}
					guestTimeSlots={guestTimeSlots}
					setGuestTimeSlots={setGuestTimeSlots}
					guestGroup={guestGroup}
					setGuestGroup={setGuestGroup}
					handleAddGroupButton={handleAddGroupButton}
					handleEditGroupButton={handleEditGroupButton}
					handleCancel={() => {
						setFilterModal(false);
					}}
				/>
			</ModalProvider2>

			{/*********** Create a New Group Modal ***/}
			<AddGuestModal handleClose={() => setAddGuestModal(false)} isOpen={addGuestModal} />
			<GuestDetailModal
				handleClose={() => setGuestDetailModal(false)}
				handleOpen={() => setGuestDetailModal(true)}
				isOpen={guestDetailModal}
			/>
			<CreateNewGroupModal handleCancel={handleCloseCreateGroupModal} isOpen={createGroupModal} />
			<EditGroupModal
				handleCancel={handleCloseEditGroupModal}
				isOpen={editGroupModal}
				groupName={groupToBeDeleted}
				handleConfirmRemove={() => {
					setEditGroupModal(false);
					setDeleteGroupModal(true);
				}}
			/>
			<RemoveGroupModal
				handleCancel={() => {
					setDeleteGroupModal(false);
					setEditGroupModal(true);
				}}
				handlePostRemoved={() => {
					setDeleteGroupModal(false);
					setFilterModal(true);
				}}
				isOpen={deleteGroupModal}
				groupName={groupToBeDeleted}
			/>
			<ImportBulkGuestModal
				handleCancel={() => setImportBulkModal(false)}
				isOpen={importBulkModal}
				saveBulkGuestlistForPreview={saveBulkGuestlistForPreview}
				handlePreviewBulkGuestlist={handlePreviewBulkGuestlist}
			/>
			<PreviewBulkGuestModal
				isOpen={previewBulkModal}
				handleCancel={() => {
					setPreviewBulkModal(false);
					setImportBulkModal(true);
				}}
				previewBulkGuestlist={previewBulkGuestlist}
			/>
			<EditGroupBulkModal
				isOpen={editGroupBulkModal}
				handleClose={() => setEditGroupBulkModal(false)}
				guestIds={guestlistSelected}
			/>
			<ModalConfirmation
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE GUEST</TextProvider>
					</div>
				}
				loading={false}
				isOpen={deleteGroupBulkModal}
				handleConfirm={handleGuestBulkDelete}
				handleClose={() => setDeleteGroupBulkModal(false)}>
				<TextProvider>Are you sure want to remove these guests?</TextProvider>
			</ModalConfirmation>
		</div>
	);
};

export default MyGuestlist;

////Modals
const FilterGuestModalContent = ({
	guestRsvp,
	setGuestRsvp,
	guestTimeSlots,
	setGuestTimeSlots,
	guestGroup,
	setGuestGroup,
	handleCancel,
	handleAddGroupButton,
	handleEditGroupButton,
}) => {
	const { groupList } = useGuestlistContext();
	const { userData } = useUserContext();
	const [rsvpFilter, setRsvpFilter] = useState([]);
	const [groupFilter, setGroupFilter] = useState([]);
	const [timeSlotFilter, setTimeSlotFilter] = useState([]);

	useEffect(() => {
		setRsvpFilter(guestRsvp);
		setGroupFilter(guestGroup);
		setTimeSlotFilter(guestTimeSlots);
	}, [guestRsvp, guestGroup, guestTimeSlots]);

	const rsvpClicked = (status) => {
		return rsvpFilter.includes(status);
	};

	const timeFilterClicked = (time) => {
		return timeSlotFilter.includes(time);
	};

	const groupClicked = (group) => {
		return groupFilter.includes(group);
	};

	const clickStatus = (status) => {
		if (rsvpFilter.includes(status))
			setRsvpFilter((prev) => prev.filter((rsvp) => rsvp !== status));
		else setRsvpFilter((prev) => [...prev, status]);
	};

	const clickTimeSlot = (time) => {
		if (timeSlotFilter.includes(time)) setTimeSlotFilter((prev) => prev.filter((t) => t !== time));
		else setTimeSlotFilter((prev) => [...prev, time]);
	};

	const clickGroup = (group) => {
		if (groupFilter.includes(group)) setGroupFilter((prev) => prev.filter((g) => g !== group));
		else setGroupFilter((prev) => [...prev, group]);
	};

	const handleReset = () => {
		setRsvpFilter([]);
		setTimeSlotFilter([]);
		setGroupFilter([]);
		setGuestRsvp([]);
		setGuestGroup([]);
		setGuestTimeSlots([]);
		handleCancel();
	};

	const handleApply = () => {
		setGuestRsvp(rsvpFilter);
		setGuestTimeSlots(timeSlotFilter);
		setGuestGroup(groupFilter);
		handleCancel();
	};

	return (
		<div className='w-auto'>
			{/*** By RSVP */}
			<div className='p-5'>
				<TextProvider className='text-base font-semibold'>BY RSVP</TextProvider>
				<div className='flex gap-2 mt-2 flex-wrap'>
					<RSVPTag onClick={() => clickStatus('invited')} active={rsvpClicked('invited')}>
						<InvitedIcon width={20} height={20} />
						<div>Invited</div>
					</RSVPTag>
					<RSVPTag onClick={() => clickStatus('attending')} active={rsvpClicked('attending')}>
						<AttendingIcon width={20} height={20} />
						<div>Attending</div>
					</RSVPTag>
					<RSVPTag onClick={() => clickStatus('notattending')} active={rsvpClicked('notattending')}>
						<NotAttendingIcon width={20} height={20} />
						<div className='whitespace-nowrap'>Not Attending</div>
					</RSVPTag>
					<RSVPTag onClick={() => clickStatus('maybe')} active={rsvpClicked('maybe')}>
						<MaybeIcon width={20} height={20} />
						<div>Maybe</div>
					</RSVPTag>
					<RSVPTag onClick={() => clickStatus('none')} active={rsvpClicked('none')}>
						<div>None</div>
					</RSVPTag>
				</div>
			</div>
			{userData?.eventDetails?.enable_multiple_slots ? (
				<div className='p-5'>
					<TextProvider className='text-base font-semibold'>BY TIMESLOT</TextProvider>
					<div className='flex gap-2 mt-2 flex-wrap'>
						<RSVPTag
							onClick={() =>
								clickTimeSlot(moment(userData?.eventDetails?.event_time?.start).format('h:mma'))
							}
							active={timeFilterClicked(
								moment(userData?.eventDetails?.event_time?.start).format('h:mma')
							)}>
							<div>{moment(userData?.eventDetails?.event_time?.start).format('h:mma')}</div>
						</RSVPTag>
						<RSVPTag
							onClick={() =>
								clickTimeSlot(moment(userData?.eventDetails?.event_time_slot_2).format('h:mma'))
							}
							active={timeFilterClicked(
								moment(userData?.eventDetails?.event_time_slot_2).format('h:mma')
							)}>
							<div>{moment(userData?.eventDetails?.event_time_slot_2).format('h:mma')}</div>
						</RSVPTag>
					</div>
				</div>
			) : null}

			{/*** By Group */}
			<div className='p-5'>
				<div className='flex justify-between items-center'>
					<TextProvider className='text-base font-semibold'>BY GROUP</TextProvider>
					{/** + Add Group */}
					<div className='flex gap-2 items-center cursor-pointer' onClick={handleAddGroupButton}>
						<PlusIcon fill='#1E1E1E' />
						<TextProvider className='text-base font-semibold'>ADD GROUP</TextProvider>
					</div>
				</div>
				{groupList ? (
					<div className='flex gap-2 mt-2 flex-wrap'>
						{groupList.map((group) => (
							<GroupTag
								key={group}
								index={group}
								onClickToEdit={() => {
									handleEditGroupButton(group);
								}}
								onClick={() => clickGroup(group)}
								active={groupClicked(group)}>
								<div>{group}</div>
							</GroupTag>
						))}
					</div>
				) : null}
			</div>

			<div className='flex justify-between items-center gap-4 p-5 border-t border-gray-200'>
				<div className='flex gap-2 items-center cursor-pointer' onClick={handleReset}>
					<TextProvider className='text-base font-semibold'>RESET</TextProvider>
				</div>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider onClick={handleApply} width='auto' type='primary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-white'>APPLY</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</div>
	);
};

export const CreateNewGroupModal = ({ handleCancel, isOpen }) => {
	const { addGuestGroup, isPending } = useGuestlist();
	const [groupName, setGroupName] = useState('');
	const maxLength = 15;

	const handleSave = () => {
		addGuestGroup(groupName, () => {
			handleCancel();
		});
	};

	const handleChange = (event) => {
		const { value } = event.target;
		if (value.length <= maxLength) {
			setGroupName(value);
		}
	};

	return (
		<ModalProvider2
			isOpen={isOpen}
			handleClose={handleCancel}
			loading={isPending}
			title='Create a New Group'>
			<div className='width-auto'>
				<div className='p-5'>
					<InputFieldProvider
						title='Group Name'
						placeholder='eg: Classmate E15B'
						value={groupName}
						onChange={handleChange}
						maxLength={maxLength}
					/>
					<TextProvider className='mt-2 align-self-center text-right'>
						Characters remaining: {maxLength - groupName.length}
					</TextProvider>
				</div>
				<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
					<div className='flex gap-2 items-center'>
						<ButtonProvider
							onClick={handleCancel}
							width='auto'
							type='secondary'
							padding='12px 20px'>
							<TextProvider className='text-base font-semibold '>CANCEL</TextProvider>
						</ButtonProvider>
						<ButtonProvider onClick={handleSave} width='auto' type='primary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold  text-white'>APPLY</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};

const EditGroupModal = ({ handleCancel, isOpen, groupName, handleConfirmRemove }) => {
	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleCancel} title='Remove Group'>
			<div className='width-auto'>
				<div className='p-5'>
					<InputFieldProvider
						title='Group Name'
						disabled={true}
						placeholder='eg: Classmate E15B'
						value={groupName}
						onChange={null}
					/>
				</div>
				<div className='flex justify-center items-center gap-4 p-5 border-t border-gray-200'>
					<div
						className='flex gap-2 items-center cursor-pointer'
						onClick={() => handleConfirmRemove()}>
						<DeleteIcon />
						<TextProvider className='text-base font-semibold  text-red-600'>REMOVE</TextProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};

const RemoveGroupModal = ({ handleCancel, isOpen, groupName, handlePostRemoved }) => {
	const { removeGuestGroup, isPending } = useGuestlist();

	const handleRemoveGroup = () => {
		removeGuestGroup(groupName, () => {
			handlePostRemoved();
		});
	};

	return (
		<ModalProvider2
			isOpen={isOpen}
			handleClose={handleCancel}
			loading={isPending}
			title={
				<div className='flex gap-2 items-center'>
					<DeleteIcon fill='black' /> Remove Group
				</div>
			}>
			<div className='width-auto'>
				<div className='p-5'>
					<TextProvider>
						Are you sure you want to remove the group? Don't worry, deleting the group won't affect
						any of your guest information
					</TextProvider>
				</div>
				<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
					<div className='flex gap-2 items-center'>
						<ButtonProvider
							onClick={handleCancel}
							width='auto'
							type='secondary'
							padding='12px 20px'>
							<TextProvider className='text-base font-semibold '>CANCEL</TextProvider>
						</ButtonProvider>
						<ButtonProvider
							onClick={handleRemoveGroup}
							width='auto'
							type='delete'
							padding='12px 20px'>
							<TextProvider className='text-base font-semibold '>REMOVE</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};

const ImportBulkGuestModal = ({
	handleCancel,
	isOpen,
	saveBulkGuestlistForPreview,
	handlePreviewBulkGuestlist,
}) => {
	// It will store the file uploaded by the user
	const { addBulkGuest, isPending } = useGuestlist();
	const [file, setFile] = useState('');
	const [bulkGuestlist, setBulkGuestlist] = useState([]);

	function formatBytes(bytes, decimals) {
		if (bytes == 0) return '0 Bytes';
		var k = 1024,
			dm = decimals || 2,
			sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	const handleFileChangeXlsx = (e) => {
		let selected = e.target.files[0];
		setFile(selected);

		readXlsxFile(selected).then((data) => {
			let i = 0;
			let headers = ['name', 'pax', 'phone', 'email'];
			let json_objects = [];

			data.map((row, index) => {
				if (i > 2) {
					let temp = {};
					for (let x = 0; x < row.length; x++) {
						temp[headers[x].toLowerCase()] = row[x];
					}
					if (temp.pax === null) temp.pax = 1;
					json_objects.push(temp);
				}
				i++;
			});
			setBulkGuestlist(json_objects);
			saveBulkGuestlistForPreview(json_objects);
		});
	};

	const submitBulkGuest = () => {
		addBulkGuest(bulkGuestlist, () => {
			handleCancel();
		});
	};

	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleCancel} title='Import Bulk Guests'>
			<div className='width-auto p-4 flex'>
				<div className='px-4 border-r border-gray-200 flex-1'>
					<TextProvider className='font-semibold'>UPLOAD XLSX FILE</TextProvider>
					<TextProvider className='my-2 text-gray-500'>
						Make sure you upload the file with correct format and attributes
					</TextProvider>
					<Button component='label' sx={{ p: 0 }} className='w-full'>
						<div className='flex rounded-lg border border-gray-400 border-dashed justify-center items-center bg-gray-100 w-full h-32'>
							{file ? (
								<div
									style={{
										color: '#1E1E1E',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										flexWrap: 'wrap',
										gap: '5px',
										fontSize: '12px',
									}}>
									<div>{file.name}</div>
									<div>({formatBytes(file.size)})</div>
									<div style={{ cursor: 'pointer' }}>
										<CloseIcon width={10} height={10} />
									</div>
								</div>
							) : (
								<TextProvider>SELECT A .XLSX FILE TO UPLOAD</TextProvider>
							)}
						</div>

						<input hidden onChange={handleFileChangeXlsx} id='xlsxFile' name='file' type='File' />
					</Button>
				</div>
				<div className='p-4 flex-1 flex flex-col gap-1 text-gray-500'>
					<div className='flex gap-1'>
						<TextProvider>1.</TextProvider>
						<TextProvider>Download xlsx file template</TextProvider>
					</div>
					<ButtonProvider>
						<a
							className='no-underline text-black flex items-start gap-2'
							href={XLSXTemplate}
							download='GuestListTemplate.xlsx'>
							<DownloadIcon />
							<TextProvider className='font-semibold'>GuestListTemplate.xlsx</TextProvider>
						</a>
					</ButtonProvider>
					<div className='flex gap-1'>
						<TextProvider>2.</TextProvider>
						<TextProvider>Fill in required columns with correct attributes</TextProvider>
					</div>
					<div className='flex gap-1'>
						<TextProvider>3.</TextProvider>
						<TextProvider>
							Select Relationship attribute or update them later in the Guestlist
						</TextProvider>
					</div>
					<div className='flex gap-1'>
						<TextProvider>4.</TextProvider>
						<TextProvider>Save and upload xlsx file</TextProvider>
					</div>
					<div className='flex gap-1'>
						<TextProvider>5.</TextProvider>
						<TextProvider>Preview and import</TextProvider>
					</div>
				</div>
			</div>
			<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
				<div className='flex gap-2 items-center'>
					<ButtonProvider
						width='auto'
						type='secondary'
						padding='12px 20px'
						onClick={handlePreviewBulkGuestlist}>
						<TextProvider className='text-base font-semibold '>PREVIEW</TextProvider>
					</ButtonProvider>
					<ButtonProvider width='auto' type='primary' padding='12px 20px' onClick={submitBulkGuest}>
						<TextProvider className='text-base font-semibold  text-white'>IMPORT</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</ModalProvider2>
	);
};

const PreviewBulkGuestModal = ({ handleCancel, isOpen, previewBulkGuestlist }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = [
		{ id: 'name', label: 'Name', minWidth: 170 },
		{
			id: 'pax',
			label: 'Pax',
			minWidth: 90,
			align: 'center',
		},
		{
			id: 'email',
			label: 'Email',
			minWidth: 90,
			align: 'center',
		},
		{
			id: 'phone',
			label: 'Phone',
			minWidth: 90,
			align: 'center',
		},
	];

	return (
		<ModalProvider2 isOpen={isOpen} handleClose={handleCancel} title='Preview Table'>
			<div className='width-auto p-4 flex flex-col'>
				<Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 1, boxShadow: 'none' }}>
					<TableContainer sx={{ maxHeight: 600 }} aria-label='a dense table'>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
											sx={{
												color: 'white',
												textTransform: 'uppercase',
												background: 'rgba(30, 30, 30, 1)',
												textAlign: 'center',
											}}>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{previewBulkGuestlist
									?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
												{columns.map((column, id) => {
													const value = row[column.id];
													return (
														<TableCell
															key={id}
															align={column.align}
															sx={{ border: '0.5px solid rgba(30, 30, 30, 0.2)', padding: '5px' }}>
															{column.format && typeof value === 'number'
																? column.format(value)
																: value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={previewBulkGuestlist.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
			<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
				<ButtonProvider width='auto' type='primary' padding='12px 20px' onClick={handleCancel}>
					<TextProvider className='text-base font-semibold  text-white'>CLOSE PREVIEW</TextProvider>
				</ButtonProvider>
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

const GroupTag = ({ onClick, onClickToEdit, active = false, children }) => {
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
			<div className='border-r border-gray-400 pr-3'>{children}</div>
			<div onClick={onClickToEdit}>
				<ThreeDotsIcon fill='#98A2B3' />
			</div>
		</div>
	);
};
