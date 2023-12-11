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
	controls = null,
	...props
}) => {
	return (
		<div>
			<TextProvider colorStyle={'#475467'} className={`font-semibold ${textSize} uppercase mb-1 `}>
				{title}
			</TextProvider>
			<InputField
				type={type}
				name={title}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				controls={controls}
				{...props}
			/>
		</div>
	);
};

export default InputFieldProvider;
