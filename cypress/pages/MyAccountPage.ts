const myAccountSideBarMenu = "[data-test='sidenav-user-settings']";
const emailInput = "[data-test='user-settings-email-input']";
const emailMessageValidation = '#user-settings-email-input-helper-text';

export class MyAccountPage {

  // ---------- Element Getters ----------

  myAccountSideBarMenu() {
    return cy.get(myAccountSideBarMenu);
  }

  emailInput() {
    return cy.get(emailInput);
  }

  emailMessageValidation() {
    return cy.get(emailMessageValidation);
  }

  // ---------- Actions ----------


  // ---------- Verifications ----------

}

export const myAccountPage = new MyAccountPage();
