/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//Components import
import TextProvider from '../TextProvider/TextProvider';

export default function BasicSelect({ timeSlot, setTimeSlot }) {
	const handleChange = (event) => {
		setTimeSlot(event.target.value);
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
					value={timeSlot}
					onChange={handleChange}>
					<MenuItem value={11}>
						<TimeSlotCard label={'11:00 AM'} />
					</MenuItem>
					<MenuItem value={14}>
						<TimeSlotCard label={'2:00 PM'} />
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}

const TimeSlotCard = ({ label }) => {
	return (
		<div className='bg-gray-100 w-20 rounded-full'>
			<TextProvider className='text-sm font-semibold uppercase text-center'>{label}</TextProvider>
		</div>
	);
};
