/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
//Components import
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import { OnboardingProvider, OnboardingSocialCard } from './Onboarding';
import LoadingButtonProvider from '../../components/atom/ButtonProvider/LoadingButtonProvider';
//Hooks import
import { useOnboarding } from '../../hooks/useAuth';
//Context import
import { useOnboardingContext } from '../../context/OnboardingContext';
import { useUserDispatchContext } from '../../context/UserContext';
//Icons import
import { TwitterIcon, InstagramIcon } from '../../components/icons/generalIcons';

const Onboarding_5 = () => {
	let navigate = useNavigate();
	const state = useOnboardingContext();
	const dispatch = useUserDispatchContext();
	const { saveOnboarding, isPending } = useOnboarding();

	const postOnboardingFunc = () => {
		dispatch({ type: 'SET_USER_INFO', payload: state.user });
		navigate('/');
	};

	const handleSubmit = () => {
		saveOnboarding(state, postOnboardingFunc);
	};

	return (
		<OnboardingProvider step={5}>
			<div className='onboarding-card'>
				<div className='onboarding-card-title text-gray-900'>
					Last but not least, a little help can go a long way
				</div>
				<div className='bold-lora-text'>Follow us on socials for updates and news!</div>
				<div className='nature-event-container'>
					<div className='container-row'>
						<OnboardingSocialCard
							title='Twitter'
							description='@majlisku_app'
							Icon={<TwitterIcon />}
							link='https://twitter.com/majlisku_app'
						/>
						<OnboardingSocialCard
							title='Instagram'
							description='@majliskuapp'
							Icon={<InstagramIcon />}
							link='https://www.instagram.com/majliskuapp/'
						/>
					</div>
				</div>
				<div className='button-container'>
					{isPending ? (
						<LoadingButtonProvider type='primary' width='122px'>
							Finishing...
						</LoadingButtonProvider>
					) : (
						<ButtonProvider type='primary' width='102px' onClick={() => handleSubmit()}>
							FINISH
						</ButtonProvider>
					)}
				</div>
			</div>
		</OnboardingProvider>
	);
};

export default Onboarding_5;
