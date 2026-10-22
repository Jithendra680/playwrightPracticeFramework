
require('dotenv').config({
    path: require('path').resolve(__dirname, '.env')
});

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'reports/html',
            open: 'never'
        }]
    ],

    outputDir: 'test-results',

    use: {
        baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure'
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]
});
