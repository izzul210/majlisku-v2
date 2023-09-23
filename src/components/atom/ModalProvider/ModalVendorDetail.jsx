/** @format */

import React from 'react';
//MUI Import
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
//Component import
import CardLoadingState from '../loading/CardLoadingState';
import TextProvider from '../TextProvider/TextProvider';
//Icons import
import { EditIcon } from '../../icons/actionIcons';
//Styling import
import './ModalProvider.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const CloseButton = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			fill-rule='evenodd'
			clip-rule='evenodd'
			d='M7.99908 9.29904L14.699 16L16 14.701L9.29827 8L16 1.30087L14.7008 0L7.99908 6.70097L1.29918 0L0 1.30087L6.6999 8L0 14.6991L1.29918 16L7.99908 9.29904Z'
			fill='#1D4648'
		/>
	</svg>
);

function ModalVendorDetail({
	isOpen = false,
	openInvite = false,
	handleClose = () => {},
	handleEdit = () => {},
	title,
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
					width: '100%',
				},
				width: 600,
				p: 4,
			}}
			{...props}>
			<CardLoadingState loadingState={loading} />
			<Box>
				<div className='modal-top-vendor'>
					<div className=' p-4 flex items-center justify-end gap-6 px-5 py-7'>
						{!openInvite && (
							<div className='cursor-pointer' onClick={handleEdit}>
								<EditIcon fill='#1D4648' />
							</div>
						)}

						<div
							className='cursor-pointer'
							onClick={() => {
								handleClose();
							}}>
							<CloseButton />
						</div>
					</div>
					<div className='px-5'>
						<TextProvider fontFamily='lora' className='text-2xl font-semibold'>
							{title}
						</TextProvider>
					</div>
				</div>

				<div className='w-full sm:min-w-[400px] p-5'>{children}</div>
			</Box>
		</Dialog>
	);
}

export default ModalVendorDetail;
