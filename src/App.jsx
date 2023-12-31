/** @format */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
//Context import
import { OnboardingProvider } from './context/OnboardingContext';
import { GuestlistProvider } from './context/GuestlistContext';
import { DigitalInviteContextProvider } from './context/DigitalInviteContext';
import { PlannerProvider } from './context/PlannerContext';
import { useUserContext } from './context/UserContext';
import Sidebar from './components/sidebar/Sidebar';
import WholePageLoadingState from './components/atom/loading/WholePageLoadingState';
import PageLazyLoading from './components/atom/loading/PageLazyLoading';

//Import lazy loading
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Guestlist = lazy(() => import('./pages/guestlist/Guestlist'));
const Planner = lazy(() => import('./pages/planner/Planner'));
const AddVendorPage = lazy(() => import('./pages/planner/AddVendorPage'));
const EditVendorPage = lazy(() => import('./pages/planner/EditVendorPage'));
const VendorDetailPage = lazy(() => import('./pages/planner/VendorDetailPage'));
const AddGuestPage = lazy(() => import('./pages/guestlist/AddGuestPage'));
const EditGuestPage = lazy(() => import('./pages/guestlist/EditGuestPage'));
const DigitalInvite = lazy(() => import('./pages/digitalInvite/DigitalInvite'));
const GuestDetailPage = lazy(() => import('./pages/guestlist/GuestDetailPage'));
const OpenInviteGuestDetailPage = lazy(() => import('./pages/guestlist/OpenInviteGuestDetailPage'));
const InvitePreview = lazy(() => import('./pages/digitalInvite/InvitePreview'));
const AddGiftPage = lazy(() => import('./pages/digitalInvite/giftRegistry/AddGiftPage'));
const EditGiftPage = lazy(() => import('./pages/digitalInvite/giftRegistry/EditGiftPage'));
const Onboarding_1 = lazy(() => import('./pages/onboarding/Onboarding_1'));
const Onboarding_2 = lazy(() => import('./pages/onboarding/Onboarding_2'));
const Onboarding_3 = lazy(() => import('./pages/onboarding/Onboarding_3'));
const Onboarding_4 = lazy(() => import('./pages/onboarding/Onboarding_4'));
const Onboarding_5 = lazy(() => import('./pages/onboarding/Onboarding_5'));
// const Sidebar = lazy(() => import('./components/sidebar/Sidebar'));

function App() {
	const { userId, authIsReady } = useUserContext();

	return (
		<div className='App'>
			{authIsReady && (
				<BrowserRouter>
					<Sidebar />
					<Suspense fallback={<PageLazyLoading loadingState={true} noOpacity={true} />}>
						<div className='app-container'>
							<Routes>
								<Route
									exact
									path='/*'
									element={userId ? <Dashboard /> : <Navigate to='/login' />}
								/>
								<Route path='*' element={<Navigate to='/login' />} />
								<Route element={<DigitalInviteContextProvider />}>
									<Route exact path='/digitalinvite/*' element={<DigitalInvite />} />
									<Route exact path='/invite-preview' element={<InvitePreview />} />
									<Route exact path='/digitalinvite/gift/add' element={<AddGiftPage />} />
									<Route exact path='/digitalinvite/gift/edit/:id' element={<EditGiftPage />} />
								</Route>

								<Route element={<GuestlistProvider />}>
									<Route
										exact
										path='/guestlist/*'
										element={userId ? <Guestlist /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/guestlist/add'
										element={userId ? <AddGuestPage /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/guestlist/detail/:id'
										element={userId ? <GuestDetailPage /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/guestlist/openinvite/:id'
										element={userId ? <OpenInviteGuestDetailPage /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/guestlist/edit/:id'
										element={userId ? <EditGuestPage /> : <Navigate to='/login' />}
									/>
								</Route>
								<Route element={<PlannerProvider />}>
									<Route
										exact
										path='/planner/*'
										element={userId ? <Planner /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/planner/addvendor'
										element={userId ? <AddVendorPage /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/planner/vendordetail/:id'
										element={userId ? <VendorDetailPage /> : <Navigate to='/login' />}
									/>
									<Route
										exact
										path='/planner/editvendor/:id'
										element={userId ? <EditVendorPage /> : <Navigate to='/login' />}
									/>
								</Route>

								<Route element={<OnboardingProvider />}>
									<Route
										exact
										path='/register'
										element={userId ? <Navigate to='/' /> : <SignUpPage />}
									/>
									<Route
										exact
										path='/login'
										element={userId ? <Navigate to='/' /> : <LoginPage />}
									/>
									<Route exact path='/onboarding' element={<Onboarding_1 />} />
									<Route exact path='/onboarding/nature-of-event' element={<Onboarding_2 />} />
									<Route exact path='/onboarding/guest-invited' element={<Onboarding_3 />} />
									<Route exact path='/onboarding/guest-group' element={<Onboarding_4 />} />
									<Route exact path='/onboarding/follow-socials' element={<Onboarding_5 />} />
								</Route>
							</Routes>
						</div>
					</Suspense>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
