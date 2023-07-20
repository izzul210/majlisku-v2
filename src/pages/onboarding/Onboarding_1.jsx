/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import InputField from '../../components/atom/InputField/InputField';
import { OnboardingProvider } from './Onboarding';
import { useOnboardingContext, useOnbardingDispatchContext } from '../../context/OnboardingContext';

const Onboarding_1 = () => {
	let navigate = useNavigate();

	const { firstName, lastName } = useOnboardingContext();
	const dispatch = useOnbardingDispatchContext();

	return (
		<OnboardingProvider step={1}>
			<div className='onboarding-card'>
				<div className='onboarding-card-title text-gray-800'>Tell us a bit about you</div>
				<div className='input-container'>
					<div className='input-label'>YOUR NAME</div>
					<div className='input-field-container'>
						<InputField
							flex={true}
							type='text'
							name='firstName'
							id='firstName'
							placeholder='First Name'
							value={firstName}
							onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
						/>
						<InputField
							flex={true}
							type='text'
							name='lastName'
							id='lastName'
							placeholder='Last Name'
							value={lastName}
							onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
						/>
					</div>
				</div>
				<div className='button-container'>
					<ButtonProvider type='primary' width='102px' onClick={() => navigate('nature-of-event')}>
						NEXT
					</ButtonProvider>
				</div>
			</div>
		</OnboardingProvider>
	);
};

export default Onboarding_1;
