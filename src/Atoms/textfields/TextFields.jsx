import { TextField as MUITextField, Typography } from '@material-ui/core';

import React, { useState } from 'react';
import * as yup from 'yup';
import * as types from './propTypes';
import * as defaults from './defaultTypes';

const renderTitle = (title, valid) =>
  title ? (
    <Typography variant="body2" color={valid ? 'inherit' : 'error'}>
      {title}
    </Typography>
  ) : (
    undefined
  );

const EmailTextField = ({ email, onChange, ...rest }) => {
  const [error, setError] = useState(false);

  const validateEmail = async () => {
    if (!email) return;
    try {
      await yup
        .string()
        .email()
        .required()
        .validate(email);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <MUITextField
      fullWidth
      variant="outlined"
      autoComplete="username"
      name="email"
      placeholder="Email"
      helperText={error ? 'Please enter a valid email address' : undefined}
      error={error}
      onChange={onChange}
      onBlur={validateEmail}
      {...rest}
    />
  );
};

EmailTextField.propTypes = types.EmailPropTypes;

const NumberTextField = ({ title, name, min, max, onChange, defaultValue }) => (
  <>
    {renderTitle(title, true)}
    <MUITextField
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

NumberTextField.propTypes = types.NumberPropTypes;
NumberTextField.defaultProps = defaults.NumberDefaultProps;

const PasswordTextField = ({ onChange, ...rest }) => (
  <MUITextField
    fullWidth
    variant="outlined"
    autoComplete="current-password"
    type="password"
    name="password"
    placeholder="Password"
    onChange={onChange}
    {...rest}
  />
);

PasswordTextField.propTypes = types.PasswordPropTypes;

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
    <MUITextField
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

RecipeTextField.propTypes = types.RecipePropTypes;
RecipeTextField.defaultProps = defaults.RecipeDefaultProps;

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
    <MUITextField
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

TimeTextField.propTypes = types.TimePropTypes;
TimeTextField.defaultProps = defaults.TimeDefaultProps;

const TextField = props => <MUITextField {...props} variant="outlined" />;

export default TextField;
export {
  EmailTextField,
  NumberTextField,
  PasswordTextField,
  RecipeTextField,
  TimeTextField,
};
