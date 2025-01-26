module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'], // SWC для транспіляції JavaScript/TypeScript
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!your-package-with-svgs/)'],
};
