import { defineConfig, devices } from '@playwright/test';
import { env, AUTH_FILE } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    // Logs in once and saves the session, so other UI tests start already logged in
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    // Login tests need a fresh browser with no session
    {
      name: 'login',
      testMatch: /e2e\/login\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // Other UI tests reuse the saved session
    {
      name: 'chromium',
      testMatch: /e2e\/.*\.spec\.ts/,
      testIgnore: /login\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: AUTH_FILE },
    },
    {
      name: 'firefox',
      testMatch: /e2e\/.*\.spec\.ts/,
      testIgnore: /login\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], storageState: AUTH_FILE },
    },

    // API tests don't open a browser
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: { baseURL: env.apiUrl },
    },
  ],
});
