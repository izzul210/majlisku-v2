/** @format */

import * as React from 'react';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

export default function DatePickerProvider({
	value,
	dispatchInvite,
	type = 'SET_DATE',
	defaultValue = moment().format('YYYY-MM-DD'),
	//For React Hook Form props
	control = null,
	name = 'date',
	required = false,
	...props
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			{control ? (
				<Controller
					name={name}
					controls={control}
					rules={{ requred: required }}
					defaultValue={defaultValue}
					render={({ field }) => (
						<DatePicker
							value={moment(field.value)}
							onChange={(date) => field.onChange(moment(date).format('YYYY-MM-DD'))}
							slotProps={{ textField: { variant: 'outlined' } }}
							{...props}
						/>
					)}
				/>
			) : (
				<DatePicker
					value={moment(value)}
					onChange={(newValue) => {
						dispatchInvite({ type, payload: moment(newValue).format('YYYY-MM-DD') });
					}}
					slotProps={{ textField: { variant: 'outlined' } }}
					{...props}
				/>
			)}
		</LocalizationProvider>
	);
}
