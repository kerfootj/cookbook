import { TextField, Typography } from '@material-ui/core';

import React from 'react';
import PropTypes from 'prop-types';

const renderTitle = (title, valid) =>
  title ? (
    <Typography variant="body2" color={valid ? 'inherit' : 'error'}>
      {title}
    </Typography>
  ) : (
    undefined
  );

const RecipeTextField = ({
  title,
  placeholder,
  name,
  rows,
  onChange,
  defaultValue,
}) => (
  <>
    {renderTitle(title, true)}
    <TextField
      required
      fullWidth
      multiline={!!rows}
      rows={rows}
      variant="outlined"
      name={name || title.toLowerCase()}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </>
);

RecipeTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

RecipeTextField.defaultProps = {
  defaultValue: undefined,
  name: undefined,
  placeholder: undefined,
  rows: undefined,
};

const TimeTextField = ({
  title,
  placeholder,
  name,
  valid,
  onChange,
  onBlur,
  defaultValue,
}) => (
  <>
    {renderTitle(title, valid)}
    <TextField
      required
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      name={name || title.split(' ')[0].toLowerCase()}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={defaultValue}
    />
  </>
);

TimeTextField.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
};

TimeTextField.defaultProps = {
  defaultValue: undefined,
  name: undefined,
  placeholder: undefined,
  valid: true,
};

const NumberTextField = ({ title, name, min, max, onChange, defaultValue }) => (
  <>
    {renderTitle(title, true)}
    <TextField
      required
      fullWidth
      variant="outlined"
      type="number"
      inputProps={{ min, max }}
      name={name || title.toLowerCase()}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </>
);

NumberTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
};

NumberTextField.defaultProps = {
  defaultValue: undefined,
  name: undefined,
  max: undefined,
  min: undefined,
};

export { NumberTextField, RecipeTextField, TimeTextField };
