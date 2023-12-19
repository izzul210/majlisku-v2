/** @format */

import React from 'react';
//MUI Import
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
//Component import
import CardLoadingState from '../loading/CardLoadingState';
import TextProvider from '../TextProvider/TextProvider';
//Styling import
import './ModalProvider.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CloseButton = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M7.99908 9.29904L14.699 16L16 14.701L9.29827 8L16 1.30087L14.7008 0L7.99908 6.70097L1.29918 0L0 1.30087L6.6999 8L0 14.6991L1.29918 16L7.99908 9.29904Z'
			fill='#1D4648'
		/>
	</svg>
);

function ModalProvider({
	isOpen = false,
	handleClose = () => {},
	loadingTitle = null,
	title = 'Modal',
	loading = false,
	children,
	...props
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			TransitionComponent={Transition}
			aria-labelledby='dialog-title'
			aria-describedby='dialog-description'
			PaperProps={{
				sx: {
					display: 'flex',
					flexDirection: 'column',
					borderRadius: '8px',
					width: '100%',
				},
				p: 4,
			}}
			{...props}>
			<CardLoadingState loadingState={loading} loadingTitle={loadingTitle} />
			<Box>
				<DialogTitle id='dialog-title' sx={{ padding: 0, top: 0, backgroundColor: 'white' }}>
					<div className='modal-top uppercase'>
						<TextProvider className='text-base'>{title}</TextProvider>

						<div
							className='cursor-pointer ml-8'
							onClick={() => {
								handleClose();
							}}>
							<CloseButton />
						</div>
					</div>
				</DialogTitle>
				<div className='modal-content'>{children}</div>
			</Box>
		</Dialog>
	);
}

export default ModalProvider;
