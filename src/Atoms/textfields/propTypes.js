import PropTypes from 'prop-types';

const EmailPropTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const NumberPropTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
};

const PasswordPropTypes = {
  onChange: PropTypes.func.isRequired,
};

const RecipePropTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

const TimePropTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
};

export {
  EmailPropTypes,
  NumberPropTypes,
  PasswordPropTypes,
  RecipePropTypes,
  TimePropTypes,
};
