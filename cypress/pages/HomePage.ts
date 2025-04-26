const contactsTab = "[data-test='nav-contacts-tab']";
const personalTab = "[data-test='nav-personal-tab']";

export class HomePage {

  // ---------- Element Getters ----------


  // ---------- Actions ----------

  openUrl(url: string) {
    cy.visit(url);
  }

  // ---------- Verifications ----------

  verifyLoginSucessfulWithUser(user: string) {
    cy.contains(user).should('be.visible');
  }

  verifyAvailableUrl(url: string) {
    cy.url().should('include', url);
  }
}

export const homePage = new HomePage();
