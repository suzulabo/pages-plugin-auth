/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  ...require('@suzulabo/code-config-typescript/eslint'),
};

module.exports = config;
