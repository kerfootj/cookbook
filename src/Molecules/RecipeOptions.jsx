import {
	Button,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@material-ui/core';

import CloudUpload from '@material-ui/icons/CloudUploadOutlined';
import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	rightIcon: {
		marginLeft: 4
	},
	upload: {
		display: 'none'
	}
};
const RecipeOptions = ({
	classes,
	handleButtonChange,
	handleInputChange,
	onImageUpload,
	validate,
	valid
}) => {
	return (
		<>
			<Grid item xs={12}>
				<input
					className={classes.upload}
					accept='image/*'
					id='raised-button-file'
					type='file'
					onChange={onImageUpload}
					multiple
				/>
				<label htmlFor='raised-button-file'>
					<Button component='span' variant='contained'>
						Add Image
						<CloudUpload className={classes.rightIcon} />
					</Button>
				</label>
			</Grid>
			<Grid item xs={4}>
				<Typography
					variant='body2'
					color={valid && valid.prep !== undefined && !valid.prep ? 'error' : 'inherit'}
				>
					Prep Time
				</Typography>
				<TextField
					required
					fullWidth
					variant='outlined'
					placeholder='15m'
					name='prep'
					onChange={handleInputChange}
					onBlur={validate}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography
					variant='body2'
					color={valid && valid.cook !== undefined && !valid.cook ? 'error' : 'inherit'}
				>
					Cook Time
				</Typography>
				<TextField
					required
					fullWidth
					variant='outlined'
					placeholder='1h 45m'
					name='cook'
					onChange={handleInputChange}
					onBlur={validate}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography
					variant='body2'
					color={valid && valid.ready !== undefined && !valid.ready ? 'error' : 'inherit'}
				>
					Ready In
				</Typography>
				<TextField
					required
					fullWidth
					variant='outlined'
					placeholder='2h'
					name='ready'
					onChange={handleInputChange}
					onBlur={validate}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body2'>Servings</Typography>
				<TextField
					required
					fullWidth
					inputProps={{ min: '1' }}
					type='number'
					variant='outlined'
					name='servings'
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={8} />
			<Grid item xs={12}>
				<RadioGroup name='shared' defaultValue='public' onChange={handleButtonChange}>
					<FormControlLabel
						value='private'
						control={<Radio />}
						label='Private - Only I can see this'
					/>
					<FormControlLabel
						value='public'
						control={<Radio />}
						label='Public - Anyone can see this'
					/>
				</RadioGroup>
			</Grid>
		</>
	);
};

export default withStyles(styles)(RecipeOptions);
