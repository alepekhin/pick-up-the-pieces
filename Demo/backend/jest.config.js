module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom : ["app/**/*.ts"],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
