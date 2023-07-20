/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
//Components import
import InputField from '../../components/atom/InputField/InputField';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import LoadingButtonProvider from '../../components/atom/ButtonProvider/LoadingButtonProvider';
//Icons import
import { BackIcon } from '../../components/icons/actionIcons';
import { TwitterIcon, InstagramIcon } from '../../components/icons/generalIcons';
//Context import
import { useOnboardingContext, useOnbardingDispatchContext } from '../../context/OnboardingContext';
import { useUserDispatchContext } from '../../context/UserContext';
//Hooks import
import { useOnboarding } from '../../hooks/useAuth';
//Styling import
import './Onboarding.scss';

const OnboardingTopBar = ({ step = 1 }) => {
	let navigate = useNavigate();

	return (
		<div className='onboarding-top-bar'>
			<div className='onboarding-top-bar-back-button' onClick={() => navigate(-1)}>
				<BackIcon />
			</div>
			<div className='onboarding-top-bar-step'>
				<div className={`onboarding-top-bar-step step-${step}`}></div>
			</div>
		</div>
	);
};

export const OnboardingCheckCard = ({ title, description, checked, onClick }) => {
	const cardClassName = checked ? 'onboarding-check-card event-checked' : 'onboarding-check-card';

	return (
		<div className={cardClassName} onClick={onClick}>
			<div className='card-content'>
				<div className='onboarding-check-card-title'>{title}</div>
				{description && <div className='onboarding-check-card-description'>{description}</div>}
			</div>
		</div>
	);
};

export const OnboardingSocialCard = ({
	title,
	description,
	link = 'https://majlisku.com',
	Icon,
}) => {
	return (
		<a className='social-card' href={link} target='_blank' rel='noreferrer'>
			<div className='card-content'>
				<div className='social-card-title'>{title}</div>
				<div className='social-card-description'>{description}</div>
			</div>
			<div className='social-card-icon'>{Icon}</div>
		</a>
	);
};

// const OnbardingProvider_ = ({ step, children }) => {
// 	return (
// 		<div className='onboarding-container'>
// 			<OnboardingTopBar step={step} />
// 			<motion.div
// 				className='onboarding-card-container'
// 				initial={{ opacity: 0 }}
// 				animate={{ opacity: 1 }}
// 				exit={{ opacity: 0 }}>
// 				{children}
// 			</motion.div>
// 		</div>
// 	);
// };

export const OnboardingProvider = ({ step, children }) => {
	return (
		<div className='onboarding-container h-screen'>
			<OnboardingTopBar step={step} />
			<div className='onboarding-card-container'>{children}</div>
		</div>
	);
};

// export const Onboarding_1 = () => {
// 	let navigate = useNavigate();

// 	const { firstName, lastName } = useOnboardingContext();
// 	const dispatch = useOnbardingDispatchContext();

// 	return (
// 		<OnbardingProvider step={1}>
// 			<div className='onboarding-card'>
// 				<div className='onboarding-card-title'>Tell us a bit about you</div>
// 				<div className='input-container'>
// 					<div className='input-label'>YOUR NAME</div>
// 					<div className='input-field-container'>
// 						<InputField
// 							flex={true}
// 							type='text'
// 							name='firstName'
// 							id='firstName'
// 							placeholder='First Name'
// 							value={firstName}
// 							onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
// 						/>
// 						<InputField
// 							flex={true}
// 							type='text'
// 							name='lastName'
// 							id='lastName'
// 							placeholder='Last Name'
// 							value={lastName}
// 							onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
// 						/>
// 					</div>
// 				</div>
// 				<div className='button-container'>
// 					<ButtonProvider type='primary' width='102px' onClick={() => navigate('nature-of-event')}>
// 						NEXT
// 					</ButtonProvider>
// 				</div>
// 			</div>
// 		</OnbardingProvider>
// 	);
// };

// export const Onboarding_2 = () => {
// 	let navigate = useNavigate();
// 	const { eventNature } = useOnboardingContext();
// 	const dispatch = useOnbardingDispatchContext();

// 	//Check if the event nature is already selected
// 	const isEventNatureSelected = (nature) => {
// 		return eventNature?.includes(nature);
// 	};

// 	const handleClickCard = (nature) => {
// 		if (isEventNatureSelected(nature)) {
// 			dispatch({ type: 'REMOVE_EVENT_NATURE', payload: nature });
// 		} else {
// 			dispatch({ type: 'ADD_EVENT_NATURE', payload: nature });
// 		}
// 	};

