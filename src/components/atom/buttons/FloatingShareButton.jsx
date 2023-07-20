/** @format */

import React from 'react';
import './Button.scss';
import { InvitedIcon } from '../../icons/brandIcons';
import TextProvider from '../TextProvider/TextProvider';
function FloatingShareButton({ handleOnClick = () => {} }) {
	return (
		<div className='floatingShareButton' onClick={() => handleOnClick()}>
			<InvitedIcon width='20' height='20' />
			<TextProvider className='text-base uppercase font-semibold'>Share Invite</TextProvider>
		</div>
	);
}

export default FloatingShareButton;
