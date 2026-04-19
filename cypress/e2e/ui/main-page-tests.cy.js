/// <reference types="cypress" />

// Page objects
import LoginPage from "../../support/page-objects/login-page"
import MainPage from "../../support/page-objects/main-page"
import CartPage from "../../support/page-objects/cart-page"
import CheckoutPage from "../../support/page-objects/checkout-page"

// Configurations
let username
let password

before(() => {
    cy.section("Suite Setup")
    cy.env(['username', 'password']).then((env) => {
        username = env.username
        password = env.password 
    })
})

/**
 * Used cy.section() for distinguish between test stages
 * Used AAA syntax (Arrange/Act/Assert) + cy.step() for better logs and more clear test steps
 */

describe('Main Page Tests', { tags: ['@ui'] }, () => {

    beforeEach(() => {
        cy.section("Test Setup")
        cy.step("ARRANGE: Login user and visit home page")
        cy.login(username, password)
        cy.visit('/inventory.html', {failOnStatusCode: false})
        
    })

    it('Should be able to add a product to the cart', { tags: ['@smoke', '@regression'] }, () => {
        cy.section("Test Body")
        cy.step("ACT: add an item to the cart")
        cy.get(MainPage.addToCartButton('backpack')).click()
        cy.get(MainPage.cartButton).should('be.visible')
        cy.step("ASSERT: The cart badge should be updated")
        cy.get(MainPage.cartBadge).should('contain.text', '1')
    })

    it('Should be able to remove a product from the cart', { tags: ['@regression'] }, () => {
        cy.section("Test Body")
        cy.step("ARRANGE: Add items to the cart")
        cy.get(MainPage.addToCartButton('backpack')).click()
        cy.get(MainPage.cartBadge).should('contain.text', '1')
        cy.step("ACT: Remove item from the cart")
        cy.get(MainPage.removeFromCartButton('backpack')).click()
        cy.step("ASSERT: Verify cart is empty")
        cy.get(MainPage.cartButton).should('be.visible')
        cy.get(MainPage.cartBadge).should('not.exist')
    })

    it('Should be able to do e2e purchase flow', { tags: ['@regression'] }, () => {
        cy.section("Test Setup")
        cy.step("ARRANGE: Add some items to the cart")
        const item1 = MainPage.addToCartButton('backpack')
        const item2 = MainPage.addToCartButton('bike-light')
        const item3 = MainPage.addToCartButton('bolt-t-shirt')
        cy.get(item1).click()
        cy.get(item2).click()
        cy.get(item3).click()
        cy.get(MainPage.cartBadge).should('contain.text', '3')

        cy.section("Test Body")
        cy.step("ACT: Conitnue with the checkout process")
        cy.get(MainPage.cartButton).click()
        cy.get(CartPage.checkoutButton).click()
        cy.get(CheckoutPage.firstNameInput).type('John')
        cy.get(CheckoutPage.lastNameInput).type('Doe')
        cy.get(CheckoutPage.postalCodeInput).type('12345')
        cy.get(CheckoutPage.continueButton).click()
        cy.get(CheckoutPage.finishButton).click()
        cy.step('ASSERT: Purchase approval and "Thank You" message should be appeard')
        cy.get(CheckoutPage.thankYouMessage).should('be.visible')
    })

})