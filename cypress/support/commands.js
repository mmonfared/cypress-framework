// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "./page-objects/login-page"
import MainPage from "./page-objects/main-page"

Cypress.Commands.add('login', (username, password) => {
    cy.session(
        [username, password],
        () => {
            cy.visit('/')
            cy.get(LoginPage.usernameInput).type(username)
            cy.get(LoginPage.passwordInput).type(password)
            cy.get(LoginPage.loginButton).click()
            cy.get(MainPage.cartButton).should('be.visible')            
        }
    )

    // cy.visit('/')
    // cy.get('body').then(($body) => {
    //     if ($body.find(MainPage.cartButton).length === 0) {
    //         cy.get(LoginPage.usernameInput).should('be.visible').type(username)
    //         cy.get(LoginPage.passwordInput).type(password)
    //         cy.get(LoginPage.loginButton).click()
    //     }
    // })
    // cy.get(MainPage.cartButton, { timeout: 10000 }).should('be.visible')
})