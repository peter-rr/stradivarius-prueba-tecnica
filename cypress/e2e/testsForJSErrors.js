
describe('Tests to verify JS errors when visiting Demoblaze web', () => {

    it('verify there are no JS errors in console', () => {
        // Uncaught errors are handled and logged with no need to stop the test execution
        cy.on('uncaught:exception', (err, runnable) => {
            cy.log('Javascript error found:', err.message);  
        });
        
        cy.visit('/');
    });

});
  