module.exports = {
    testEnvironment: 'jsdom',

    testMatch: ['**/tests/unit/**/*.test.{js,jsx,ts,tsx}'],

    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },

    setupFilesAfterEnv: ['@testing-library/jest-dom'],
  
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  };