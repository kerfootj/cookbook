import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { TimeTextField } from '../Atoms/TextFields';

const TimeInput = ({ onChange, validate, valid, defaultValues }) => (
  <>
    <Grid item xs={4}>
      <TimeTextField
        title="Prep Time"
        placeholder="15m"
        valid={valid.prep}
        onChange={onChange}
        onBlur={validate}
        defaultValue={defaultValues ? defaultValues.prep : undefined}
      />
    </Grid>
    <Grid item xs={4}>
      <TimeTextField
        title="Cook Time"
        placeholder="1h 45m"
        valid={valid.cook}
        onChange={onChange}
        onBlur={validate}
        defaultValue={defaultValues ? defaultValues.cook : undefined}
      />
    </Grid>
    <Grid item xs={4}>
      <TimeTextField
        title="Ready In"
        placeholder="2h"
        valid={valid.ready}
        onChange={onChange}
        onBlur={validate}
        defaultValue={defaultValues ? defaultValues.ready : undefined}
      />
    </Grid>
  </>
);

TimeInput.propTypes = {
  valid: PropTypes.shape({
    prep: PropTypes.bool,
    cook: PropTypes.bool,
    ready: PropTypes.bool,
  }).isRequired,
  validate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValues: PropTypes.objectOf(PropTypes.string),
};

TimeInput.defaultProps = {
  defaultValues: {},
};

export default TimeInput;
