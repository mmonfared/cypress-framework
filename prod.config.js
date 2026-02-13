const { defineConfig } = require("cypress");
const commonConfigs = require('./cypress.config')

module.exports = defineConfig({
    ...commonConfigs,

    e2e: {
        ...commonConfigs.e2e,

        baseUrl: "https://www.saucedemo.com/",
        ApiBaseUrl: "https://jsonplaceholder.typicode.com",
        environment: "prod",
    }
});

