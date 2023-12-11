/** @format */

import React from 'react';
import './InputField.scss';

function InputField({
	width = '100%',
	type,
	flex = false,
	name,
	id,
	placeholder,
	value,
	onChange,
	error = false,
	icon = null,
	controls = null,
	...props
}) {
	if (icon) {
		return (
			<div className='input-container'>
				<div
					className={`input-field flex flex-row items-center gap-2 text-gray-900 bg-white  ${
						error ? 'error-field' : ''
					}`}
					style={flex ? { flex: 1 } : null}>
					{icon}
					{controls ? (
						<input
							type={type}
							name={name}
							placeholder={placeholder}
							className='outline-none'
							style={flex ? { width: width, flex: 1 } : { width: width }}
							{...controls}
							{...props}
						/>
					) : (
						<input
							type={type}
							name={name}
							id={id}
							placeholder={placeholder}
							value={value}
							className='outline-none'
							onChange={onChange}
							style={flex ? { width: width, flex: 1 } : { width: width }}
							{...props}
						/>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className='input-container' style={flex ? { flex: 1 } : null}>
				{controls ? (
					<input
						type={type}
						name={name}
						placeholder={placeholder}
						className={`input-field outline-none text-gray-900 bg-white  ${
							error ? 'error-field' : ''
						}`}
						style={flex ? { width: width, flex: 1 } : { width: width }}
						{...controls}
						{...props}
					/>
				) : (
					<input
						type={type}
						name={name}
						id={id}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						className={`input-field outline-none text-gray-900 bg-white  ${
							error ? 'error-field' : ''
						}`}
						style={flex ? { width: width, flex: 1 } : { width: width }}
						{...props}
					/>
				)}
			</div>
		);
	}
}

export default InputField;
