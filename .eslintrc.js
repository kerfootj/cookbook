module.exports =  {
  parser:  'babel-eslint',  // Specifies the ESLint parser
  extends:  [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
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