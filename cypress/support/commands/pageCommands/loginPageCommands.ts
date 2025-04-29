


  Cypress.Commands.add('loginViaUI', (user?: string, password?: string) => {
    cy.visit('/signin')
    if (user && password) {
      cy.get('#username').type(user)
      cy.get('#password').type(password)
    } else if (user) {
      cy.get('#username').type(user)
    } else if (password){
      cy.get('password').type(password)
    }
    cy.get('button[type="submit"]').click()
  })