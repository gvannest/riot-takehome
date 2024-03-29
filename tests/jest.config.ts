import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '../',
  setupFiles: ['<rootDir>/tests/setup.ts'],
};

export default config;
