/** @format */

import React from 'react';
//MUI Imports
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

function CardLoadingState({ loadingState, clear }) {
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
			<CircularProgress color='inherit'></CircularProgress>
		</Backdrop>
	);
}

export default CardLoadingState;
