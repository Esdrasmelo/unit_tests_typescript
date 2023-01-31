/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/", "enzyme.js"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["json", "text", "lcov", "clover"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // A list of paths to directories that Jest should use to search for files in
  roots: ["tests"],

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/*.test.ts",
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },

  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  testEnvironment: "node",

  preset: "@swc-node/jest",
};
