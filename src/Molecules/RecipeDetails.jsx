import { Grid, TextField, Typography, withStyles } from '@material-ui/core';

import React from 'react';

const styles = {
	container: {
		padding: 30,
	}
}

const RecipeDetails = ({ classes, handleInputChange, handleMultiLineInputChange }) => {
	return (
		<Grid container spacing={2} className={classes.container}>
			<Grid item xs={12}>
				<Typography variant='body2'>Recipe Title</Typography>
				<TextField
					fullWidth
					required
					variant='outlined'
					name='recipe'
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body2'>Description</Typography>
				<TextField
					fullWidth
					multiline
					rows={3}
					variant='outlined'
					name='description'
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body2'>Ingredients</Typography>
				<TextField
					required
					fullWidth
					multiline
					rows={8}
					variant='outlined'
					placeholder='Put each ingredient on its own line'
					name='ingredients'
					onChange={handleMultiLineInputChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body2'>Instructions</Typography>
				<TextField
					required
					fullWidth
					multiline
					rows={8}
					variant='outlined'
					placeholder='Put each step on its own line'
					name='instructions'
					onChange={handleMultiLineInputChange}
				/>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(RecipeDetails);
