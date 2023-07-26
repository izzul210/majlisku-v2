/** @format */

import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { TableVirtuoso } from 'react-virtuoso';
import { useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
//Component import
import TextProvider from '../atom/TextProvider/TextProvider';
import ButtonProvider from '../atom/ButtonProvider/ButtonProvider';
import { EditIcon, DropDownIcon, DeleteIcon, ImportIcon } from '../icons/actionIcons';
import { GuestRSVPTag, GuestRSVPMobileTag } from '../atom/tags/Tag';
//Hokes import
import { useGuestlistMigration } from '../../hooks/useMigration';

const columns = [
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

const VirtuosoTableComponents = {
	Scroller: React.forwardRef((props, ref) => (
		<TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => (
		<Table
			{...props}
			sx={{ borderCollapse: 'separate', tableLayout: 'fixed', minWidth: '600px' }}
		/>
	),
	TableHead,
	TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
	TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(
	rowCount,
	numSelected,
	onSelectAllClick,
	order,
	orderBy,
	latest,
	setLatest,
	setOrder,
	onRequestSort,
	phoneSize
) {
	const activeStyle = { fontWeight: '500', color: 'black', cursor: 'pointer', fontSize: 12 };
	const normalStyle = { fontWeight: '500', cursor: 'pointer', fontSize: 12 };

	return (
		<TableRow>
			<TableCell padding='checkbox' sx={{ background: 'white' }}>
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
			{columns.map((column) => (
				<TableCell
					key={column.id}
					variant='head'
					align={column.id === 'pax' ? 'center' : 'left'}
					padding={column.disablePadding ? 'none' : 'normal'}
					style={{ width: column.width }}
					sortDirection={orderBy === column.id ? order : false}
					sx={{
						backgroundColor: 'background.paper',
					}}>
					{column.id === 'name' ? (
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
							{column.label}
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
								whiteSpace: 'nowrap',
							}}>
							{column.label}
						</div>
					)}
				</TableCell>
			))}
		</TableRow>
	);
}

function rowContent(
	_index,
	row,
	phoneSize,
	handleClick,
	isSelected,
	openGuestModal,
	openImportModal,
	deleteOpenInviteGuest
) {
	const { migrateGroup } = useGuestlistMigration();

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

	const isItemSelected = isSelected(row.id);
	const labelId = `enhanced-table-checkbox-${_index}`;

	return (
		<React.Fragment>
			<TableCell padding='checkbox' onClick={(event) => handleClick(event, row?.id)}>
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
				width={'30%'}
				scope='row'
				padding='none'>
				{row?.name}
			</TableCell>
			<TableCell
				width='6%'
				sx={{ fontFamily: 'Poppins', cursor: 'pointer' }}
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
					cursor: 'pointer',
				}}
				onClick={() => openGuestModal(row)}
				align='left'>
				<div className='flex text-xs'>
					{row?.rsvp === 'invited'
						? invitedRSVP
						: row.rsvp === 'attending'
						? attendingRSVP
						: row.rsvp === 'notattending'
						? notattendingRSVP
						: row.rsvp === 'maybe'
						? maybeRSVP
						: ''}
				</div>
			</TableCell>
			<TableCell
				sx={{
					fontFamily: 'Poppins',
					textTransform: 'uppercase',
					color: '#475467',
					cursor: 'pointer',
				}}
				onClick={() => openGuestModal(row)}
				align='left'>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
					<ButtonProvider onClick={() => openImportModal(row)} width='50px' padding='8px'>
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
						<DeleteIcon />
					</div>
				</div>
			</TableCell>
		</React.Fragment>
	);
}

const EnhancedTableToolbar = (props) => {
	const { numSelected, deleteGuestBulkFunc, handleOpenDeleteBulkModal, handleOpenImportBulkModal } =
		props;
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
					component='div'>
					{numSelected} selected
				</Typography>
			) : (
				<></>
			)}

			{numSelected > 0 ? (
				<div style={!phoneSize ? { marginRight: 20 } : { marginRight: 8, padding: '8px 0px' }}>
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
							<DeleteIcon />
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

export default function ReactVirtualizedTable({
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

	const phoneSize = useMediaQuery('(max-width:600px)');

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy('name');
	};

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

	const deleteGuestBulkFunc = () => {
		confirmGuestBulkDeleteModal();
	};

	const deleteOpenInviteGuest = (guestId) => {
		handleOpenDeleteModal(guestId);
	};

	const openImportModal = (newGuestDetail) => {
		handleOpenImportModal(newGuestDetail);
	};

	const openImportGuestBulkModal = () => {};

	const isSelected = (name) => selected?.indexOf(name) !== -1;

	const data = stableSort(rows, getComparator(order, orderBy, latest));

	return (
		<Paper
			style={{
				height: 600,
				width: '100%',
				boxShadow: '0px 0px 0px black',
			}}>
			{selected.length > 0 && (
				<EnhancedTableToolbar
					numSelected={selected.length}
					deleteGuestBulkFunc={deleteGuestBulkFunc}
					openImportGuestBulkModal={openImportGuestBulkModal}
					handleOpenDeleteBulkModal={handleOpenDeleteBulkModal}
					handleOpenImportBulkModal={handleOpenImportBulkModal}
				/>
			)}
			<TableVirtuoso
				data={data}
				components={VirtuosoTableComponents}
				fixedHeaderContent={() =>
					fixedHeaderContent(
						rows.length,
						selected?.length,
						handleSelectAllClick,
						order,
						orderBy,
						latest,
						setLatest,
						setOrder,
						handleRequestSort,
						phoneSize
					)
				}
				itemContent={(index, user) =>
					rowContent(
						index,
						user,
						phoneSize,
						handleClick,
						isSelected,
						openGuestModal,
						openImportModal,
						deleteOpenInviteGuest
					)
				}
			/>
		</Paper>
	);
}
