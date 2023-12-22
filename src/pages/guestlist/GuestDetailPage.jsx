/** @format */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//Components import
import { GuestDetailContent } from './GuestDetail';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
//Context import
import { useGuestlistContext } from '../../context/GuestlistContext';
//Icon import
import { EditIcon, BackIcon } from '../../components/icons/actionIcons';

function GuestDetailPage() {
	const { guestlist } = useGuestlistContext();
	const [guestDetails, setGuestDetails] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		if (guestlist) {
			let guest = guestlist.find((guest) => guest.id === id);
			setGuestDetails(guest);
		}
	}, [id, guestlist]);

	const topBarStyle = {
		background: 'linear-gradient(180deg, #FFDBCF 0%, #FFF 100%)',
	};

	function handleEditGuest() {
		navigate(`/guestlist/edit/${id}`);
	}

	return (
		<div className='bg-white overflow-x-hidden w-full min-h-screen'>
			<div style={topBarStyle}>
				<div className='px-6 py-12 flex gap-5 items-center justify-between w-full'>
					<div onClick={() => navigate(-1)} className='cursor-pointer'>
						<BackIcon width={24} height={24} />
					</div>
					<div onClick={handleEditGuest} className='cursor-pointer'>
						<EditIcon width={24} height={24} fill='#1D4648' />
					</div>
				</div>
				<TextProvider fontFamily='lora' className='text-2xl font-semibold text-left px-6'>
					{guestDetails?.name}
				</TextProvider>
			</div>

			<div>{guestDetails ? <GuestDetailContent guestDetails={guestDetails} /> : null}</div>
		</div>
	);
}

export default GuestDetailPage;
