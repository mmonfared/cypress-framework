/// <reference types="cypress" />

// Page objects
import LoginPage from "../../support/page-objects/login-page"
import MainPage from "../../support/page-objects/main-page"

// Configurations
let username
let password

before(() => {
    cy.env(['username', 'password']).then((env) => {
        username = env.username
        password = env.password
    })
})

/**
 * Used Gherkin Syntax + cy.step() for better logs and more clear test steps
 */
describe('Authentication Tests', { tags: ['@ui'] }, () => {

    context("When user is logged out", () => {
        beforeEach(() => {
            cy.step("GIVEN I'm in Login page")
            cy.visit('/')
        })
        it('Should login with valid credentials', { tags: ['@smoke', '@regression'] }, () => {
            cy.step("WHEN I put valid credentials and click the Login button")
            cy.get(LoginPage.usernameInput).type(username)
            cy.get(LoginPage.passwordInput).type(password)
            cy.get(LoginPage.loginButton).click()
            cy.step("THEN I should login successfully")
            cy.get(MainPage.cartButton).should('be.visible')
        })

        it('Should not login with invalid credentials', { tags: ['@regression'] }, () => {
            cy.step("WHEN I put invalid credentials and click the Login button")
            cy.get(LoginPage.usernameInput).type("invalid_username")
            cy.get(LoginPage.passwordInput).type("invalid_password")
            cy.get(LoginPage.loginButton).click()
            cy.step("THEN I should see error message")
            cy.get(LoginPage.errorMessage)
                .should('be.visible')
                .and('contain.text', 'Username and password do not match')
        })

        it('Should not login with empty credentials', { tags: ['@regression'] }, () => {
            cy.step("WHEN I click the login without putting credentials")
            cy.get(LoginPage.loginButton).click()
            cy.step("THEN I should see error message")
            cy.get(LoginPage.errorMessage)
                .should('be.visible')
                .and('contain.text', 'Username is required')
        })
    })

    context("When user is logged in", () => {
        beforeEach(() => {
            cy.step("GIVEN I'm logged in")
            cy.visit('/')
            cy.login(username, password)

        })

        it('Should be able to logout', { tags: ['@regression'] }, () => {
            cy.step("WHEN I logout")
            cy.visit('/inventory.html', { failOnStatusCode: false })
            cy.get(MainPage.menuButton).click()
            cy.get(MainPage.logoutButton).click()
            cy.step("THEN I should navigate to login page")
            cy.get(LoginPage.usernameInput).should('be.visible')
        })
    })

})