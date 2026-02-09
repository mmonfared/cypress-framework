/// <reference types="cypress" />

// Page objects
import LoginPage from "../../support/page-objects/login-page"
import MainPage from "../../support/page-objects/main-page"

// Configurations
const username = Cypress.env('username')
const password = Cypress.env('password')


describe('Authentication Tests', { tags: ['@ui'] }, () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Should login with valid credentials', { tags: ['@smoke', '@regression'] }, () => {
        cy.section("Test Body")
        cy.get(LoginPage.usernameInput).type(username)
        cy.get(LoginPage.passwordInput).type(password)
        cy.get(LoginPage.loginButton).click()
        cy.get(MainPage.cartButton).should('be.visible')
    })

    it('Should not login with invalid credentials', { tags: ['@regression'] }, () => {
        cy.section("Test Body")
        cy.get(LoginPage.usernameInput).type("invalid_username")
        cy.get(LoginPage.passwordInput).type("invalid_password")
        cy.get(LoginPage.loginButton).click()
        cy.get(LoginPage.errorMessage)
            .should('be.visible')
            .and('contain.text', 'Username and password do not match')
    })

    it('Should not login with empty credentials', { tags: ['@regression'] }, () => {
        cy.section("Test Body")
        cy.get(LoginPage.loginButton).click()
        cy.get(LoginPage.errorMessage)
            .should('be.visible')
            .and('contain.text', 'Username is required')
    })

    it('Should be able to logout', { tags: ['@regression'] }, () => {
        cy.section("Test Setup")
        cy.login(username, password)
        cy.section("Test Body")
        cy.get(MainPage.menuButton).click()
        cy.get(MainPage.logoutButton).click()
        cy.get(LoginPage.usernameInput).should('be.visible')
    })

})