module.exports =  {
  parser:  'babel-eslint',  // Specifies the ESLint parser
  extends:  [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'airbnb',
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions:  {
  ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
  sourceType:  'module',  // Allows for the use of imports
  ecmaFeatures:  {
    jsx:  true,  // Allows for the parsing of JSX
  },
  },
  rules:  {
    'no-console': 'error',
    'no-alert': 'error',
    'require-jsdoc': 'error',
    'react/no-unused-state': 'off', // TODO: remove this rule
    'react/no-array-index-key': 'off', // Curently using it with template strings
    'react/static-property-placement': 'off', // Allows PropTypes to be at the top of the file 
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off', // Mongo ID's use a dangling underscore
    'jsx-a11y/label-has-associated-control': 'off', // Remove this if I add drop-zone
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    browser: true,
    node: true,
  }
};