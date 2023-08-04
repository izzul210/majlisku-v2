/** @format */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)(({ fontStyle, error }) => ({
	'& label.Mui-focused': {
		color: 'green',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'green',
	},
	'& .MuiOutlinedInput-input': {
		padding: '0px',
		textTransform: fontStyle.textTransform,
		fontWeight: fontStyle.fontWeight,
	},
	'& .MuiOutlinedInput-root': {
		fontFamily: fontStyle.fontFamily,
		fontSize: fontStyle.fontSize,

		color: 'black',
		border: error ? '1px solid red' : '1px solid rgba(0,0,0,0)',
		borderRadius: '0px',
		transition: 'all 0.3s ease-in-out',
		'&:hover': {
			border: '1px solid rgba(102, 112,133,1)',
			boxShadow: '0px 5px 16px rgba(0,0,0,0.2)',
			transition: 'all 0.3s ease-in-out',
		},
		'&.Mui-focused': {
			boxShadow: '0px 5px 16px rgba(0,0,0,0.2)',
			border: '1px solid rgba(102, 112,133,1)',
			transition: 'all 0.3s ease-in-out',
		},

		'& fieldset': {
			border: 'none',
		},
		// '&:hover fieldset': {
		// 	border: '1px solid rgba(0,0,0,0)',
		// },
		// '&.Mui-focused fieldset': {
		// 	border: '1px solid rgba(0,0,0,0)',
		// },
	},
}));

export default function EditContentField(props) {
	const {
		name,
		error = false,
		fontStyle = {
			fontSize: '16px',
			fontFamily: 'EB Garamond',
			fontWeight: '400',
			textTransform: 'normal',
		},
		required = false,
	} = props;

	return <CssTextField fontStyle={fontStyle} error={error} {...props} />;
}
