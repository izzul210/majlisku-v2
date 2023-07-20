/** @format */

import React from 'react';
//MUI Import
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
//Component import
import ButtonProvider from '../ButtonProvider/ButtonProvider';
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
	handleMain = () => {},
	title = 'Modal',
	mainButtonTitle = 'Confirm',
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
				width: 600,
				p: 4,
				style: {
					borderRadius: 8,
				},
			}}
			{...props}>
			<Box>
				<div className='modal-top uppercase'>
					{title}
					<div
						className='cursor-pointer'
						onClick={() => {
							handleClose();
						}}>
						<CloseButton />
					</div>
				</div>
				<div className='modal-content'>{children}</div>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						pt: 2,
						gap: '8px',
						padding: '8px',
						borderTop: '1px solid rgba(228, 231, 236, 1)',
						textTransform: 'uppercase',
					}}>
					<ButtonProvider onClick={handleClose}>Cancel</ButtonProvider>
					<ButtonProvider onClick={handleMain} type='primary'>
						{mainButtonTitle}
					</ButtonProvider>
				</Box>
			</Box>
		</Dialog>
	);
}

export default ModalProvider;
