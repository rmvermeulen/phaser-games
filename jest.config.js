module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: 'jest-extended',
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['\.json'],
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
