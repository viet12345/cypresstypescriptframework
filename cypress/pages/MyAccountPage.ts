import { Form } from '../components/Form'

const myAccountSideBarMenu = "[data-test='sidenav-user-settings']";
const emailInput = "[data-test='user-settings-email-input']";
const emailMessageValidation = '#user-settings-email-input-helper-text';
const submitButton = "[data-test='user-settings-submit']";

export class MyAccountPage extends Form {

  // ---------- Element Getters ----------

  // ---------- Actions ----------
  goToMyAccountSideBarMenu() {
    return cy.get(myAccountSideBarMenu).click();
  }

  // ---------- Verifications ----------
  verifyEmailWithInvalidFormat():void {
    this.fillInputField(emailInput,'email@invalid');
    this.verifyValidationErrorMessage(emailMessageValidation, 'Must contain a valid email address');
    this.verifySubmitButtonDisabled(submitButton);
  }
}

export const myAccountPage = new MyAccountPage();
