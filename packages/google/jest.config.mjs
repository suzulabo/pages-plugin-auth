/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testRegex: '.+\\.test\\.ts$',
  transform: {
    '.+\\.ts$': ['ts-jest'],
  },
  setupFiles: ['./jest.setup.mjs'],
};

export default config;
