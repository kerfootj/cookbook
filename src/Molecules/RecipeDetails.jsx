import { Grid, withStyles } from '@material-ui/core';

import React from 'react';
import { RecipeTextField } from '../Molecules/TextFields';

const styles = {
	container: {
		padding: 30
	}
};

const RecipeDetails = ({ classes, handleInputChange, handleMultiLineInputChange }) => {
	return (
		<Grid container spacing={2} className={classes.container}>
			<Grid item xs={12}>
				<RecipeTextField title='Recipe Title' name='title' onChange={handleInputChange} />
			</Grid>
			<Grid item xs={12}>
				<RecipeTextField rows={3} title='Description' onChange={handleInputChange} />
			</Grid>
			<Grid item xs={12}>
				<RecipeTextField
					rows={8}
					title='Description'
					placeholder='Put each ingredient on its own line'
					onChange={handleMultiLineInputChange}
				/>
			</Grid>
			<Grid item xs={12}>
				<RecipeTextField
					rows={8}
					title='Instructions'
					placeholder='Put each step on its own line'
					onChange={handleMultiLineInputChange}
				/>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(RecipeDetails);
