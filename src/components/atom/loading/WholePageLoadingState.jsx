/** @format */
import React from 'react';
//MUI Imports
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

function WholePageLoadingState({ loadingState, heightVh = '100%', noOpacity = false }) {
	return (
		<Backdrop
			sx={{
				color: 'black',
				backgroundColor: noOpacity ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.5)',
				zIndex: (theme) => theme.zIndex.drawer - 1,
				opacity: 1,
				position: 'absolute',
				margin: '0px',
				height: heightVh ? heightVh : 'auto',
			}}
			open={loadingState}>
			<CircularProgress color='inherit'></CircularProgress>
		</Backdrop>
	);
}

export default WholePageLoadingState;
