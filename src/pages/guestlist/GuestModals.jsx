/** @format */

import React, { useState } from 'react';
//Components import
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import MultipleSelectChip from '../../components/atom/select/MultipleSelect';
//Hooks import
import { useGuestlist } from '../../hooks/useGuestlist';

export const EditGroupBulkModal = ({ isOpen, handleClose, guestIds }) => {
	const { editBulkGuest, isPending } = useGuestlist();
	const [group, setGroup] = useState([]);

	const handleApply = () => {
		editBulkGuest({ groups: group }, guestIds, () => {
			handleClose();
			setGroup([]);
		});
	};

	return (
		<ModalProvider2
			loading={isPending}
			isOpen={isOpen}
			handleClose={handleClose}
			title='Edit Guest Group'>
			<div className='w-full'>
				<div className='p-4'>
					<TextProvider className='font-semibold uppercase'>Select Group</TextProvider>
					<MultipleSelectChip group={group} setGroup={setGroup} />
				</div>
				<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
					<div className='flex gap-2 items-center'>
						<ButtonProvider onClick={handleClose} width='auto' type='secondary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold'>CANCEL</TextProvider>
						</ButtonProvider>
						<ButtonProvider onClick={handleApply} width='auto' type='primary' padding='12px 20px'>
							<TextProvider className='text-base font-semibold text-white'>APPLY</TextProvider>
						</ButtonProvider>
					</div>
				</div>
			</div>
		</ModalProvider2>
	);
};
