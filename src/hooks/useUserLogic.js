/** @format */

import { useUserData } from './useFetchAPI';

export const useUserLogic = () => {
	const { data: userInfo } = useUserData() || {};

	const checkIfUserHasSelectedTheme = () => {
		if (userInfo?.type || userInfo?.design_num) {
			return true;
		} else {
			return false;
		}
	};

	const checkIfUserHasEventDetails = () => {
		if (userInfo?.eventDetails) {
			return true;
		} else {
			return false;
		}
	};

	const sanitizeOldTheme = (design) => {
		if (design === 'default') return 3;
		else if (design === 'minimal1') return 2;
		else if (design === 'minimal2') return 1;
		else return design;
	};

	return {
		checkIfUserHasSelectedTheme,
		checkIfUserHasEventDetails,
		sanitizeOldTheme,
	};
};
