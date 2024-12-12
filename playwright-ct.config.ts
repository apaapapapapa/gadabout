import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: 'tests/component/',
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    viewport: { width: 1280, height: 720 },
    ctPort: 3100,
  },
});