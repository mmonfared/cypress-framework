const { defineConfig } = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos',
    downloadsFolder: 'cypress/downloads',
    experimentalMemoryManagement: true,
    experimentalWebKitSupport: true,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    retries: { "openMode": 0, "runMode": 1 },
    pageLoadTimeout: 20000,
    projectId: "pu82hs",
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        // charts: true,
        reportPageTitle: 'custom-title',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        videoOnFailOnly: true,
        reportDir: `cypress/reports/mochawesome-${process.env.CYPRESS_BROWSER || 'electron'}-${new Date().toISOString().split('T')[0]}`,
        reportFilename: `report-${process.env.CYPRESS_BROWSER || 'electron'}-[datetime]`,
  },
    e2e: {
        setupNodeEvents(on, config) {
            // Include the grep plugin
            require('@bahmutov/cy-grep/src/plugin')(config);
            require('cypress-mochawesome-reporter/plugin')(on);
            return config;
        },
        baseUrl: "https://www.saucedemo.com/",
        ApiBaseUrl: "https://jsonplaceholder.typicode.com",
        environment: "qa",
        grepFilterSpecs: true,
        grepOmitFiltered: true,
        experimentalPromptCommand: true,
    }
});

