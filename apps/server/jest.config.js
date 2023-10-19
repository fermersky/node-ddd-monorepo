export default {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  displayName: 'Node.js DDD Sample',
  transform: {},
  testRegex: '(/src/tests/.*|(\\.|/)(test|spec))\\.js?$',
  testPathIgnorePatterns: ['/node_modules/', 'common.js'],
};
