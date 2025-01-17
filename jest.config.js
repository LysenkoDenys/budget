module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'], // SWC для транспіляції JavaScript/TypeScript
  },
  testEnvironment: 'jsdom',
};
