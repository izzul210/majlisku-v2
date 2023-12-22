/** @format */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//Components import
import { GuestDetailContent } from './GuestDetail';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
//Context import
import { useGuestlistContext } from '../../context/GuestlistContext';
//Icon import
import { BackIcon } from '../../components/icons/actionIcons';

function OpenInviteGuestDetailPage() {
	const { newguestlist } = useGuestlistContext();
	const [guestDetails, setGuestDetails] = useState(null);
	let navigate = useNavigate();
	let { id } = useParams();

	useEffect(() => {
		if (newguestlist) {
			let guest = newguestlist.find((guest) => guest.id === id);
			setGuestDetails(guest);
		}
	}, [id, newguestlist]);

	const topBarStyle = {
		background: 'linear-gradient(180deg, #FFDBCF 0%, #FFF 100%)',
	};

	return (
		<div className='bg-white overflow-x-hidden min-h-screen w-full'>
			<div style={topBarStyle}>
				<div className='px-6 py-12 flex gap-5 items-center justify-between  w-full'>
					<div onClick={() => navigate(-1)} className='cursor-pointer'>
						<BackIcon width={24} height={24} />
					</div>
				</div>
				<TextProvider fontFamily='lora' className='text-2xl font-semibold text-left px-6'>
					{guestDetails?.name}
				</TextProvider>
			</div>

			<div>
				{guestDetails ? (
					<GuestDetailContent
						guestDetails={guestDetails}
						openInvite
						handleCloseMainModal={() => {
							navigate(-1);
						}}
					/>
				) : null}
			</div>
		</div>
	);
}

export default OpenInviteGuestDetailPage;
