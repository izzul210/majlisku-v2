/** @format */
import toast, { Toaster } from 'react-hot-toast';
import TextProvider from '../atom/TextProvider/TextProvider';

const CloseButton = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<path
			d='M18 6L6 18'
			stroke='white'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M6 6L18 18'
			stroke='white'
			strokeWidth='1.5'
			strokeLinecap='square'
			strokeLinejoin='round'
		/>
	</svg>
);

export const notifySuccess = (title = 'Successfully Saved!') => {
	toast.success(
		(t) => (
			<div className='flex justify-between items-start w-full' onClick={() => toast.dismiss(t.id)}>
				<div className='pl-[10px] border-l border-[#19D37A]'>
					<TextProvider colorStyle='#FFF' className='text-start text-[16px] font-semibold'>
						{title}
					</TextProvider>
				</div>
				<div style={{ marginTop: '0px' }}>
					<CloseButton />
				</div>
			</div>
		),

		{
			position: 'top-center',
			style: {
				cursor: 'pointer',
				minWidth: 'min(600px, 95vw)',
				padding: '16px',
				borderRadius: '8px',
				boxSizing: 'border-box',
				boxShadow: '12px 18px 25px rgba(0, 0, 0, 0.1), -5px 14px 25px rgba(0, 0, 0, 0.1)',
				background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #19D37A',
			},
			duration: 3000,
		}
	);
};

export const notifyError = (title = 'Error') => {
	toast.error(
		(t) => (
			<div className='flex justify-between items-start w-full' onClick={() => toast.dismiss(t.id)}>
				<div className='pl-[10px] border-l border-[#e9e6e6]'>
					<TextProvider colorStyle='#FFF' className='text-start text-[16px] font-semibold'>
						{title}
					</TextProvider>
				</div>
				<div style={{ marginTop: '0px' }}>
					<CloseButton />
				</div>
			</div>
		),
		{
			position: 'top-center',
			style: {
				cursor: 'pointer',
				minWidth: 'min(600px, 95vw)',
				padding: '16px',
				borderRadius: '8px',
				boxSizing: 'border-box',
				boxShadow: '12px 18px 25px rgba(0, 0, 0, 0.1), -5px 14px 25px rgba(0, 0, 0, 0.1)',
				background: '#E33C50',
			},
			duration: 3000,
		}
	);
};

export const notifyReminder = (title = 'This is a reminder') => {
	toast(
		(t) => (
			<div className='flex justify-between items-start w-full' onClick={() => toast.dismiss(t.id)}>
				<div className='pl-[10px] border-l border-[#353f3c]'>
					<TextProvider colorStyle='#FFF' className='text-start text-[16px] font-semibold'>
						{title}
					</TextProvider>
				</div>
				<div style={{ marginTop: '0px' }}>
					<CloseButton />
				</div>
			</div>
		),
		{
			position: 'top-center',
			icon: '👋',
			style: {
				cursor: 'pointer',
				minWidth: 'min(600px, 95vw)',
				padding: '16px',
				borderRadius: '8px',
				boxSizing: 'border-box',
				boxShadow: '12px 18px 25px rgba(0, 0, 0, 0.1), -5px 14px 25px rgba(0, 0, 0, 0.1)',
				background: '#353f3c',
			},
			duration: 3000,
		}
	);
};
