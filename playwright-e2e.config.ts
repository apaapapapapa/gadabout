const { devices } = require('@playwright/test');

module.exports = {
  testDir: 'tests/e2e/',
  timeout: 30000,
  name: "chromium",
  use: {
    headless: false,
    browserName: 'chromium',
  },
};