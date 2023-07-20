/** @format */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//Hooks import
import { useSignup } from '../../hooks/useAuth';
//Context import
import { useOnboardingContext, useOnbardingDispatchContext } from '../../context/OnboardingContext';
//Components import
import InputField from '../../components/atom/InputField/InputField';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import LoadingButtonProvider from '../../components/atom/ButtonProvider/LoadingButtonProvider';
import { LineLogo } from '../../components/misc/LineLogo/LineLogo';
import ErrorComponent from './components/ErrorComponent';
//Styling import
import './AuthPage.scss';
//Icons imort
import { MajliskuWithText } from '../../components/icons/brandIcons';
import { GoogleIcon } from '../../components/icons/generalIcons';

function SignUpPage() {
	const { signup, isPending, error, user } = useSignup();
	const { email, password } = useOnboardingContext();
	const dispatch = useOnbardingDispatchContext();

	let navigate = useNavigate();

	user && console.log(user);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Perform validation or submit form logic here
		console.log('Submitted:', email, password);
		signup(email, password, () => {
			navigate('/onboarding');
		});
	};

	return (
		<div className='authPage-container h-screen'>
			<div className='auth-container'>
				<MajliskuWithText />
				{error && <ErrorComponent errorCode={error} />}
				<div className='auth-container-title text-gray-900 text-xs sm:text-base'>
					Create an acccount
				</div>
				<div className='auth-form-container'>
					<form className='auth-form' onSubmit={handleSubmit}>
						<InputField
							type='email'
							name='email'
							id='email'
							placeholder='Enter email address'
							value={email}
							onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
						/>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
							<InputField
								type='password'
								name='password'
								id='password'
								placeholder='Enter password'
								value={password}
								onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
							/>
							<div className='password-note'>Use 8 characters or more</div>
						</div>
						<LineLogo color='rgba(241, 191, 190, 1)' />
						{/*** Login Button and Google Button */}
						<div className='auth-form-group'>
							{isPending ? (
								<LoadingButtonProvider type='primary'>Signing up...</LoadingButtonProvider>
							) : (
								<ButtonProvider button type='primary'>
									CONTINUE WITH EMAIL
								</ButtonProvider>
							)}
						</div>
					</form>
					<div style={{ margin: '16px 0px' }}>
						<ButtonProvider type='default'>
							<GoogleIcon /> CONTINUE WITH GOOGLE
						</ButtonProvider>
					</div>
					<div className='reminder-text'>
						Already have an account?{' '}
						<Link to='/login'>
							<b>SIGN IN</b>
						</Link>
					</div>
					<div className='terms-text'>
						By confirming your email, you agree to our{' '}
						<b style={{ textDecoration: 'underline' }}>Terms of Service</b> and that you have read
						and understood our Privacy Policy.
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;
