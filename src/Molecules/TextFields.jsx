import { TextField, Typography } from '@material-ui/core';

import React from 'react';

const renderTitle = (title, valid) =>
	title ? (
		<Typography variant='body2' color={valid ? 'inherit' : 'error'}>
			{title}
		</Typography>
	) : (
		undefined
	);

const RecipeTextField = ({ title, placeholder, name, rows, onChange }) => (
	<>
		{renderTitle(title, true)}
		<TextField
			required
			fullWidth
			multiline={!!rows}
			rows={rows}
			variant='outlined'
			name={name ? name : title.toLowerCase()}
			placeholder={placeholder}
			onChange={onChange}
		/>
	</>
);

const TimeTextField = ({ title, placeholder, name, valid, onChange, onBlur }) => (
	<>
		{renderTitle(title, valid)}
		<TextField
			required
			fullWidth
			variant='outlined'
			placeholder={placeholder}
			name={name ? name : title.split(' ')[0].toLowerCase()}
			onChange={onChange}
			onBlur={onBlur}
		/>
	</>
);

const NumberTextField = ({ title, name, min, max, onChange }) => (
	<>
		{renderTitle(title, true)}
		<TextField
			required
			fullWidth
			variant='outlined'
			type='number'
			inputProps={{ min: min, max: max }}
			name={name ? name : title.toLowerCase()}
			onChange={onChange}
		/>
	</>
);

export { NumberTextField, RecipeTextField, TimeTextField };
