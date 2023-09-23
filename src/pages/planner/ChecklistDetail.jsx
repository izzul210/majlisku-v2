/** @format */

import React, { useState, useEffect } from 'react';
import { usePlannerContext } from '../../context/PlannerContext';
//Components import
import ModalVendorDetail from '../../components/atom/ModalProvider/ModalVendorDetail';
import InputFieldProvider from '../../components/atom/InputField/InputFieldProvider';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import TextAreaProvider from '../../components/atom/InputField/TextAreaProvider';
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import ModalConfirmation from '../../components/atom/ModalProvider/ModalConfirmation';
import { DeleteIcon } from '../../components/icons/actionIcons';
//MUI import
import Checkbox from '@mui/material/Checkbox';
//Hooks import
import { useChecklist } from '../../hooks/useChecklist';

export function ChecklistDetailModal({ isOpen, handleClose, checklistId }) {
	const { checklist } = usePlannerContext();
	const [checklistDetail, setChecklistDetail] = useState(null);
	const [editChecklist, setEditChecklist] = useState(false);

	useEffect(() => {
		if (checklist) {
			let checklist_ = checklist.find((checklist) => checklist.id === checklistId);
			setChecklistDetail(checklist_);
		}
	}, [checklist, checklistId]);

	const handleEditChecklist = () => {
		setEditChecklist(true);
	};

	const handleCloseChecklist = () => {
		handleClose();
		setEditChecklist(false);
	};
	const handlePostSave = () => {
		setEditChecklist(false);
	};

	return (
		<>
			<ModalVendorDetail
				openInvite={editChecklist}
				isOpen={isOpen}
				handleEdit={handleEditChecklist}
				handleClose={handleCloseChecklist}
				title={editChecklist ? '' : checklistDetail?.title}
				loading={false}>
				{editChecklist ? (
					<EditChecklistDetailContent
						checklistDetail={checklistDetail}
						handlePostSave={handlePostSave}
					/>
				) : (
					<ChecklistDetailContent
						checklistDetail={checklistDetail}
						handlePostDeleteChecklist={handleClose}
					/>
				)}
			</ModalVendorDetail>
		</>
	);
}

export const ChecklistDetailContent = ({ checklistDetail, handlePostDeleteChecklist }) => {
	const [checked, setChecked] = useState(checklistDetail?.completed || false);
	const [deleteModal, setDeleteModal] = useState(false);
	const { updateChecklistDetails, deleteChecklist } = useChecklist();

	useEffect(() => {
		setChecked(checklistDetail?.completed);
	}, [checklistDetail]);

	const handleChange = (event) => {
		updateChecklistDetails({ completed: event.target.checked }, checklistDetail?.id, () => {});
		setChecked(event.target.checked);
	};

	const handleDeleteChecklist = () => {
		deleteChecklist(checklistDetail?.id, () => {});
		setDeleteModal(false);
		handlePostDeleteChecklist();
	};

	return (
		<>
			<div className='w-auto flex flex-col gap-4 overflow-hidden text-left'>
				<TextProvider className='whitespace-pre-wrap'>{checklistDetail?.description}</TextProvider>
				<div>
					<div className='flex flex-row justify-between items-center'>
						<TextProvider className='font-semibold'>Mark Complete</TextProvider>
						<div className='w-[45px] flex items-center flex-col justify-center'>
							<Checkbox
								checked={checked}
								onChange={handleChange}
								color='success'
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						</div>
					</div>
				</div>
				<div className='flex justify-center w-full'>
					<div
						className='flex gap-2 items-center cursor-pointer'
						onClick={() => setDeleteModal(true)}>
						<DeleteIcon />
						<TextProvider className='text-red-700 font-semibold'>REMOVE</TextProvider>
					</div>
				</div>
			</div>
			<ModalConfirmation
				title={
					<div className='flex gap-2 items-center'>
						<DeleteIcon fill='black' />
						<TextProvider className=' font-semibold mt-1'>REMOVE CHECKLIST</TextProvider>
					</div>
				}
				loading={false}
				isOpen={deleteModal}
				handleConfirm={handleDeleteChecklist}
				handleClose={() => setDeleteModal(false)}>
				<TextProvider>Are you sure want to remove this checklist?</TextProvider>
			</ModalConfirmation>
		</>
	);
};

export const EditChecklistDetailContent = ({ checklistDetail, handlePostSave }) => {
	const [title, setTitle] = useState(checklistDetail?.title || '');
	const [description, setDescription] = useState(checklistDetail?.description || '');
	//Error state
	const [inputError, setInputError] = useState(false);
	const { updateChecklistDetails } = useChecklist();

	function isEmptyOrSpaces(str) {
		return str === null || str.trim() === '';
	}

	const handleSave = () => {
		if (isEmptyOrSpaces(title)) {
			setInputError(true);
		} else {
			setInputError(false);
			updateChecklistDetails(
				{
					title,
					description,
				},
				checklistDetail.id,
				() => {}
			);
			handlePostSave();
		}
	};

	return (
		<div className='w-full text-left'>
			<div className='flex flex-col gap-4'>
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
			<div className='flex justify-end items-center gap-4 pt-3'>
				<div className='flex gap-2 items-center'>
					<ButtonProvider
						onClick={handlePostSave}
						width='auto'
						type='secondary'
						padding='12px 20px'>
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
