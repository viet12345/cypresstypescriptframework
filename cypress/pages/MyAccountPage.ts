"[data-test='sidenav-user-settings']"
"[data-test='user-settings-email-input']"
'#user-settings-email-input-helper-text'

export class MyAccountPage {

  // ---------- Element Getters ----------


  // ---------- Actions ----------

  openUrl(url: string) {
    cy.visit(url);
  }

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

export const myAccountPage = new MyAccountPage();
