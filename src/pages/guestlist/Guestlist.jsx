/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Guestlist.scss';
//Context import
import { GuestlistProvider, useGuestlistContext } from '../../context/GuestlistContext';
//Components import
import MyGuestlist from './MyGuestlist';
import OpenInvites from './OpenInvites';
import TabsProvider from '../../components/atom/TabsProvider/TabsProvider';

function Guestlist() {
	return (
		<div className='guestlist-container'>
			<div className='px-4'>
				<TabsProvider />
			</div>
			<div className='guestlist-content flex-1'>
				<Routes>
					<Route exact path='/' element={<MyGuestlist />} />
					<Route exact path='/open' element={<OpenInvites />} />
				</Routes>
			</div>
		</div>
	);
}

export default Guestlist;
