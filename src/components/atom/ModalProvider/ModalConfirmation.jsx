/** @format */

import React from 'react';
//MUI Import
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
//Component import
import CardLoadingState from '../loading/CardLoadingState';
import TextProvider from '../TextProvider/TextProvider';
import ButtonProvider from '../ButtonProvider/ButtonProvider';
//Styling import
import './ModalProvider.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function ModalConfirmation({
	isOpen = false,
	handleClose = () => {},
	handleConfirm = () => {},
	title = 'Remove',
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
				style: {
					borderRadius: 8,
				},
				width: 600,
				p: 4,
			}}
			{...props}>
			<CardLoadingState loadingState={loading} />
			<Box>
				<div className='modal-top-2'>
					<TextProvider className='text-xl font-semibold'>{title}</TextProvider>
				</div>
				<div className='p-5'>{children}</div>
				<div className='flex justify-end gap-2 p-4'>
					<ButtonProvider onClick={handleClose}>
						<TextProvider className='text-lg font-semibold'>Cancel</TextProvider>
					</ButtonProvider>
					<ButtonProvider onClick={handleConfirm} className='bg-red-800'>
						<TextProvider className='text-lg font-semibold text-white'>Confirm</TextProvider>
					</ButtonProvider>
				</div>
			</Box>
		</Dialog>
	);
}

export default ModalConfirmation;
