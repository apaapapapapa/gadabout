const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests',
  timeout: 30000,
  name: "chromium",
  use: {
    headless: false,
    browserName: 'chromium',
  },
};