/** @format */

import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';

export default function ResponsiveTimePickers({
	label,
	value,
	dispatchInvite,
	type = 'SET_DATE',
	//For React Hook form props
	control = null,
	name = 'time',
	required = false,
	...props
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			{control ? (
				<Controller
					name={name}
					controls={control}
					rules={{ required: required }}
					defaultValue={moment()}
					render={({ field }) => (
						<TimePicker
							label={label}
							value={moment(field.value)}
							onChange={(date) => field.onChange(moment(date).format())}
							renderInput={(params) => <TextField {...params} />}
							{...props}
						/>
					)}
				/>
			) : (
				<TimePicker
					label={label}
					value={moment(value)}
					onChange={(newValue) => {
						dispatchInvite({ type, payload: moment(newValue).format() });
					}}
					renderInput={(params) => <TextField {...params} />}
					{...props}
				/>
			)}
		</LocalizationProvider>
	);
}
