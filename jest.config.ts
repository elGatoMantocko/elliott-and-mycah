import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleNameMapper: {
    // resolve static assets to a file mock because we setup webpack to import the path in our code
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['<rootDir>/app/setupJest.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jsdom',
  ci: process.env.CI === 'true',
  reporters:
    process.env.CI === 'true' ? [['jest-junit', { outputDirectory: 'test-results' }]] : undefined,
};

export default config;
