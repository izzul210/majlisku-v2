/** @format */

import React from 'react';
import InviteAccordian from '../../../components/invite/InviteAccordian';
import InviteTextProvider from '../../../components/invite/InviteTextProvider';
import moment from 'moment';
import './Tentative.scss';

const TentativeContainer = ({ activities }) => {
	return (
		<div className='py-2'>
			{activities?.map((activity, index) => {
				return (
					<div className='yes_activity' key={index}>
						<div className='date'>
							<InviteTextProvider color='#98A2B3' className='font-normal text-sm'>
								{moment(activity.date).format('h:mm A')}
							</InviteTextProvider>
						</div>
						<div className='activity_detail'>
							<InviteTextProvider className='activity_title font-medium text-sm'>
								{activity.title}
							</InviteTextProvider>
							<InviteTextProvider className='activity_description  font-normal text-sm'>
								{activity.description}
							</InviteTextProvider>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export function TentativeAccordian({ activities = [], enable_bahasa }) {
	return (
		<div className='w-full itinerary_activity'>
			<InviteAccordian title={enable_bahasa ? 'Tentatif' : ' Tentative'}>
				<TentativeContainer activities={activities} />
			</InviteAccordian>
		</div>
	);
}
