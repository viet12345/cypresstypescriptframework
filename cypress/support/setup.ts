// Global setup & teardown hooks for Cypress tests

// Runs once before all tests in suite
before(() => {
    cy.log('Starting test suite');
  });
  
  // Runs once after all tests
  after(() => {
    cy.log('Test suite finished');
  });
  
  // Runs before each test
  beforeEach(() => {
    cy.clearSession();
  });
  
  // Runs after each test
  afterEach(() => {
    cy.clearSession();
  });