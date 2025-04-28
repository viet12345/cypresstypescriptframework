

export class HomePage {

  // ---------- Element Getters ----------


  // ---------- Actions ----------

  // ---------- Verifications ----------

  verifyLoginSucessfulWithUser(user: string) {
    cy.contains(user).should('be.visible');
  }

  verifyAvailableUrl(url: string) {
    cy.url().should('include', url);
  }
}

export const homePage = new HomePage();
