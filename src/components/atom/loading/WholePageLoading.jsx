/** @format */
import React from 'react';
//MUI Imports
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import TextProvider from '../TextProvider/TextProvider';

function WholePageLoading({ loading, text = 'Loading...', noOpacity = false }) {
	return (
		<Backdrop
			sx={{
				color: 'black',
				backdropFilter: 'blur(4px)',
				backgroundColor: noOpacity ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.5)',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={loading}
			onClick={() => {}}>
			<div className='flex flex-col gap-6 items-center justify-center'>
				<CircularProgress color='inherit' />
				<TextProvider className='font-semibold text-lg'>{text}</TextProvider>
			</div>
		</Backdrop>
	);
}

export default WholePageLoading;
