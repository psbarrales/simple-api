module.exports = {
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
}
