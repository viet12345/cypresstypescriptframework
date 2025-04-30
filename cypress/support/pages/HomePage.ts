import { HomPageSelectors as S } from "../constants/selectors/homePageSelectors";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
  
tabNames = {
  contactsTab: S.contactsTab,
  personalTab: S.personalTab,
}

  // ---------- Element Getters ----------


  // ---------- Actions ----------

  switchTab(tabName: string) {
    return this.click(tabName);
  }

  // ---------- Verifications ----------

  verifyLoginSucessfulWithUser(user: string) {
    cy.contains(user).should('be.visible');
  }
}

export const homePage = new HomePage();
