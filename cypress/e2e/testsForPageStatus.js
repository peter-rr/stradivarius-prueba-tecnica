
describe('Validate page status code for all links at Demoblaze', () => {
    
    it('Verify all pages return status code 200 or 30x, and not 40x', () => {
        cy.visit('/') 
        cy.get('a[href]').each(($link) => {
            const url = $link.prop('href')
            
            if (url && url.startsWith('http')) {
                cy.request({
                    url: url,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.oneOf([200, 301, 302])
                
                    if (response.status >= 403 && response.status < 500) {
                        cy.log(`Warning: The link ${url} returned a code ${response.status}`);
                    }
                })
            }
        })
    })
})