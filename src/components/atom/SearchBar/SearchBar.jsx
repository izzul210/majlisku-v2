/** @format */

import React from 'react';
import { SearchIcon, FilterIcon } from '../../icons/generalIcons';
import './SearchBar.scss';

export function SearchBar({ setSearch, search }) {
	return (
		<div className='search-bar flex gap-1 items-center py-3 px-3 bg-white w-full max-w-md'>
			<SearchIcon />
			<input
				type='text'
				name='default'
				placeholder='Search'
				id='default'
				value={search}
				onChange={(e) => setSearch(e.target.value.toLowerCase())}
				className='bg-transparent outline-none w-full text-black'
			/>
		</div>
	);
}

export function SearchBarWithFilter({ setSearch, search, setFilter, filteredCount }) {
	return (
		<div className='search-bar flex justify-between  items-center py-3 px-3 bg-white w-full max-w-md'>
			<div className='flex flex-1 gap-1 items-center'>
				<SearchIcon />
				<input
					type='text'
					placeholder='Search'
					name='with_filter'
					id='with_filter'
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
					className='bg-transparent outline-none w-full text-black'
				/>
			</div>
			<div className='mx-1 cursor-pointer flex items-center gap-2' onClick={() => setFilter(true)}>
				<FilterIcon />
				{filteredCount > 0 && (
					<div className='filter-count w-6 h-6 rounded-full bg-gray-700 flex justify-center items-center text-white text-xs'>
						{filteredCount}
					</div>
				)}
			</div>
		</div>
	);
}
