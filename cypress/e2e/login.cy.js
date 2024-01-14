const baseUrl = Cypress.env('baseUrl')
describe('Login Tests', () => {
  it('should visit the login page', () => {
    // Visit the login page

    cy.visit(`${baseUrl}/auth/login`);

    // Add assertions for the login page as needed
    cy.url().should('include', '/auth/login'); // Ensure you are on the login page
    cy.get('h1').should('contain', 'Login'); // Example assertion for checking the page content
  });

  it('should perform login', () => {
    // Visit the login page
    cy.visit(`${baseUrl}/auth/login`); // Assuming baseUrl is already set in your config

    // Enter email
    const username = Cypress.env('username')
    cy.get('#email').type(username);

    // Enter password
    const password = Cypress.env('password')
    cy.get('#Password').type(password);

    // Click the LOGIN button
    cy.get('#login-button').click({timeout:20000});


    // Wait for the login process to complete and expect to be on the expected page
    cy.url().should('eq', `${baseUrl}/`)
  });
});
