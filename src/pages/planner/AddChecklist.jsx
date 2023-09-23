/** @format */

import React, { useState } from 'react';
//Components  import
import ModalProvider2 from '../../components/atom/ModalProvider/ModalProvider2';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import InputField from '../../components/atom/InputField/InputField';
import ToggleSwitchSet from '../../components/atom/switch/ToggleSwitchSet';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
//Hooks import
import { useChecklist } from '../../hooks/useChecklist';

export function AddChecklistModal({ isOpen, handleClose }) {
	return (
		<ModalProvider2 loading={false} isOpen={isOpen} handleClose={handleClose} title='Add Checklist'>
			<AddChecklistContent handleCancel={handleClose} />
		</ModalProvider2>
	);
}
export const AddChecklistContent = ({ handleCancel }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	//Error state
	const [inputError, setInputError] = useState(false);
	//API response
	const { addChecklist } = useChecklist();

	function isEmptyOrSpaces(str) {
		return str === null || str.trim() === '';
	}

	const handleSave = () => {
		if (isEmptyOrSpaces(title)) {
			setInputError(true);
		} else {
			setInputError(false);
			addChecklist(
				{
					title,
					description,
					priority: false,
					completed: false,
				},
				() => {}
			);
			handleCancel();
		}
	};

	return (
		<div className='w-full sm:w-auto text-left'>
			<div className='p-5 flex flex-col gap-4'>
				{/** Title **/}
				<div>
					<InputFieldProvider
						title='Title'
						placeholder='Enter vendor name'
						error={inputError}
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					{inputError && (
						<TextProvider className='text-sm text-red-500 mt-1 text-right'>
							Title is required!
						</TextProvider>
					)}
				</div>
				{/** Notes */}
				<TextAreaProvider
					title='Description (Optional)'
					placeholder='Enter Description'
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>
			<div className='flex justify-end items-center gap-4 p-5 border-t border-gray-200'>
				<div className='flex gap-2 items-center'>
					<ButtonProvider onClick={handleCancel} width='auto' type='secondary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm'>CANCEL</TextProvider>
					</ButtonProvider>
					<ButtonProvider onClick={handleSave} width='auto' type='primary' padding='12px 20px'>
						<TextProvider className='text-base font-semibold text-sm text-white'>SAVE</TextProvider>
					</ButtonProvider>
				</div>
			</div>
		</div>
	);
};
