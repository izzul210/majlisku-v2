/** @format */
import moment from 'moment';
import { useUserContext } from '../context/UserContext';

export const useFormatTimeSlot = () => {
	const { userData } = useUserContext();

	const formatTimeSlot = (guestDetail) => {
		const timeSlot_1 = userData?.eventDetails?.event_time?.start;
		const timeSlot_2 = userData?.eventDetails?.event_time_slot_2;

		const guestTimeSlot = guestDetail?.timeSlot
			? guestDetail?.timeSlot
			: guestDetail?.response?.timeSlot
			? guestDetail?.response?.timeSlot
			: null;

		if (guestTimeSlot == 1) return moment(timeSlot_1).format('h:mma');
		else if (guestTimeSlot == 2) return moment(timeSlot_2).format('h:mma');
		else return moment(guestTimeSlot).format('h:mma');
	};

	return {
		formatTimeSlot,
	};
};
