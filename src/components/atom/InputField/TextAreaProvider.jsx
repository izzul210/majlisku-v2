/** @format */

import React from 'react';
import TextProvider from '../TextProvider/TextProvider';

function TextAreaProvider({
	title,
	placeholder,
	value,
	id,
	onChange,
	type = 'text',
	flex = false,
	width = '100%',
	className = '',
	minHeight = '80px',
	error = false,
	controls = null,
	...props
}) {
	return (
		<div>
			<TextProvider colorStyle='#475467' className='font-semibold text-sm uppercase mb-1'>
				{title}
			</TextProvider>
			<div className='input-container' style={flex ? { flex: 1 } : null}>
				<textarea
					type={type}
					id={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={`input-field ${className} ${error ? 'error-field' : ''}`}
					style={
						flex
							? { width: width, flex: 1, minHeight: minHeight }
							: { width: width, minHeight: minHeight }
					}
					{...controls}
					{...props}
				/>
			</div>
		</div>
	);
}

export default TextAreaProvider;
