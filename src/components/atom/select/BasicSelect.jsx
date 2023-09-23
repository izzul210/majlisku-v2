/** @format */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useUserContext } from '../../../context/UserContext';
import moment from 'moment';
//Components import
import TextProvider from '../TextProvider/TextProvider';

export default function BasicSelect({ timeSlot, setTimeSlot }) {
	//Extract timeslot 1 and 2
	const { userData } = useUserContext();

	const timeSlot_1 = userData?.eventDetails?.event_time?.start;
	const timeSlot_2 = userData?.eventDetails?.event_time_slot_2;
	const formatted_timeSlot_1 = moment(timeSlot_1).format('h:mm A');
	const formatted_timeSlot_2 = moment(timeSlot_2).format('h:mm A');

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
					<MenuItem value={timeSlot_1}>
						<TimeSlotCard label={formatted_timeSlot_1} />
					</MenuItem>
					<MenuItem value={timeSlot_2}>
						<TimeSlotCard label={formatted_timeSlot_2} />
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
