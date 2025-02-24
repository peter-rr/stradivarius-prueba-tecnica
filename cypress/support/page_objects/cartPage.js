
export class CartPage {

    countProductsInCart() {
        cy.intercept('POST', '/viewcart').as('getCart')
        cy.get('tbody tr').its('length').then((rowCount) => {
            cy.wait('@getCart') // wait explicitly for this route to finish
            cy.log(`Number of items in shopping cart: ${rowCount}`)
        })
    }

    removeProductFromCart(index) {
        cy.get('tbody tr').eq(index).then((tableRow) => {
            cy.wrap(tableRow).contains('Delete').click()
        })
    }

    checkTotalPrice() {
        cy.intercept('POST', '/viewcart').as('getCart')
        cy.wait('@getCart')
        let totalSum = 0
        cy.get('tbody tr td:nth-child(3)').each((cell) => {
            const value = parseFloat(cell.text().trim())
            if (!isNaN(value)) {
                totalSum += value
            }
        }).then(() => {
            cy.log(`Total price: ${totalSum}`)
        })

        cy.get('#totalp').then( totalPriceValue => {
            const totalValue = parseFloat(totalPriceValue.text().trim())
            expect(totalSum).to.equal(totalValue)
        })

    }
    
    checkMessageForEmptyCart() {
        // Assert the current message for empty cart is displayed
        cy.get('#tbodyid').should('have.text', '\n            ')
        cy.get('tbody tr').should('not.exist')
    }



}
    
export const onCartPage = new CartPage()