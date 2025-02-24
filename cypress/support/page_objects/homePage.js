
export class HomePage {

    logIn(username, password) {
        cy.get('.nav-item').contains('Log in').click()
        cy.get('#loginusername').type(username)
        cy.get('#loginpassword').type(password)
        cy.intercept('POST', '/check').as('loginCompleted')
        cy.contains('button', 'Log in').click()
        cy.wait('@loginCompleted') // wait explicitly for this route to finish
        // Assert user is logged in correctly
        cy.get('#nameofuser').should('contain', `Welcome ${username}`)

    }

    addProductToCart(index) {
        cy.get('.card-title').eq(index).click()
        cy.contains('Add to cart').click()
    }

}
    
export const onHomePage = new HomePage()