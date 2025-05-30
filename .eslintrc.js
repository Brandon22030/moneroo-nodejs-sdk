module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true // Add Jest environment
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': 'off', // Turn off linebreak style checking
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': ['off'],
    'no-undef': ['error'] // Add rule for undefined variables
  },
  globals: {
    // Add Jest globals
    'describe': 'readonly',
    'test': 'readonly',
    'expect': 'readonly',
    'jest': 'readonly',
    'beforeEach': 'readonly',
    'afterEach': 'readonly'
  }
};
