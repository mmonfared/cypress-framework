const { defineConfig } = require("cypress");
const commonConfigs = require('./cypress.config')

module.exports = defineConfig({
    ...commonConfigs,

    e2e: {
        ...commonConfigs.e2e,
        
        baseUrl: "https://www.dev.saucedemo.com/",
        ApiBaseUrl: "https://dev.jsonplaceholder.typicode.com",
        environment: "dev",
    }
});

