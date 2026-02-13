// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-plugin-api'
import 'cypress-plugin-steps'
import '@4tw/cypress-drag-drop'
import "cypress-real-events"
import 'cypress-if'
import './commands'
import 'cypress-mochawesome-reporter/register';



// load and register the grep feature using "require" function
// https://github.com/bahmutov/cy-grep
const registerCypressGrep = require('@bahmutov/cy-grep')
registerCypressGrep()

before(() => {
    // Ensure that all sessions are cleared up even if you re-run the spec in the Cypress App UI (Test Runner)
    cy.log('close all sessions')
    Cypress.session.clearAllSavedSessions()
});

beforeEach(() => {
    // Ignore application uncaught exceptions
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
});