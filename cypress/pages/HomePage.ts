const contactsTab = "[data-test='nav-contacts-tab']";
const personalTab = "[data-test='nav-personal-tab']";

export const tabNames = {
  contactsTab: contactsTab,
  personalTab: personalTab,
}

export class HomePage {

  // ---------- Element Getters ----------


  // ---------- Actions ----------

  switchTab(tabName: string) {
    return cy.get(tabName).click();
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
