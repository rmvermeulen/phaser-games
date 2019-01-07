module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  setupTestFrameworkScriptFile: 'jest-extended',
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['.json'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      // diagnostics: {
      //   warnOnly: true,
      // },
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
