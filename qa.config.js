const { defineConfig } = require("cypress");
const commonConfigs = require('./cypress.config')

module.exports = defineConfig({
    ...commonConfigs,

    e2e: {
        ...commonConfigs.e2e,

        baseUrl: "https://www.saucedemo.com/", // https://www.qa.saucedemo.com/ in real projects
        ApiBaseUrl: "https://jsonplaceholder.typicode.com",
        environment: "qa",
    }
});

