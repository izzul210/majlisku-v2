/** @format */

import React from 'react';
//MUI Imports
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import TextProvider from '../TextProvider/TextProvider';

function CardLoadingState({ loadingState, clear, loadingTitle }) {
	return (
		<Backdrop
			sx={{
				color: 'black',
				backgroundColor: clear ? 'none' : 'rgba(255,255,255,0.5)',
				zIndex: (theme) => theme.zIndex.drawer - 1,
				opacity: 1,
				position: 'absolute',
			}}
			open={loadingState}>
			<div className='flex gap-3 items-center'>
				<CircularProgress color='inherit'></CircularProgress>
				{loadingTitle && <TextProvider className='font-semibold'>{loadingTitle}</TextProvider>}
			</div>
		</Backdrop>
	);
}

export default CardLoadingState;
