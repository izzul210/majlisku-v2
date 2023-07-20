/** @format */

import React from 'react';
import InputField from './InputField';
import TextProvider from '../TextProvider/TextProvider';

const InputFieldProvider = ({
	title,
	placeholder,
	value,
	id,
	onChange,
	type = 'text',
	textSize = 'text-sm',
	...props
}) => {
	return (
		<div>
			<TextProvider className={`font-semibold ${textSize} uppercase mb-1 text-gray-900`}>
				{title}
			</TextProvider>
			<InputField
				type={type}
				name={title}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
};

export default InputFieldProvider;
