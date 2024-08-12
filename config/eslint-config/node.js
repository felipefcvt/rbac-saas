/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ['@rocketseat/eslint-config/node'],
  plugins: ['simple-inport-sort'],
  rules: {
    'simple-inport-sort/imports': 'error',    
  },     
}
