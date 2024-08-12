/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ['@rocketseat/eslint-config/next'],
  plugins: ['simple-inport-sort'],
  rules: {
    'simple-inport-sort/imports': 'error',
  },
}
