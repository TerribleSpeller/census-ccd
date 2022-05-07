//
// @README:
// Turn on "Automatic ESLint configuration" under
//   Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.
//

module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier', 'unicorn'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'function-paren-newline': ['error', 'consistent'],
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],

    'no-unused-vars': ['error'],

    'semi': ['error'],
  },
  overrides: [],
};
