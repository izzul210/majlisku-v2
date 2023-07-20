/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//Hooks import
import { useLogin } from '../../hooks/useAuth';
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

function LoginPage() {
	const { login, isPending, error, user, googleLogin } = useLogin();
	const { email, password } = useOnboardingContext();
	const dispatch = useOnbardingDispatchContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Perform validation or submit form logic here
		console.log('Submitted:', email, password);
		login(email, password);
	};

	const handleGoogleLogin = () => {
		googleLogin();
	};

	return (
		<div className='authPage-container h-screen'>
			<div className='auth-container'>
				<MajliskuWithText />
				{error && <ErrorComponent errorCode={error} />}
				<div className='auth-container-title text-gray-900'>Sign In</div>
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
						</div>
						<LineLogo color='rgba(241, 191, 190, 1)' />
						{/*** Login Button and Google Button */}
						<div className='auth-form-group'>
							{isPending ? (
								<LoadingButtonProvider type='primary'>Logging...</LoadingButtonProvider>
							) : (
								<ButtonProvider button type='primary'>
									LOGIN WITH EMAIL
								</ButtonProvider>
							)}
						</div>
					</form>
					<div style={{ margin: '16px 0px' }}>
						<ButtonProvider type='default' onClick={handleGoogleLogin}>
							<GoogleIcon /> LOGIN WITH GOOGLE
						</ButtonProvider>
					</div>
					<div className='reminder-text'>
						Doesn't have an account?{' '}
						<Link to='/register'>
							<b>REGISTER</b>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
