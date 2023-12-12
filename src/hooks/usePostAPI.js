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
