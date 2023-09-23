/** @format */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useUserContext } from '../../../context/UserContext';
//Components import
import TextProvider from '../TextProvider/TextProvider';

const vendorCategoryList = [
	'venue',
	'caterer',
	'photographer',
	'make up artist',
	'brideswear',
	'planner',
	'door gift',
	'groom wear',
	'videographer',
	'cake',
	'florist',
	'music',
	'decor',
	'misc',
];

export default function VendorCategorySelect({ category, setCategory }) {
	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<Select
					sx={{
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: 'rgba(208, 213, 221, 1)', // Replace "red" with your desired border color
						},
					}}
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={category}
					onChange={handleChange}>
					{vendorCategoryList?.map((item) => (
						<MenuItem key={item} value={item}>
							<TextProvider className='uppercase'>{item}</TextProvider>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}
