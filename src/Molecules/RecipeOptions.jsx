import { Button, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { NumberTextField, TimeTextField } from '../Molecules/TextFields';

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
	console.log(valid);
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
				<TimeTextField
					title='Prep Time'
					placeholder='15m'
					valid={valid.prep}
					onChange={handleInputChange}
					onBlur={validate}
				/>
			</Grid>
			<Grid item xs={4}>
				<TimeTextField
					title='Cook Time'
					placeholder='1h 45m'
					valid={valid.cook}
					onChange={handleInputChange}
					onBlur={validate}
				/>
			</Grid>
			<Grid item xs={4}>
				<TimeTextField
					title='Ready In'
					placeholder='2h'
					valid={valid.ready}
					onChange={handleInputChange}
					onBlur={validate}
				/>
			</Grid>
			<Grid item xs={4}>
				<NumberTextField title='Servings' min='1' onChange={handleInputChange} />
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
