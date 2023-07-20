/** @format */

import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import ButtonBase from '@mui/material/ButtonBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//Component imprt
import TextProvider from '../TextProvider/TextProvider';
import { CreateNewGroupModal } from '../../../pages/guestlist/MyGuestlist';
//Context import
import { useGuestlistContext } from '../../../context/GuestlistContext';
//Icons import
import { PlusIcon } from '../../../components/icons/actionIcons';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 350,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const style = {
	maxWidth: '140px',
	background:
		'linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), rgb(156, 109, 234)',
};

const GroupTag = ({ label }) => {
	return (
		<div className='whitespace-nowrap px-4 py-1 rounded-full truncate' style={style}>
			<TextProvider className='text-sm font-semibold uppercase'>{label}</TextProvider>
		</div>
	);
};

export default function MultipleSelectChip({ group, setGroup }) {
	const theme = useTheme();
	const { groupList } = useGuestlistContext();
	const [addGroupModal, setAddGroupModal] = useState(false);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;

		const filteredArray = value.filter((element) => element !== 0);

		setGroup(typeof filteredArray === 'string' ? filteredArray.split(',') : filteredArray);
	};

	const renderSelectedTags = (selected) => (
		<div className='flex gap-2 flex-wrap'>
			{selected.map((value) => (
				<GroupTag key={value} label={value} />
			))}
		</div>
	);

	const renderNoGroupFound = () => (
		<TextProvider className='text-center italic'>No group found</TextProvider>
	);

	return (
		<div className='w-full'>
			<FormControl sx={{ width: '100%' }}>
				<Select
					labelId='demo-multiple-chip-label'
					id='demo-multiple-chip'
					multiple
					value={group}
					onChange={handleChange}
					input={
						<OutlinedInput
							id='select-multiple-chip'
							placeholder='Select Group'
							sx={{
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'rgba(208, 213, 221, 1)',
								},
							}}
							fullWidth={true}
						/>
					}
					renderValue={renderSelectedTags}
					MenuProps={MenuProps}>
					{groupList
						? groupList?.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, group, theme)}>
									<TextProvider className='uppercase'>{name}</TextProvider>
								</MenuItem>
						  ))
						: renderNoGroupFound()}
					<ButtonBase className='w-full' value={0} onClick={() => setAddGroupModal(true)}>
						<TextProvider className='text-base border-t border-gray-200 p-4 w-full justify-end flex-row flex items-center gap-2 font-semibold uppercase text-right'>
							<PlusIcon width={24} height={24} />
							New Group
						</TextProvider>
					</ButtonBase>
				</Select>
			</FormControl>
			<CreateNewGroupModal isOpen={addGroupModal} handleCancel={() => setAddGroupModal(false)} />
		</div>
	);
}
