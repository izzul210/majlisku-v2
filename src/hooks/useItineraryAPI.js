/** @format */

import React, { useState } from 'react';
import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useUserContext } from '../context/UserContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useItineraryAPI = () => {
	const queryClient = useQueryClient();
	const { userId } = useUserContext();

	const addActivity = useMutation({
		mutationFn: async (activityBody) => {
			return addDoc(collection(projectFirestore, 'users', userId, 'activity'), activityBody);
		},
		mutationKey: ['addEventActivity'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['eventActivity'],
			});
		},
		onError: (error) => {
			console.log('addActivity Error:', error);
		},
	});

	const editActivity = useMutation({
		mutationFn: async (activityBody) => {
			return updateDoc(
				doc(projectFirestore, 'users', userId, 'activity', activityBody.id),
				activityBody
			);
		},
		mutationKey: ['editEventActivity'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['eventActivity'],
			});
		},
		onError: (error) => {
			console.log('addActivity Error:', error);
		},
	});

	const deleteActivity = useMutation({
		mutationFn: async (activityId) => {
			return deleteDoc(doc(projectFirestore, 'users', userId, 'activity', activityId));
		},
		mutationKey: ['deleteEventActivity'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['eventActivity'],
			});
		},
		onError: (error) => {
			console.log('addActivity Error:', error);
		},
	});

	return {
		addActivity,
		editActivity,
		deleteActivity,
	};
};
