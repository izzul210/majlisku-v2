/** @format */

import { useUserData } from './useFetchAPI';
import { useUserContext } from '../context/UserContext';
import { useInviteThemePurchases, useUserThemePurchases } from './useFetchAPI';

export const useUserLogic = () => {
	const { design_details } = useUserContext() || {};
	const { data: userInfo } = useUserData() || {};

	const checkIfUserHasSelectedTheme = () => {
		if (design_details?.id) {
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

export const hasUserPurchasedTheme = (id) => {
	const { data: themePurchases } = useInviteThemePurchases(id);

	if (id <= 3) {
		return true;
	}

	return themePurchases?.length > 0;
};

export const hasUserPurchaseThisTheme = (id) => {
	const { data: themePurchasedByUser } = useUserThemePurchases();

	if (id <= 3) {
		return true;
	}

	const exists = themePurchasedByUser?.some((object) => object.id === `${id}`);

	if (exists) {
		return true;
	}
	return false;
};
