/** @format */

import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputField from '../InputField/InputField';

export default function DatePickerSet({ value, setValue, ...props }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DatePicker
				value={moment(value)}
				onChange={(newValue) => {
					setValue(moment(newValue).format('YYYY-MM-DD'));
				}}
				slotProps={{ textField: { variant: 'outlined' } }}
				{...props}
			/>
		</LocalizationProvider>
	);
}
