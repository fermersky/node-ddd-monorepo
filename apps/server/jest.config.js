export default {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  displayName: 'Node.js DDD Sample',
  transform: {},
  testRegex: '(/dist/tests/.*|(\\.|/)(test|spec))\\.js?$',
  testPathIgnorePatterns: ['/node_modules/', 'common.js', 'common.ts'],
};
