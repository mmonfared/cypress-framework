// eslint.config.js
module.exports = {
  plugins: {
    cypress: require('eslint-plugin-cypress'),
    'no-only-tests': require('eslint-plugin-no-only-tests')
  },
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      cy: 'readonly',
      Cypress: 'readonly'
    }
  },
  rules: {
    // Add the rules you want to use here
    'no-unused-vars': 'warn',
    'cypress/no-unnecessary-waiting': 'warn',
    'no-only-tests/no-only-tests': 'error'
  }
};