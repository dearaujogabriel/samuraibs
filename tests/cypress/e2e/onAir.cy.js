describe('Web app deve estar online', () => {
    it('passes', () => {
        cy.visit('/')

        cy.title().should('eq', 'Samurai Barbershop by QAninja')
    })
})