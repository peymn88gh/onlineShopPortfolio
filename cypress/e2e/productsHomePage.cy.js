// cypress/integration/productsHomePage.spec.js

describe('Products Home Page', () => {
    it('should load and display skeleton placeholders', () => {
      cy.visit('http://localhost:3000/products-home'); // Replace with the URL of your application
  
      // Assuming there is a loading spinner or element on the page when data is being fetched
      // Wait for the loading element to disappear
      cy.get('.loading-spinner').should('not.exist');
  
      // Verify that the skeleton placeholders are displayed
      cy.get('.skeleton-card').should('have.length', 5); // Adjust as needed
    });
  
    it('should display actual product data after loading', () => {
      cy.visit('http://localhost:3000/products-home'); // Replace with the URL of your application
  
      // Wait for the actual product cards to be displayed
      cy.get('.product-card').should('have.length.above', 0); // Assuming you have a class for product cards
    });
  });
  