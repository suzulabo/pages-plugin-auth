/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    'require-await': 'off',
    '@typescript-eslint/require-await': 'warn',

    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: false,
        },
        'warnOnUnassignedImports': true,
      },
    ],

    'import/no-extraneous-dependencies': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: true,
    },
  },
};

module.exports = config;
