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
	...props
}) {
	return (
		<div className='input-container' style={flex ? { flex: 1 } : null}>
			<input
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`input-field text-gray-900 bg-white  ${error ? 'error-field' : ''}`}
				style={flex ? { width: width, flex: 1 } : { width: width }}
				{...props}
			/>
		</div>
	);
}

export default InputField;
