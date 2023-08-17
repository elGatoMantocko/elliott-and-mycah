import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleNameMapper: {
    // resolve static assets to a file mock because we import this path in our code
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  globalSetup: '<rootDir>/app/globalSetupJest.ts',
  setupFiles: ['<rootDir>/app/setupJest.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['./app/**/*.ts', './app/**/*.tsx'],
  ci: process.env.CI === 'true',
  reporters:
    process.env.CI === 'true' ? [['jest-junit', { outputDirectory: 'test-results' }]] : undefined,
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // use ts-jest for typechecking via Jest
  },
};

export default config;
