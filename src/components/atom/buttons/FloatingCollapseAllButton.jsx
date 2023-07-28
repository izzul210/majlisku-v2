/** @format */

import React from 'react';
import './Button.scss';
import { InvitedIcon } from '../../icons/brandIcons';
import TextProvider from '../TextProvider/TextProvider';
function FloatingCollapseAllButton({ handleOnClick = () => {} }) {
	return (
		<div className='floatingCollapseAllButton' onClick={() => handleOnClick()}>
			<TextProvider className='text-base uppercase font-semibold'>Collapse All</TextProvider>
		</div>
	);
}

export default FloatingCollapseAllButton;