// 	return (
// 		<OnbardingProvider step={2}>
// 			<div className='onboarding-card'>
// 				<div className='onboarding-card-title'>What is the nature of your event?</div>
// 				<div className='normal-text'>You can choose more than 1</div>
// 				<div className='nature-event-container'>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='ENGAGEMENT'
// 							description='Majlis Tunang'
// 							checked={isEventNatureSelected('engagement')}
// 							onClick={() => handleClickCard('engagement')}
// 						/>
// 						<OnboardingCheckCard
// 							title='Solemnization'
// 							description='Majlis nikah'
// 							checked={isEventNatureSelected('solemnization')}
// 							onClick={() => handleClickCard('solemnization')}
// 						/>
// 					</div>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='single RECEPTION'
// 							description='Walimatul urus & sanding'
// 							checked={isEventNatureSelected('single reception')}
// 							onClick={() => handleClickCard('single reception')}
// 						/>
// 						<OnboardingCheckCard
// 							title='multiple RECEPTIONs'
// 							description='Walimatul urus & sanding'
// 							checked={isEventNatureSelected('multiple receptions')}
// 							onClick={() => handleClickCard('multiple receptions')}
// 						/>
// 					</div>
// 					<OnboardingCheckCard
// 						title='Other'
// 						description='Lain-lain'
// 						checked={isEventNatureSelected('other')}
// 						onClick={() => handleClickCard('other')}
// 					/>
// 				</div>
// 				<div className='button-container'>
// 					<ButtonProvider
// 						type='primary'
// 						width='102px'
// 						onClick={() => navigate('/onboarding/guest-invited')}>
// 						NEXT
// 					</ButtonProvider>
// 				</div>
// 			</div>
// 		</OnbardingProvider>
// 	);
// };

// export const Onboarding_3 = () => {
// 	let navigate = useNavigate();
// 	const { guestTotal } = useOnboardingContext();
// 	const dispatch = useOnbardingDispatchContext();

// 	//Check if the event nature is already selected
// 	const isGuestTotalSelected = (total) => {
// 		return guestTotal === total;
// 	};

// 	const handleClickCard = (input) => {
// 		dispatch({ type: 'SET_GUEST_TOTAL', payload: input });
// 	};

// 	return (
// 		<OnbardingProvider step={3}>
// 			<div className='onboarding-card'>
// 				<div className='onboarding-card-title'>How many guests are you inviting?</div>
// 				<div className='nature-event-container'>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='0-50'
// 							checked={isGuestTotalSelected('0-50')}
// 							onClick={() => handleClickCard('0-50')}
// 						/>
// 						<OnboardingCheckCard
// 							title='50-100'
// 							checked={isGuestTotalSelected('50-100')}
// 							onClick={() => handleClickCard('50-100')}
// 						/>
// 					</div>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='100-300'
// 							checked={isGuestTotalSelected('100-300')}
// 							onClick={() => handleClickCard('100-300')}
// 						/>
// 						<OnboardingCheckCard
// 							title='500-1000'
// 							checked={isGuestTotalSelected('500-1000')}
// 							onClick={() => handleClickCard('500-1000')}
// 						/>
// 					</div>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='>1000'
// 							checked={isGuestTotalSelected('>1000')}
// 							onClick={() => handleClickCard('>1000')}
// 						/>
// 						<OnboardingCheckCard
// 							title='NOT SURE YET'
// 							checked={isGuestTotalSelected('NOT SURE YET')}
// 							onClick={() => handleClickCard('NOT SURE YET')}
// 						/>
// 					</div>
// 				</div>
// 				<div className='button-container'>
// 					<ButtonProvider
// 						type='primary'
// 						width='102px'
// 						onClick={() => navigate('/onboarding/guest-group')}>
// 						NEXT
// 					</ButtonProvider>
// 				</div>
// 			</div>
// 		</OnbardingProvider>
// 	);
// };

// export const Onboarding_4 = () => {
// 	let navigate = useNavigate();
// 	const { guestGroups } = useOnboardingContext();
// 	const dispatch = useOnbardingDispatchContext();

// 	//Check if the event nature is already selected
// 	const isGuestGroupSelected = (group) => {
// 		return guestGroups?.includes(group);
// 	};

