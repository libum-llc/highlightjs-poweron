import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
};

export default config;
