/** @format */

import moment from 'moment';

export const useCalculation = () => {
	const calculateAge = (birthday) => {
		const age = moment().diff(birthday, 'years');
		return age;
	};

	const calculateBMI = (weight, height) => {
		const bmi = weight / ((height / 100) * (height / 100));
		return bmi;
	};

	const calculateEventCountDown = (eventDate) => {
		let now = moment(new Date());
		let end = moment(eventDate);
		let duration = moment.duration(end.diff(now));
		let weeks = duration.asWeeks();
		let days = (weeks - Math.trunc(weeks * 1) / 1) * 7;
		let hours = (days - Math.trunc(days * 1) / 1) * 24;

		let eventCountDown = {
			weeks: Math.trunc(weeks * 1) / 1,
			days: Math.trunc(days * 1) / 1,
			hours: Math.trunc(hours * 1) / 1,
		};

		return eventCountDown;
	};

	return { calculateAge, calculateBMI, calculateEventCountDown };
};
