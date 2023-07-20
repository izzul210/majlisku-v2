/** @format */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useMediaQuery } from '@mui/material';
import './GuestTable.scss';
import { GuestRSVPTag, GuestRSVPMobileTag } from '../atom/tags/Tag';
import ButtonProvider from '../atom/ButtonProvider/ButtonProvider';
import { DropDownIcon, ImportIcon, DeleteIcon, EditIcon } from '../icons/actionIcons';
import TextProvider from '../atom/TextProvider/TextProvider';

const DeleteConfirmation = () => <DeleteIcon />;

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function latestComparator(a, b, orderBy) {
	return 0;
}

function getComparator(order, orderBy, latest) {
	if (latest) {
		return (a, b) => latestComparator(a, b, orderBy);
	} else {
		if (order === 'desc') {
			return (a, b) => descendingComparator(a, b, orderBy);
		} else {
			return (a, b) => -descendingComparator(a, b, orderBy);
		}
	}
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});

	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'NAME',
	},
	{
		id: 'pax',
		numeric: true,
		disablePadding: false,
		label: 'PAX',
	},
	{
		id: 'rsvp',
		numeric: true,
		disablePadding: false,
		label: 'RSVP',
	},
	{
		id: 'action',
		numeric: true,
		disablePadding: false,
		label: 'IMPORT/DELETE',
	},
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		setOrder,
		latest,
		setLatest,
	} = props;
	const createSortHandler = (property) => (event) => {
		if (property === 'name') onRequestSort(event, property);
	};

	const activeStyle = { fontWeight: '500', color: 'black', cursor: 'pointer', fontSize: 12 };
	const normalStyle = { fontWeight: '500', cursor: 'pointer', fontSize: 12 };

	const phoneSize = useMediaQuery('(max-width:600px)');

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						color='default'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.id === 'pax' ? 'center' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}>
						{headCell.id === 'name' ? (
							<div
								onClick={() => {
									if (phoneSize) {
										setOrder('asc');
										setLatest((prev) => !prev);
									}
								}}
								style={{
									fontSize: 14,
									color: '#667085',
									fontWeight: '600',
									fontFamily: 'Poppins',
									display: 'flex',
									alignItems: 'center',
									gap: '5px',
								}}>
								{headCell.label}
								{!phoneSize ? (
									<>
										<div
											style={latest ? activeStyle : normalStyle}
											onClick={() => {
												setLatest(true);
											}}>
											LATEST
										</div>
										<div
											style={order === 'asc' && !latest ? activeStyle : normalStyle}
											onClick={() => {
												setOrder('asc');
												setLatest(false);
											}}>
											(A-Z)
										</div>
										<div
											style={order === 'desc' && !latest ? activeStyle : normalStyle}
											onClick={() => {
												setOrder('desc');
												setLatest(false);
											}}>
											(Z-A)
										</div>
									</>
								) : (
									<>
										<div
											style={
												!latest
													? { transform: 'rotate(180deg)', transition: 'transform 0.5s' }
													: { transform: 'rotate(0deg)', transition: 'transform 0.5s' }
											}>
											<DropDownIcon height='7' width='12' />
										</div>
									</>
								)}
							</div>
						) : (
							<div
								style={{
									fontSize: 14,
									color: '#667085',
									fontWeight: '600',
									fontFamily: 'Poppins',
								}}>
								{headCell.label}
							</div>
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const {
		numSelected,
		deleteGuestBulkFunc,
		openImportGuestBulkModal,
		handleOpenDeleteBulkModal,
		handleOpenImportBulkModal,
	} = props;
	const phoneSize = useMediaQuery('(max-width:600px)');

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha('rgba(20, 62, 55, 1)', 1),
				}),
			}}>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%', fontFamily: 'Poppins', textAlign: 'left', color: 'white' }}
					color='inherit'
					variant='subtitle1'
					component='div'
					textAlign='left'>
					{numSelected} selected
				</Typography>
			) : (
				<></>
			)}

			{numSelected > 0 ? (
				<div style={{ marginRight: 16 }}>
					<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
						<div onClick={() => handleOpenImportBulkModal()}>
							<ButtonProvider width='auto' padding='10px 12px'>
								<ImportIcon />
								{!phoneSize && (
									<TextProvider className='text-sm font-semibold'>IMPORT</TextProvider>
								)}
							</ButtonProvider>
						</div>
						<div
							onClick={() => handleOpenDeleteBulkModal()}
							style={{
								border: '1px solid rgb(208, 213, 221)',
								background: 'white',
								padding: '8px 12px',
								cursor: 'pointer',
							}}>
							<DeleteConfirmation
								buttonProp={{
									title: '',
									width: '18px',
									height: '20px',
									fontSize: '16px',
								}}
								descText={`Are you sure you want to remove these guests?`}
								removeButtonTitle='Remove Guest'
								removeFunc={() => {
									deleteGuestBulkFunc();
								}}
							/>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({
	rows,
	openGuestModal,
	selected,
	setSelected,
	handleSelectAllClick,
	handleOpenImportModal,
	handleOpenDeleteModal,
	handleOpenDeleteBulkModal,
	handleOpenImportBulkModal,
}) {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');
	const [latest, setLatest] = React.useState(true);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(2000);

	const deleteNewGuestBulk = () => {
		console.log('deleteNewGuestBulk');
	};

	const deleteNewGuest = () => {
		console.log('deleteNewGuest');
	};

	//Detecting mobile use
	const phoneSize = useMediaQuery('(max-width:600px)');

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy('name');
	};

	//RSVP Tags
	const invitedRSVP = phoneSize ? (
		<GuestRSVPMobileTag type='invited' />
	) : (
		<GuestRSVPTag type='invited' height='15px' />
	);
	const attendingRSVP = phoneSize ? (
		<GuestRSVPMobileTag type='attending' />
	) : (
		<GuestRSVPTag type='attending' height='18px' />
	);
	const notattendingRSVP = phoneSize ? (
		<GuestRSVPMobileTag type='notattending' />
	) : (
		<GuestRSVPTag type='notattending' height='18px' />
	);
	const maybeRSVP = phoneSize ? (
		<GuestRSVPMobileTag type='maybe' />
	) : (
		<GuestRSVPTag type='maybe' height='20px' />
	);
	const waitingRSVP = <div className='waitingRSVP'></div>;

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const deleteGuestBulkFunc = () => {
		deleteNewGuestBulk(selected, true, () => {
			setSelected([]);
		});
	};

	const deleteSingleGuest = (guestId) => {
		deleteNewGuest(guestId, () => {
			setSelected([]);
		});
	};

	const deleteOpenInviteGuest = (guestId) => {
		handleOpenDeleteModal(guestId);
	};

	const openImportGuestBulkModal = () => {};

	const openImportModal = (newGuestDetail) => {
		handleOpenImportModal(newGuestDetail);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box
			sx={{
				width: '100%',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<div>
				<TableContainer sx={{ maxHeight: '65vh' }}>
					<Table
						stickyHeader
						height='auto'
						aria-label='sticky table'
						sx={!phoneSize ? { minWidth: 900 } : { minWidth: 350 }}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							setOrder={setOrder}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							latest={latest}
							setLatest={setLatest}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy, latest))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											sx={{ cursor: 'pointer' }}
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row?.id}
											selected={isItemSelected}>
											<TableCell
												padding='checkbox'
												// width={!phoneSize ? 'auto' : '3%'}
												onClick={(event) => handleClick(event, row?.id)}>
												<Checkbox
													color='default'
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId,
													}}
												/>
											</TableCell>
											<TableCell
												sx={{
													fontFamily: 'Poppins',
													color: 'rgba(0, 0, 0, 1)',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													maxWidth: '200px',
												}}
												onClick={() => openGuestModal(row)}
												component='th'
												id={labelId}
												width='30%'
												scope='row'
												padding='none'>
												{row?.name}
											</TableCell>
											<TableCell
												width='10%'
												sx={{ fontFamily: 'Poppins' }}
												onClick={() => openGuestModal(row)}
												align='center'>
												<div style={{ display: 'flex', justifyContent: 'center' }}>
													<div
														style={{
															background: '#E4E7EC',
															width: 30,
															height: 30,
															borderRadius: '50%',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
														}}>
														{row?.pax}
													</div>
												</div>
											</TableCell>
											<TableCell
												width={!phoneSize ? '30%' : '10%'}
												sx={{
													fontFamily: 'Poppins',
													textTransform: 'uppercase',
												}}
												onClick={() => openGuestModal(row)}
												align='left'>
												<div style={{ display: 'flex' }}>
													{row?.rsvp === 'invited'
														? invitedRSVP
														: row.rsvp === 'attending'
														? attendingRSVP
														: row.rsvp === 'notattending'
														? notattendingRSVP
														: row.rsvp === 'maybe'
														? maybeRSVP
														: waitingRSVP}
												</div>
											</TableCell>
											<TableCell
												width='30%'
												sx={{
													fontFamily: 'Poppins',
													textTransform: 'uppercase',
												}}
												align='left'>
												<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
													<ButtonProvider
														onClick={() => openImportModal(row)}
														width='50px'
														padding='8px'>
														<ImportIcon />
													</ButtonProvider>
													<div
														style={{
															border: '1px solid rgb(208, 213, 221)',
															background: 'white',
															padding: '8px 12px',
														}}
														onClick={() => {
															deleteOpenInviteGuest(row);
														}}>
														<DeleteConfirmation
															buttonProp={{
																title: '',
																width: '18px',
																height: '18px',
																fontSize: '16px',
															}}
															descText={`Are you sure you want to remove ${row?.name} ?`}
															removeButtonTitle='Remove Guest'
															removeFunc={() => {
																deleteSingleGuest(row?.id);
															}}
														/>
													</div>
												</div>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{selected.length > 0 && (
				<EnhancedTableToolbar
					numSelected={selected.length}
					deleteGuestBulkFunc={deleteGuestBulkFunc}
					openImportGuestBulkModal={openImportGuestBulkModal}
					handleOpenDeleteBulkModal={handleOpenDeleteBulkModal}
					handleOpenImportBulkModal={handleOpenImportBulkModal}
				/>
			)}
			<div style={{ height: '20px' }}></div>
		</Box>
	);
}
