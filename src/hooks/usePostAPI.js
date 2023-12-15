/** @format */

import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useUserContext } from '../context/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostGuestWishes = () => {
	const queryClient = useQueryClient();
	const { userId } = useUserContext();

	const hideWishInInvite = useMutation({
		mutationFn: async (body) => {
			//id, from = body
			return updateDoc(doc(projectFirestore, 'users', userId, body.from, body.id), {
				hideWish: true,
			});
		},
		mutationKey: ['hideWishInInvite'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['newGuestlist'],
				queryKey: ['guestlist'],
				queryKey: ['guestwishes'],
			});
		},
		onError: (error) => {
			console.log('hideWishInInvite Error:', error);
		},
	});

	const showWishInInvite = useMutation({
		mutationFn: async (body) => {
			return updateDoc(doc(projectFirestore, 'users', userId, body.from, body.id), {
				hideWish: false,
			});
		},
		mutationKey: ['showWishInInvite'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['newGuestlist'],
				queryKey: ['guestlist'],
				queryKey: ['guestwishes'],
			});
		},
		onError: (error) => {
			console.log('showWishInInvite Error:', error);
		},
	});

	return {
		hideWishInInvite,
		showWishInInvite,
	};
};

export const usePostRsvp = () => {
	const queryClient = useQueryClient();
	const { userId } = useUserContext();

	const savePreviewDetails = useMutation({
		mutationFn: async (body) => {
			return body;
		},
		mutationKey: ['savePreviewDetails'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userData'],
			});
		},
		onError: (error) => {
			console.log('savePreviewDetails Error:', error);
		},
	});

	const saveRsvpDetails = useMutation({
		mutationFn: async (body) => {
			return body;
		},
		mutationKey: ['saveRsvpDetails'],
	});

	return {
		saveRsvpDetails,
	};
};

export const useSelectTheme = () => {
	const queryClient = useQueryClient();
	const { userId } = useUserContext();

	const selectTheme = useMutation({
		mutationFn: async (body) => {
			//id, from = body
			return updateDoc(doc(projectFirestore, 'users', userId), {
				design_num: body.id,
			});
		},
		mutationKey: ['selectTheme'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userData'],
			});
		},
		onError: (error) => {
			console.log('useSelectTheme Error:', error);
		},
	});

	return {
		selectTheme,
	};
};
