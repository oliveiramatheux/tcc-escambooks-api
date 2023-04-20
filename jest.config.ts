import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/src/index.ts',
    '!**/src/database/index.ts',
    '!**/src/config/index.ts',
    '!**/src/**/mock/**'
  ],
  testMatch: [
    '**/src/**/*.test.ts'
  ]
}

export default config
