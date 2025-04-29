import { Form } from '../components/Form';

const myAccountSideBarMenu = "[data-test='sidenav-user-settings']";
const emailInput = "[data-test='user-settings-email-input']";
const emailMessageValidation = '#user-settings-email-input-helper-text';
const submitButton = "[data-test='user-settings-submit']";
const firstNameInput = "[data-test='user-settings-firstName-input']";
const lastNameInput = "[data-test='user-settings-lastName-input']";
const phoneInput = "[data-test='user-settings-phoneNumber-input']";
const firstNameErrorMessage = "#user-settings-firstName-input-helper-text";
const lastNameErrorMessage = "#user-settings-lastName-input-helper-text";
const phoneErrorMessage = "#user-settings-phone-input-helper-text";


export const inputFields = {
  'Email': emailInput,
  'First name': firstNameInput,
  'Last name': lastNameInput,
  'Phone number': phoneInput,
}

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
    this.form.clearInputField(emailInput);
    this.form.fillInputField(emailInput, 'email@invalid');
    this.form.verifyValidationErrorMessage(emailMessageValidation, 'Must contain a valid email address');
    this.form.verifySubmitButtonDisabled(submitButton);
  }

  verifyRequiredField(inputField:string,errorSelector:string): void {
    this.form.clearInputField(inputField);
    this.form.fillInputField(inputField, ' ');
    this.form.verifyValidationErrorMessage(errorSelector);
    this.form.verifySubmitButtonDisabled(submitButton);
  }
}

export const myAccountPage = new MyAccountPage();
