const { defineConfig } = require("cypress");
const commonConfigs = require('./cypress.config')

module.exports = defineConfig({
    ...commonConfigs,

    e2e: {
        ...commonConfigs.e2e,

        baseUrl: "https://www.qa.saucedemo.com/",
        ApiBaseUrl: "https://qa.jsonplaceholder.typicode.com",
        environment: "qa",
    }
});

