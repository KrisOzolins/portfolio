/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'], // Or any pattern that matches your test files.
  setupFiles: ["./tests/setup.js"],
  // setupFilesAfterEnv: ["./tests/setup.js"],
  coverageDirectory: './tests/coverage',
};

// jest.config.js
module.exports = config;