// 	const handleClickCard = (group) => {
// 		if (isGuestGroupSelected(group)) {
// 			dispatch({ type: 'REMOVE_GUEST_GROUP', payload: group });
// 		} else {
// 			dispatch({ type: 'ADD_GUEST_GROUP', payload: group });
// 		}
// 	};

// 	return (
// 		<OnbardingProvider step={4}>
// 			<div className='onboarding-card'>
// 				<div className='onboarding-card-title'>Who are your guest consist of?</div>
// 				<div className='normal-text'>You can choose more than 1</div>
// 				<div className='nature-event-container'>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='Close Friends'
// 							checked={isGuestGroupSelected('Close Friends')}
// 							onClick={() => handleClickCard('Close Friends')}
// 						/>
// 						<OnboardingCheckCard
// 							title='Family Members'
// 							checked={isGuestGroupSelected('Family Members')}
// 							onClick={() => handleClickCard('Family Members')}
// 						/>
// 					</div>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='Schoolmates or Alumni'
// 							checked={isGuestGroupSelected('Schoolmates or Alumni')}
// 							onClick={() => handleClickCard('Schoolmates or Alumni')}
// 						/>
// 						<OnboardingCheckCard
// 							title='Neighbors'
// 							checked={isGuestGroupSelected('Neighbors')}
// 							onClick={() => handleClickCard('Neighbors')}
// 						/>
// 					</div>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='VIPS or Special Guests'
// 							checked={isGuestGroupSelected('VIPS or Special Guests')}
// 							onClick={() => handleClickCard('VIPS or Special Guests')}
// 						/>
// 						<OnboardingCheckCard
// 							title='Children'
// 							checked={isGuestGroupSelected('Children')}
// 							onClick={() => handleClickCard('Children')}
// 						/>
// 					</div>
// 					<div className='container-row'>
// 						<OnboardingCheckCard
// 							title='Co-Workers'
// 							checked={isGuestGroupSelected('Co-Workers')}
// 							onClick={() => handleClickCard('Co-Workers')}
// 						/>
// 						<OnboardingCheckCard
// 							title='Business Associates'
// 							checked={isGuestGroupSelected('Business Associates')}
// 							onClick={() => handleClickCard('Business Associates')}
// 						/>
// 					</div>
// 				</div>
// 				<div className='button-container'>
// 					<ButtonProvider
// 						type='primary'
// 						width='102px'
// 						onClick={() => navigate('/onboarding/follow-socials')}>
// 						NEXT
// 					</ButtonProvider>
// 				</div>
// 			</div>
// 		</OnbardingProvider>
// 	);
// };

// export const Onboarding_5 = () => {
// 	let navigate = useNavigate();
// 	const state = useOnboardingContext();
// 	const dispatch = useUserDispatchContext();
// 	const { saveOnboarding, isPending } = useOnboarding();

// 	const postOnboardingFunc = () => {
// 		dispatch({ type: 'SET_USER_INFO', payload: state.user });
// 		navigate('/');
// 	};

// 	const handleSubmit = () => {
// 		saveOnboarding(state, postOnboardingFunc);
// 	};

// 	return (
// 		<OnbardingProvider step={5}>
// 			<div className='onboarding-card'>
// 				<div className='onboarding-card-title'>
// 					Last but not least, a little help can go a long way
// 				</div>
// 				<div className='bold-lora-text'>Follow us on socials for updates and news!</div>
// 				<div className='nature-event-container'>
// 					<div className='container-row'>
// 						<OnboardingSocialCard
// 							title='Twitter'
// 							description='@majlisku_app'
// 							Icon={<TwitterIcon />}
// 							link='https://twitter.com/majlisku_app'
// 						/>
// 						<OnboardingSocialCard
// 							title='Instagram'
// 							description='@majliskuapp'
// 							Icon={<InstagramIcon />}
// 							link='https://www.instagram.com/majliskuapp/'
// 						/>
// 					</div>
// 				</div>
// 				<div className='button-container'>
// 					{isPending ? (
// 						<LoadingButtonProvider type='primary' width='122px'>
// 							Finishing...
// 						</LoadingButtonProvider>
// 					) : (
// 						<ButtonProvider type='primary' width='102px' onClick={() => handleSubmit()}>
// 							FINISH
// 						</ButtonProvider>
// 					)}
// 				</div>
// 			</div>
// 		</OnbardingProvider>
// 	);
// };
