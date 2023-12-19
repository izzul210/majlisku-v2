/** @format */
//Firebase stuff
import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { projectFirestore, projectStorage } from '../firebase/config';

//user context
import { useUserContext } from '../context/UserContext';
import { useUserData } from './useFetchAPI';
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
			});
			queryClient.invalidateQueries({
				queryKey: ['guestlist'],
			});
			queryClient.invalidateQueries({
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
			});
			queryClient.invalidateQueries({
				queryKey: ['guestlist'],
			});
			queryClient.invalidateQueries({
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
	const { data: userData } = useUserData();

	const savePreviewDetails = useMutation({
		mutationFn: async (body) => {
			/*********** Step 1: Upload Image and get URL (if user upload image) */
			const { qrCode_image_file, rsvp_header_image_file } = body;

			let newQrCodeUrl = body.money_gift_details?.qrCodeUrl
				? body.money_gift_details?.qrCodeUrl
				: null;
			let new_rsvp_header_image = null;

			const metadata = {
				contentType: 'image/jpeg',
			};

			if (rsvp_header_image_file) {
				const rsvpHeaderImgRef = ref(projectStorage, `thumbnails/${userId}/rsvp/previewImage`);
				const rsvpHeaderImg = await uploadBytes(rsvpHeaderImgRef, rsvp_header_image_file, metadata);
				new_rsvp_header_image = await getDownloadURL(rsvpHeaderImg.ref);
			}

			if (qrCode_image_file) {
				const qrUploadRef = ref(projectStorage, `thumbnails/${userId}/rsvp/previewQrImage`);
				const qrCodeImg = await uploadBytes(qrUploadRef, qrCode_image_file, metadata);
				newQrCodeUrl = await getDownloadURL(qrCodeImg.ref);
			}

			/*********** Step 2: Update Money Gift Details to include new Qr code URL */
			let moneyGiftDetails = {
				accNum: body.money_gift_details.accNum,
				bankName: body.money_gift_details.bankName,
				name: body.money_gift_details.name,
				qrCodeUrl: newQrCodeUrl,
			};

			/*********** Step 3: Update rsvp details */
			let updatedRsvpDetails = {
				//General
				enable_bahasa: body.enable_bahasa,
				//EventDetails
				event_title_1: body.event_title_1,
				italic_title: body.italic_title,
				optional_description: body.optional_description,
				rsvp_header_image: new_rsvp_header_image ? new_rsvp_header_image : body.rsvp_header_image,
				description: body.description,
				//DateTime
				event_date: body.event_date,
				event_time: body.event_time,
				enable_multiple_slots: body.enable_multiple_slots,
				event_time_slot_2: body.event_time_slot_2,
				enable_deadline: body.enable_deadline,
				event_date_deadline: body.event_date_deadline,
				//LocationMap
				event_address: body.event_address,
				location_info: body.location_info,
				//Greeting
				event_opening_title: body.event_opening_title,
				host_details: body.host_details,
				greeting_1: body.greeting_1,
				greeting_title: body.greeting_title,
				greeting_2: body.greeting_2,
				event_title_2: body.event_title_2,
				//GuestPax
				enable_unlimited_pax: body.enable_unlimited_pax,
				guest_pax_limit: body.guest_pax_limit,
				//ContactInformation
				contact_info: body.contact_info,
				//Tentative
				enable_itinerary: body.enable_itinerary,
				//Wishes
				enable_wishes: body.enable_wishes,
				//GiftRegistry
				enable_gift_registry: body.enable_gift_registry,
				delivery_address: body.delivery_address,
				thank_you_text: body.thank_you_text,
				//MoneyGift
				enable_money_gift: body.enable_money_gift,
				money_gift_details: moneyGiftDetails,
				//Misc
				event_location: body.event_location,
			};

			let userDataUpdate = {
				previewDetails: updatedRsvpDetails,
			};

			return updateDoc(doc(projectFirestore, 'users', userId), userDataUpdate);
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
			/*********** Step 1: Upload Image and get URL (if user upload image) */
			const { qrCode_image_file, rsvp_header_image_file } = body;

			let newQrCodeUrl = body.money_gift_details?.qrCodeUrl
				? body.money_gift_details?.qrCodeUrl
				: null;
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
				accNum: body.money_gift_details.accNum,
				bankName: body.money_gift_details.bankName,
				name: body.money_gift_details.name,
				qrCodeUrl: newQrCodeUrl,
			};

			/*********** Step 3: Update rsvp details */
			let updatedRsvpDetails = {
				//General
				enable_bahasa: body.enable_bahasa,
				//EventDetails
				event_title_1: body.event_title_1,
				italic_title: body.italic_title,
				optional_description: body.optional_description,
				rsvp_header_image: new_rsvp_header_image ? new_rsvp_header_image : body.rsvp_header_image,
				description: body.description,
				//DateTime
				event_date: body.event_date,
				event_time: body.event_time,
				enable_multiple_slots: body.enable_multiple_slots,
				event_time_slot_2: body.event_time_slot_2,
				enable_deadline: body.enable_deadline,
				event_date_deadline: body.event_date_deadline,
				//LocationMap
				event_address: body.event_address,
				location_info: body.location_info,
				//Greeting
				event_opening_title: body.event_opening_title,
				host_details: body.host_details,
				greeting_1: body.greeting_1,
				greeting_title: body.greeting_title,
				greeting_2: body.greeting_2,
				event_title_2: body.event_title_2,
				//GuestPax
				enable_unlimited_pax: body.enable_unlimited_pax,
				guest_pax_limit: body.guest_pax_limit,
				//ContactInformation
				contact_info: body.contact_info,
				//Tentative
				enable_itinerary: body.enable_itinerary,
				//Wishes
				enable_wishes: body.enable_wishes,
				//GiftRegistry
				enable_gift_registry: body.enable_gift_registry,
				delivery_address: body.delivery_address,
				thank_you_text: body.thank_you_text,
				//MoneyGift
				enable_money_gift: body.enable_money_gift,
				money_gift_details: moneyGiftDetails,
				//Misc
				event_location: body.event_location,
			};

			let userDataUpdate = {
				eventDetails: updatedRsvpDetails,
				previewDetails: updatedRsvpDetails,
			};

			return updateDoc(doc(projectFirestore, 'users', userId), userDataUpdate);
		},
		mutationKey: ['saveEventDetails'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userData'],
			});
		},
		onError: (error) => {
			console.log('saveEventDetails Error:', error);
		},
	});

	const saveInviteId = useMutation({
		mutationFn: async (body) => {
			let updatedData = {
				inviteId: body.inviteId.toLowerCase(),
			};

			return updateDoc(doc(projectFirestore, 'users', userId), updatedData);
		},
		mutationKey: ['saveInviteId'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userData'],
			});
		},
		onError: (error) => {
			console.log('saveInviteId Error:', error);
		},
	});

	const saveMetadataDetails = useMutation({
		mutationFn: async (body) => {
			console.log('metadata body:', body);

			const { imageFile } = body;

			let photoURL = userData?.metadata?.photoURL ? userData?.metadata?.photoURL : null;

			const metadata = {
				contentType: 'image/jpeg',
			};

			if (imageFile) {
				const metadataImgRef = ref(projectStorage, `thumbnails/${userId}/rsvp/metadataImage`);
				const metadataImg = await uploadBytes(metadataImgRef, imageFile, metadata);
				photoURL = await getDownloadURL(metadataImg.ref);
			}

			let updatedData = {
				metadata: {
					title: body.title,
					description: body.description,
					photoURL: photoURL,
				},
			};

			return updateDoc(doc(projectFirestore, 'users', userId), updatedData);
		},
		mutationKey: ['saveInviteId'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userData'],
			});
		},
		onError: (error) => {
			console.log('saveMetadataDetails Error:', error);
		},
	});

	const savePersonalMessage = useMutation({
		mutationFn: async (body) => {
			//id, from = body
			return updateDoc(doc(projectFirestore, 'users', userId), {
				personalMessage: body.personalMessage,
			});
		},
		mutationKey: ['savePersonalMessage'],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['userData'],
			});
		},
		onError: (error) => {
			console.log('savePersonalMessage Error:', error);
		},
	});

	return {
		saveRsvpDetails,
		savePreviewDetails,
		saveInviteId,
		saveMetadataDetails,
		savePersonalMessage,
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
