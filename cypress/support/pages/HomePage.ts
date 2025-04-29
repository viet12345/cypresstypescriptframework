import { HomPageSelectors as S } from "../selectors/homePageSelectors";

export class HomePage {
  
tabNames = {
  contactsTab: S.contactsTab,
  personalTab: S.personalTab,
}

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
