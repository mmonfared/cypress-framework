class CheckoutPage {
    
    // Checkout page - Step 1
    static firstNameInput = "[data-test='firstName']"
    static lastNameInput = "[data-test='lastName']"
    static postalCodeInput = "[data-test='postalCode']"
    static continueButton = "[data-test='continue']"
    static cancelButton = "[data-test='cancel']"
    static finishButton = "[data-test='finish']"
    static cancelButton = "[data-test='cancel']"
    static cancelButton = "[data-test='cancel']"

    // Checkout page - Step 2
    static itemTotal = "[data-test='subtotal-label']"
    static tax = "[data-test='tax-label']"
    static total = "[data-test='total-label']"
    static finishButton = "[data-test='finish']"

    // Checkout page - Success 
    static thankYouMessage = "[data-test='complete-header']"
}

export default CheckoutPage;