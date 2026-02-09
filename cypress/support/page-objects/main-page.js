class MainPage {
    // Header
    static cartButton = '[data-test="shopping-cart-link"]'
    static menuButton = "#react-burger-menu-btn"
    static carBadge = ".shopping_cart_badge"

    // Products
    static addToCartButton = (name) => `[data-test="add-to-cart-sauce-labs-${name}"]`
    static removeFromCartButton = (name) => `[data-test="remove-sauce-labs-${name}"]`
    static itemPrice = '[data-test="inventory-item-price"]'

    // Menu button
    static allItemsButton = "#inventory_sidebar_link"
    static aboutButton = "#about_sidebar_link"
    static logoutButton = "#logout_sidebar_link"
    static closeMenuButton = "#react-burger-cross-btn"

}

export default MainPage;