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
    defaultCommandTimeout: 15000,
    projectId: "YOUR ID HERE",
    e2e: {
        setupNodeEvents(on, config) {
            // Include the grep plugin
            require('@bahmutov/cy-grep/src/plugin')(config);
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

