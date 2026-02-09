/// <reference types="cypress" />

// Page objects
import LoginPage from "../../support/page-objects/login-page"
import MainPage from "../../support/page-objects/main-page"
import CartPage from "../../support/page-objects/cart-page"
import CheckoutPage from "../../support/page-objects/checkout-page"

// Configurations
const username = Cypress.env('username')
const password = Cypress.env('password')


describe('Main Page Tests', { tags: ['@ui'] }, () => {

    beforeEach(() => {
        cy.visit('/')
        cy.login(username, password)
        
    })

    it('Should be able to add a product to the cart', { tags: ['@smoke', '@regression'] }, () => {
        cy.section("Test Body")
        cy.get(MainPage.addToCartButton('backpack')).click()
        cy.get(MainPage.cartButton).should('be.visible')
        cy.get(MainPage.carBadge).should('contain.text', '1')
    })

    it('Should be able to remove a product from the cart', { tags: ['@regression'] }, () => {
        cy.section("Test Body")
        cy.get(MainPage.addToCartButton('backpack')).click()
        cy.get(MainPage.carBadge).should('contain.text', '1')
        cy.get(MainPage.removeFromCartButton('backpack')).click()
        cy.get(MainPage.cartButton).should('be.visible')
        cy.get(MainPage.carBadge).should('not.exist')
    })

    it('Should be able to do e2e purchase flow', { tags: ['@regression'] }, () => {
        cy.section("Test Setup")
        const item1 = MainPage.addToCartButton('backpack')
        const item2 = MainPage.addToCartButton('bike-light')
        const item3 = MainPage.addToCartButton('bolt-t-shirt')
        cy.get(item1).click()
        cy.get(item2).click()
        cy.get(item3).click()
        cy.get(MainPage.carBadge).should('contain.text', '3')

        cy.section("Test Body")
        cy.get(MainPage.cartButton).click()
        cy.get(CartPage.checkoutButton).click()
        cy.get(CheckoutPage.firstNameInput).type('John')
        cy.get(CheckoutPage.lastNameInput).type('Doe')
        cy.get(CheckoutPage.postalCodeInput).type('12345')
        cy.get(CheckoutPage.continueButton).click()
        cy.get(CheckoutPage.finishButton).click()
        cy.get(CheckoutPage.thankYouMessage).should('be.visible')
    })

})