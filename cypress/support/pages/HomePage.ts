import { HomPageSelectors as S } from "../constants/pages/homePageConstants";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

  tabNames = {
    contacts: S.contactsTab,
    personal: S.personalTab,
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
