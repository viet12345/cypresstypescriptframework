


Cypress.Commands.add('createBankAccount', (bankName?: string, routingNumber?: string, accountNumber?: string) => {
    cy.visit('/bankaccounts');
    cy.get(`[data-test="bankaccount-new"]`).click();
    if (bankName && routingNumber && accountNumber) {
      cy.get('#bankaccount-bankName-input').type(bankName);
      cy.get('#bankaccount-routingNumber-input').type(routingNumber);
      cy.get('#bankaccount-accountNumber-input').type(accountNumber);
    } else if (bankName) {
      cy.get('#bankaccount-bankName-input').type(bankName);
    } else if (routingNumber){
      cy.get('bankaccount-routingNumber-input').type(routingNumber);
    } else if (accountNumber){
        cy.get('bankaccount-accountNumber-input').type(accountNumber);
      }
    cy.get('button[type="submit"]').click();
  })