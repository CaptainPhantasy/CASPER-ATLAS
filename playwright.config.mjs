import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.spec.mjs',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4278',
    channel: 'chrome',
    headless: true,
    trace: 'retain-on-failure'
  }
});
