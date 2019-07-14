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
	}
};

const RecipeOptions = ({ classes, handleButtonChange, handleInputChange, imageUploadHandler }) => {
	return (
		<>
			<Grid item xs={12}>
				<input
					style={{ display: 'none' }}
					accept='image/*'
					id='raised-button-file'
					type='file'
					onChange={imageUploadHandler}
				/>
				<label htmlFor='raised-button-file'>
					<Button component='span' variant='contained'>
						Add Image
						<CloudUpload className={classes.rightIcon} />
					</Button>
				</label>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body2'>Prep Time</Typography>
				<TextField
					required
					fullWidth
					variant='outlined'
					placeholder='15m'
					name='prep'
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body2'>Cook Time</Typography>
				<TextField
					required
					fullWidth
					variant='outlined'
					placeholder='1h 30m'
					name='cook'
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body2'>Ready In</Typography>
				<TextField
					fullWidth
					variant='outlined'
					placeholder='Optional'
					name='ready'
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body2'>Servings</Typography>
				<TextField
					required
					fullWidth
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
