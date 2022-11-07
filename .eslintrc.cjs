/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  ...require('@suzulabo/code-config-typescript/eslint-config'),
};

module.exports = config;
