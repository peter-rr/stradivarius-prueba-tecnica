import { onCartPage } from "../support/page_objects/cartPage"
import { onHomePage } from "../support/page_objects/homePage"
import { navigateTo } from "../support/page_objects/navigationPage"

describe('Validates the shopping cart works correctly', () => {

    beforeEach('open home page', () => {
        cy.visit('/')
    })

    it.only('login with existing user', () => {
        onHomePage.logIn('test-customer@maildrop.cc', 'Password123')
    })

    it('Add items to cart and verify number of products is updated', () => {
        onHomePage.addProductToCart(0)
        navigateTo.cartPage()
        onCartPage.countProductsInCart()
        cy.get('tbody tr').should('have.length', 1)
        navigateTo.homePage()
        onHomePage.addProductToCart(1)
        navigateTo.cartPage()
        onCartPage.countProductsInCart()
        cy.get('tbody tr').should('have.length', 2)
    })

    it('Removes items from cart and verify number of products is updated', () => {
        onHomePage.addProductToCart(0)
        navigateTo.homePage()
        onHomePage.addProductToCart(1)
        navigateTo.cartPage()
        onCartPage.removeProductFromCart(0)
        onCartPage.countProductsInCart()
        cy.get('tbody tr').should('have.length', 1)
    })

    it('Verify total price is updated when adding or removing items', () => {
        onHomePage.addProductToCart(0)
        navigateTo.homePage()
        onHomePage.addProductToCart(1)
        navigateTo.cartPage()
        onCartPage.checkTotalPrice()
        onCartPage.removeProductFromCart(0)
        onCartPage.checkTotalPrice()
    })

})