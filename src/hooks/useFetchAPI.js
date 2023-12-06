/** @format */

import { useQuery } from '@tanstack/react-query';
import { projectFirestore, projectAuth } from '../firebase/config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';

export const useUserData = () => {
	const { userId } = useUserContext();

	const { isLoading, error, data } = useQuery({
		queryKey: ['userData'],
		queryFn: async () => {
			const docRef = doc(projectFirestore, 'users', userId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.log('No such document!');
			}
		},
		enabled: !!userId,
	});

	return {
		isLoading,
		error,
		data,
	};
};
