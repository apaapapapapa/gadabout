import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: 'src/__tests__/component/',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    viewport: { width: 1280, height: 720 },
  },
});