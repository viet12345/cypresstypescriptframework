import { Form } from '../components/Form';

const myAccountSideBarMenu = "[data-test='sidenav-user-settings']";
const emailInput = "[data-test='user-settings-email-input']";
const emailMessageValidation = '#user-settings-email-input-helper-text';
const submitButton = "[data-test='user-settings-submit']";

export class MyAccountPage {
  private form: Form;

  constructor() {
    this.form = new Form();
  }

  // ---------- Element Getters ----------

  // ---------- Actions ----------
  goToMyAccountSideBarMenu() {
    return cy.get(myAccountSideBarMenu).click();
  }

  // ---------- Verifications ----------
  verifyEmailWithInvalidFormat(): void {
    this.form.fillInputField(emailInput, 'email@invalid');
    this.form.verifyValidationErrorMessage(emailMessageValidation, 'Must contain a valid email address');
    this.form.verifySubmitButtonDisabled(submitButton);
  }
}

export const myAccountPage = new MyAccountPage();
