/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import { OnboardingProvider, OnboardingCheckCard } from './Onboarding';
//Context import
import { useOnboardingContext, useOnbardingDispatchContext } from '../../context/OnboardingContext';

const Onboarding_4 = () => {
	let navigate = useNavigate();
	const { guestGroups } = useOnboardingContext();
	const dispatch = useOnbardingDispatchContext();

	//Check if the event nature is already selected
	const isGuestGroupSelected = (group) => {
		return guestGroups?.includes(group);
	};

	const handleClickCard = (group) => {
		if (isGuestGroupSelected(group)) {
			dispatch({ type: 'REMOVE_GUEST_GROUP', payload: group });
		} else {
			dispatch({ type: 'ADD_GUEST_GROUP', payload: group });
		}
	};

	return (
		<OnboardingProvider step={4}>
			<div className='onboarding-card'>
				<div className='onboarding-card-title text-gray-900'>Who are your guest consist of?</div>
				<div className='normal-text'>You can choose more than 1</div>
				<div className='nature-event-container'>
					<div className='container-row'>
						<OnboardingCheckCard
							title='Close Friends'
							checked={isGuestGroupSelected('Close Friends')}
							onClick={() => handleClickCard('Close Friends')}
						/>
						<OnboardingCheckCard
							title='Family Members'
							checked={isGuestGroupSelected('Family Members')}
							onClick={() => handleClickCard('Family Members')}
						/>
					</div>
					<div className='container-row'>
						<OnboardingCheckCard
							title='Schoolmates or Alumni'
							checked={isGuestGroupSelected('Schoolmates or Alumni')}
							onClick={() => handleClickCard('Schoolmates or Alumni')}
						/>
						<OnboardingCheckCard
							title='Neighbors'
							checked={isGuestGroupSelected('Neighbors')}
							onClick={() => handleClickCard('Neighbors')}
						/>
					</div>
					<div className='container-row'>
						<OnboardingCheckCard
							title='VIPS or Special Guests'
							checked={isGuestGroupSelected('VIPS or Special Guests')}
							onClick={() => handleClickCard('VIPS or Special Guests')}
						/>
						<OnboardingCheckCard
							title='Children'
							checked={isGuestGroupSelected('Children')}
							onClick={() => handleClickCard('Children')}
						/>
					</div>
					<div className='container-row'>
						<OnboardingCheckCard
							title='Co-Workers'
							checked={isGuestGroupSelected('Co-Workers')}
							onClick={() => handleClickCard('Co-Workers')}
						/>
						<OnboardingCheckCard
							title='Business Associates'
							checked={isGuestGroupSelected('Business Associates')}
							onClick={() => handleClickCard('Business Associates')}
						/>
					</div>
				</div>
				<div className='button-container'>
					<ButtonProvider
						type='primary'
						width='102px'
						onClick={() => navigate('/onboarding/follow-socials')}>
						NEXT
					</ButtonProvider>
				</div>
			</div>
		</OnboardingProvider>
	);
};

export default Onboarding_4;
