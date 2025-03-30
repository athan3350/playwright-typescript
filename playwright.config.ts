import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
    permissions: ['notifications'],
    locale: 'en-US',
    screenshot: 'only-on-failure',
    trace: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        launchOptions: {
          args: [
            "--remote-debugging-port=9222",
            "--force-device-scale-factor=1",
            "--disable-blink-features=AutomationControlled",
            "--disable-popup-blocking",
            "--disable-infobars",
            "--no-default-browser-check",
            "--no-first-run",
            "--disable-background-networking",
            "--disable-dev-shm-usage",
            "--disable-features=IsolateOrigins,site-per-process",
            "--disable-hang-monitor",
            "--disable-ipc-flooding-protection",
            "--disable-prompt-on-repost",
            "--disable-renderer-backgrounding",
            "--disable-sync",
            "--metrics-recording-only",
            "--no-sandbox",
            "--allow-running-insecure-content",
            "--disable-extensions",
            "--disable-web-security",
            "--disable-popup-blocking",
            "--disable-infobars",
          ],
        },
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          args: []
        },
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        launchOptions: {
          args: []
        },
      },
    }
  ],
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});