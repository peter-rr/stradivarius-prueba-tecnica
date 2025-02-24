
export class NavigationPage {

    homePage() {
        cy.get('.nav-item').contains('Home ').click()
    }

    cartPage() {
        cy.get('.nav-item').contains('Cart').click()
    }

}

export const navigateTo = new NavigationPage()