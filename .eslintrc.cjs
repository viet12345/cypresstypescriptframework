// .eslintrc.cjs
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'cypress'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended'
  ],
  env: {
    node: true,
    browser: true,
    'cypress/globals': true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-console': 'off'
  },
  ignorePatterns: ['node_modules/', 'dist/', 'cypress/videos/', 'cypress/screenshots/']
};
