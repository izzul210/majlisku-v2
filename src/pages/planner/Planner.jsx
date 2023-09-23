/** @format */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Planner.scss';
//Context import
//Components import
import Checklist from './Checklist';
import Vendor from './Vendor';
import PlannerTabsProvider from '../../components/atom/TabsProvider/PlannerTabsProvider';

function Planner() {
	return (
		<div className='planner-container'>
			<div className='px-4'>
				<PlannerTabsProvider />
			</div>
			<div className='guestlist-content flex-1'>
				<Routes>
					<Route exact path='/' element={<Checklist />} />
					<Route exact path='/vendor' element={<Vendor />} />
				</Routes>
			</div>
		</div>
	);
}

export default Planner;
