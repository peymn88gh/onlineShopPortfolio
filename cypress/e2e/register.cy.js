const baseUrl = Cypress.env('baseUrl')
describe('Registration Section', () => {
    // Generate a random email address
    const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
    
    // Generate a random password
    const randomPassword = `password${Math.floor(Math.random() * 100000)}`;
    
    it('should successfully register, verify email, and navigate to login', () => {
      // Visit the registration page
      cy.visit(`${baseUrl}/auth/register`);
    
      // Fill out the registration form with random values
      cy.get('[name="eMail"]').type(randomEmail);
      cy.get('[name="firstName"]').type('John');
      cy.get('[name="lastName"]').type('Doe');
      cy.get('[name="password"]').type(randomPassword);
      cy.get('[name="confirmPassword"]').type(randomPassword);
    
      // Click the submit button
      cy.get('.justify-between > .mt-2 > .flex').click({timeout:20000});
    
      // Wait for loading to finish
      cy.get('.mr-2 > .svg-inline--fa').should('not.exist'); // Check for FontAwesome icon
    
      // Check if the "Verify Your Email" button is visible
      cy.get('.bg-emerald-600').should('exist');
    
      // Click the "Verify Your Email" button
      cy.get('.bg-emerald-600').click({timeout:20000});
    
      // Wait for navigation to the login page
      cy.url().should('eq', `${baseUrl}/auth/login`);
    });
  });
  