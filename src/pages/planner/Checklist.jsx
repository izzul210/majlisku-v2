/** @format */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Context import
import { usePlannerContext, usePlannerDispatchContext } from '../../context/PlannerContext';
//Hooks import
import { useChecklist } from '../../hooks/useChecklist';
//MUI import
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
//Components import
import ButtonProvider from '../../components/atom/ButtonProvider/ButtonProvider';
import TextProvider from '../../components/atom/TextProvider/TextProvider';
import FloatingAdd from '../../components/atom/buttons/FloatingAdd';
import { AddChecklistModal } from './AddChecklist';
import { ChecklistDetailModal } from './ChecklistDetail';
//Icons imoprt
import { PlusIcon } from '../../components/icons/generalIcons';

const ChecklistCard = ({ checklist, ...props }) => {
	const { completed, description, id, priority, title } = checklist || {};
	const [checked, setChecked] = useState(completed);
	const { updateChecklistDetails } = useChecklist();

	useEffect(() => {
		setChecked(checklist?.completed);
	}, [checklist]);

	const handleChange = (event) => {
		updateChecklistDetails({ completed: event.target.checked }, id, () => {});
		setChecked(event.target.checked);
	};

	return (
		<div
			className={`checklist-card ${
				checked ? 'checklist-card-completed' : 'checklist-card-todo'
			}  p-3 max-w-xl w-full flex flex-row gap-1`}>
			<div className='w-[45px] flex items-center flex-col justify-center'>
				<Checkbox
					checked={checked}
					onChange={handleChange}
					color='success'
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</div>

			<div className='text-start flex-1 w-full flex flex-col justify-center' {...props}>
				<TextProvider className='text-base font-semibold'>{title}</TextProvider>
				<TextProvider className='text-xs font-light'>
					<div className='checklist-card-desc'>{description}</div>
				</TextProvider>
			</div>
		</div>
	);
};

const Checklist = () => {
	const dispatch = usePlannerDispatchContext();
	const { checklist, loadingChecklist } = usePlannerContext();
	//Modal states
	const [addChecklistModal, setAddChecklistModal] = useState(false);
	const [checklistDetailModal, setChecklistDetailModal] = useState(false);
	const [checklistId, setChecklistId] = useState(null);
	const phoneSize = useMediaQuery('(max-width:600px)');

	let navigate = useNavigate();

	return (
		<div className='w-full flex-grow flex-col pt-8 justify-start h-full'>
			{/******* Top Section ****/}
			<div className='flex justify-end items-center w-full px-4'>
				{!phoneSize ? (
					<div className='flex gap-2'>
						<ButtonProvider
							onClick={() => {
								setAddChecklistModal(true);
							}}
							type='primary'
							padding='12px 20px'>
							<PlusIcon />
							<TextProvider className='text-white'>ADD CHECKLIST</TextProvider>
						</ButtonProvider>
					</div>
				) : null}
			</div>

			{loadingChecklist ? (
				<div className='h-3/4 w-full flex justify-center items-center'>
					<CircularProgress color='success' />
				</div>
			) : (
				<>
					{checklist?.length === 0 ? (
						<div className='flex flex-col gap-2 justify-center items-center h-full pb-32'>
							<ButtonProvider width='154px' type='primary' padding='12px 20px'>
								<PlusIcon />
								<TextProvider className='text-white'>ADD CHECKLIST</TextProvider>
							</ButtonProvider>
						</div>
					) : (
						<div className='flex p-4 mt-0 flex-col w-full items-center gap-3'>
							{checklist?.map((list) => (
								<ChecklistCard
									key={list.id}
									checklist={list}
									onClick={() => {
										setChecklistId(list.id);
										setChecklistDetailModal(true);
									}}
								/>
							))}
						</div>
					)}
				</>
			)}

			<FloatingAdd
				setAddFunc={() => {
					setAddChecklistModal(true);
				}}
			/>
			<AddChecklistModal
				isOpen={addChecklistModal}
				handleClose={() => setAddChecklistModal(false)}
			/>
			<ChecklistDetailModal
				isOpen={checklistDetailModal}
				handleClose={() => setChecklistDetailModal(false)}
				handleOpen={() => setChecklistDetailModal(true)}
				checklistId={checklistId}
			/>
		</div>
	);
};

export default Checklist;
