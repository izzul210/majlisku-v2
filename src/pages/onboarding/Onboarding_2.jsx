/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import { OnboardingProvider, OnboardingCheckCard } from './Onboarding';
//Context import
import { useOnboardingContext, useOnbardingDispatchContext } from '../../context/OnboardingContext';

const Onboarding_2 = () => {
	let navigate = useNavigate();
	const { eventNature } = useOnboardingContext();
	const dispatch = useOnbardingDispatchContext();

	//Check if the event nature is already selected
	const isEventNatureSelected = (nature) => {
		return eventNature?.includes(nature);
	};

	const handleClickCard = (nature) => {
		if (isEventNatureSelected(nature)) {
			dispatch({ type: 'REMOVE_EVENT_NATURE', payload: nature });
		} else {
			dispatch({ type: 'ADD_EVENT_NATURE', payload: nature });
		}
	};

	return (
		<OnboardingProvider step={2}>
			<div className='onboarding-card'>
				<div className='onboarding-card-title text-gray-900'>What is the nature of your event?</div>
				<div className='normal-text'>You can choose more than 1</div>
				<div className='nature-event-container'>
					<div className='container-row'>
						<OnboardingCheckCard
							title='ENGAGEMENT'
							description='Majlis Tunang'
							checked={isEventNatureSelected('engagement')}
							onClick={() => handleClickCard('engagement')}
						/>
						<OnboardingCheckCard
							title='Solemnization'
							description='Majlis nikah'
							checked={isEventNatureSelected('solemnization')}
							onClick={() => handleClickCard('solemnization')}
						/>
					</div>
					<div className='container-row'>
						<OnboardingCheckCard
							title='single RECEPTION'
							description='Walimatul urus & sanding'
							checked={isEventNatureSelected('single reception')}
							onClick={() => handleClickCard('single reception')}
						/>
						<OnboardingCheckCard
							title='multiple RECEPTIONs'
							description='Walimatul urus & sanding'
							checked={isEventNatureSelected('multiple receptions')}
							onClick={() => handleClickCard('multiple receptions')}
						/>
					</div>
					<OnboardingCheckCard
						title='Other'
						description='Lain-lain'
						checked={isEventNatureSelected('other')}
						onClick={() => handleClickCard('other')}
					/>
				</div>
				<div className='button-container'>
					<ButtonProvider
						type='primary'
						width='102px'
						onClick={() => navigate('/onboarding/guest-invited')}>
						NEXT
					</ButtonProvider>
				</div>
			</div>
		</OnboardingProvider>
	);
};

export default Onboarding_2;
