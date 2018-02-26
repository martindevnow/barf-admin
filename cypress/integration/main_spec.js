describe('Landing Page', function () {
    it('.should() - assert that <title> is correct', function () {
        cy.visit('http://localhost:8080');
        cy.title().should('include', 'BARFBento');
    });

    it('.should() - asset the user is not logged in', function () {
        cy.get('#navigationAccordion');
    });
});
