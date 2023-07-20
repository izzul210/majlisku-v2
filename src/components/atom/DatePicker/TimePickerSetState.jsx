/** @format */

import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function ResponsiveTimePickers({ label, value, setValue }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<TimePicker
				label={label}
				value={moment(value)}
				onChange={(newValue) => {
					setValue(moment(newValue).format());
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
}
