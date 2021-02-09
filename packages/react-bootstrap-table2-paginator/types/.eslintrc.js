// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersion: 2020
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};
