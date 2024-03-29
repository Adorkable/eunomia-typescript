module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  reporters: ["default", ["jest-junit", { outputName: "jest-junit.xml" }]],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/__testUtilities__.ts'
  ]
};