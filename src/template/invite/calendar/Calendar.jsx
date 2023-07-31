/** @format */

import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
//MUI import
import InviteAccordian from '../../../components/invite/InviteAccordian';
import InviteDetailContainer from '../../../components/invite/InviteDetailContainer';

import './Calendar.scss';

export function StaticDatePickerLandscape({ event_date }) {
	const [value, setValue] = useState(event_date);

	useEffect(() => {
		setValue(event_date);
	}, [event_date]);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DateCalendar defaultValue={event_date ? moment(event_date) : moment()} readOnly />
		</LocalizationProvider>
	);
}

export function CalendarAccordian({
	event_date,
	location_info,
	event_time,
	event_title,
	enable_bahasa,
}) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Kalendar' : 'Calendar'} noBorder>
				<StaticDatePickerLandscape event_date={event_date} />
				<div className='flex items-center justify-center my-4'>
					<AddToCalendarButton
						styleLight="--btn-background: #fff; --btn-text: #1E1E1E; --font: Lora, 'Times New Roman', Times, serif;  --btn-shadow: 0px 4px 4px rgba(0, 0, 0, 0);"
						name={event_title}
						buttonStyle='round'
						options={['Apple', 'Google']}
						label={enable_bahasa ? 'SIMPAN DI KALENDAR' : 'ADD TO CALENDAR'}
						location={location_info?.address || 'Majlisku'}
						startDate={moment(event_date).format('YYYY-MM-DD')}
						endDate={moment(event_date).format('YYYY-MM-DD')}
						startTime={moment(event_time?.start).format('HH:mm')}
						endTime={moment(event_time?.end).format('HH:mm')}
						timeZone='Asia/Singapore'></AddToCalendarButton>
				</div>
			</InviteAccordian>
		</div>
	);
}

export function CalendarDefault({
	event_date,
	location_info,
	event_time,
	event_title,
	enable_bahasa,
}) {
	return (
		<div className='w-full'>
			<InviteDetailContainer title={enable_bahasa ? 'Kalendar' : 'Calendar'} noBorder>
				<StaticDatePickerLandscape event_date={event_date} />
				<div className='flex items-center justify-center my-4'>
					<AddToCalendarButton
						styleLight="--btn-background: #fff; --btn-text: #1E1E1E; --font: Lora, 'Times New Roman', Times, serif;  --btn-shadow: 0px 4px 4px rgba(0, 0, 0, 0);"
						name={event_title}
						buttonStyle='round'
						options={['Apple', 'Google']}
						label={enable_bahasa ? 'SIMPAN DI KALENDAR' : 'ADD TO CALENDAR'}
						location={location_info?.address || 'Majlisku'}
						startDate={moment(event_date).format('YYYY-MM-DD')}
						endDate={moment(event_date).format('YYYY-MM-DD')}
						startTime={moment(event_time?.start).format('HH:mm')}
						endTime={moment(event_time?.end).format('HH:mm')}
						timeZone='Asia/Singapore'></AddToCalendarButton>
				</div>
			</InviteDetailContainer>
		</div>
	);
}
