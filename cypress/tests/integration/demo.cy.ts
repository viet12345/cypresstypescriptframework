describe('my first demo', () => {
    it('navigate', () => {
        cy.visit('https://www.google.co.uk/');
        cy.get('.lnXdpd').should('be.visible');
    })
})