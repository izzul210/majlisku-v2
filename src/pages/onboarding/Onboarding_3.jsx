/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import { OnboardingProvider, OnboardingCheckCard } from './Onboarding';
//Context import
import { useOnboardingContext, useOnbardingDispatchContext } from '../../context/OnboardingContext';

const Onboarding_3 = () => {
	let navigate = useNavigate();
	const { guestTotal } = useOnboardingContext();
	const dispatch = useOnbardingDispatchContext();

	//Check if the event nature is already selected
	const isGuestTotalSelected = (total) => {
		return guestTotal === total;
	};

	const handleClickCard = (input) => {
		dispatch({ type: 'SET_GUEST_TOTAL', payload: input });
	};

	return (
		<OnboardingProvider step={3}>
			<div className='onboarding-card'>
				<div className='onboarding-card-title text-gray-900'>How many guests are you inviting?</div>
				<div className='nature-event-container'>
					<div className='container-row'>
						<OnboardingCheckCard
							title='0-50'
							checked={isGuestTotalSelected('0-50')}
							onClick={() => handleClickCard('0-50')}
						/>
						<OnboardingCheckCard
							title='50-100'
							checked={isGuestTotalSelected('50-100')}
							onClick={() => handleClickCard('50-100')}
						/>
					</div>
					<div className='container-row'>
						<OnboardingCheckCard
							title='100-300'
							checked={isGuestTotalSelected('100-300')}
							onClick={() => handleClickCard('100-300')}
						/>
						<OnboardingCheckCard
							title='500-1000'
							checked={isGuestTotalSelected('500-1000')}
							onClick={() => handleClickCard('500-1000')}
						/>
					</div>
					<div className='container-row'>
						<OnboardingCheckCard
							title='>1000'
							checked={isGuestTotalSelected('>1000')}
							onClick={() => handleClickCard('>1000')}
						/>
						<OnboardingCheckCard
							title='NOT SURE YET'
							checked={isGuestTotalSelected('NOT SURE YET')}
							onClick={() => handleClickCard('NOT SURE YET')}
						/>
					</div>
				</div>
				<div className='button-container'>
					<ButtonProvider
						type='primary'
						width='102px'
						onClick={() => navigate('/onboarding/guest-group')}>
						NEXT
					</ButtonProvider>
				</div>
			</div>
		</OnboardingProvider>
	);
};

export default Onboarding_3;
