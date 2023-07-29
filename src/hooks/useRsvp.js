/** @format */

import { useState } from 'react';
import moment from 'moment';
import {
	doc,
	updateDoc,
	addDoc,
	deleteDoc,
	collection,
	writeBatch,
	setDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { projectFirestore, projectStorage } from '../firebase/config';
import { useUserContext } from '../context/UserContext';

export const useRsvp = () => {
	const { userId, userData, getUserData } = useUserContext();
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const updateUserRsvp = async (rsvpDetails, postRequestFunc) => {
		setIsPending(true);

		/*********** Step 1: Upload Image and get URL (if user upload image) */
		const { qrCode_image_file, rsvp_header_image_file } = rsvpDetails;

		let newQrCodeUrl = null;
		let new_rsvp_header_image = null;

		const metadata = {
			contentType: 'image/jpeg',
		};

		if (rsvp_header_image_file) {
			const rsvpHeaderImgRef = ref(projectStorage, `thumbnails/${userId}/rsvp/rsvpImage`);
			const rsvpHeaderImg = await uploadBytes(rsvpHeaderImgRef, rsvp_header_image_file, metadata);
			new_rsvp_header_image = await getDownloadURL(rsvpHeaderImg.ref);
		}

		if (qrCode_image_file) {
			const qrUploadRef = ref(projectStorage, `thumbnails/${userId}/rsvp/qrImage`);
			const qrCodeImg = await uploadBytes(qrUploadRef, qrCode_image_file, metadata);
			newQrCodeUrl = await getDownloadURL(qrCodeImg.ref);
		}

		/*********** Step 2: Update Money Gift Details to include new Qr code URL */
		let moneyGiftDetails = {
			accNum: rsvpDetails.money_gift_details.accNum,
			bankName: rsvpDetails.money_gift_details.bankName,
			name: rsvpDetails.money_gift_details.name,
			qrCodeUrl: newQrCodeUrl || rsvpDetails.money_gift_details.qrCodeUrl,
		};

		/*********** Step 3: Update rsvp details */

		let updatedRsvpDetails = {
			contact_info: rsvpDetails.contact_info,
			description: rsvpDetails.description,
			enable_bahasa: rsvpDetails.enable_bahasa,
			enable_gift_registry: rsvpDetails.enable_gift_registry,
			enable_itinerary: rsvpDetails.enable_itinerary,
			enable_money_gift: rsvpDetails.enable_money_gift,
			enable_unlimited_pax: rsvpDetails.enable_unlimited_pax,
			enable_wishes: rsvpDetails.enable_wishes,
			event_address: rsvpDetails.event_address,
			event_date: rsvpDetails.event_date,
			event_location: rsvpDetails.event_location,
			event_time: rsvpDetails.event_time,
			event_title_1: rsvpDetails.event_title_1,
			event_title_2: rsvpDetails.event_title_2,
			greeting_1: rsvpDetails.greeting_1,
			greeting_2: rsvpDetails.greeting_2,
			greeting_title: rsvpDetails.greeting_title,
			guest_pax_limit: rsvpDetails.guest_pax_limit,
			host_details: rsvpDetails.host_details,
			location_info: rsvpDetails.location_info,
			italic_title: rsvpDetails.italic_title,
			money_gift_details: moneyGiftDetails,
			rsvp_header_image: new_rsvp_header_image
				? new_rsvp_header_image
				: rsvpDetails.rsvp_header_image,
			delivery_address: rsvpDetails.delivery_address,
			thank_you_text: rsvpDetails.thank_you_text,
			enable_multiple_slot: rsvpDetails.enable_multiple_slot,
		};

		/*********** Step 4: Update doc in Firebase */
		let userDataUpdate = {
			eventDetails: updatedRsvpDetails,
		};

		try {
			await updateDoc(doc(projectFirestore, 'users', userId), userDataUpdate);
			postRequestFunc();
			getUserData(userId);
			setIsPending(false);
		} catch (error) {
			console.log(error);
			setError(error);
			setIsPending(false);
		}
	};

	return {
		updateUserRsvp,
		isCancelled,
		error,
		isPending,
	};
};
