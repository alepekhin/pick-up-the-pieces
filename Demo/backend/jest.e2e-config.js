module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom : ["app/**/*.ts","app.module.ts"],
  rootDir: 'src',
  testRegex: '.e2e-test.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  testTimeout: 600000,
};
