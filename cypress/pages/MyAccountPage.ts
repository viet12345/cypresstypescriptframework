import { Form } from '../components/Form';

const myAccountSideBarMenu = "[data-test='sidenav-user-settings']";
const emailInput = "[data-test='user-settings-email-input']";
const emailMessageValidation = '#user-settings-email-input-helper-text';
const submitButton = "[data-test='user-settings-submit']";
const firstNameInput = "[data-test='user-settings-firstName-input']";
const lastNameInput = "[data-test='user-settings-lastName-input']";
const phoneInput = "[data-test='user-settings-phoneNumber-input']";


export const inputFields = {
  'Email': emailInput,
  'First Name': firstNameInput,
  'Last Name': lastNameInput,
  'Phone Number': phoneInput,
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

  clearInputField(inputSelector: string): void {
    this.form.clearInputField(inputSelector);
  }

  // ---------- Verifications ----------
  verifyInputFieldCanType(inputSelector: string, value: string | number): void {
    this.form.verifyInputFieldCanType(inputSelector, value);
  }
  
  verifyTitleField(titleSelector: string, titleName: string): void {
    this.form.verifyTitleField(titleSelector, titleName);
  }

  verifyPlaceHolder(inputSelector: string, placeHoderText: string): void {
    this.form.verifyPlaceHolder(inputSelector, placeHoderText);
  }
  
  verifyEmailWithInvalidFormat(): void {
    this.form.clearInputField(emailInput);
    this.form.fillInputField(emailInput, 'email@invalid');
    this.form.verifyValidationErrorMessage(emailMessageValidation, 'Must contain a valid email address');
    this.form.verifyHighlightInputFieldInvalid(emailMessageValidation);
    this.form.verifySubmitButtonDisabled(submitButton);
  }

  verifyRequiredField(inputField:string,errorSelector:string): void {
    this.form.clearInputField(inputField);
    this.form.fillInputField(inputField, ' ');
    this.form.verifyValidationErrorMessage(errorSelector);
    this.form.verifyHighlightInputFieldInvalid(errorSelector);
    this.form.verifySubmitButtonDisabled(submitButton);
  }
}

export const myAccountPage = new MyAccountPage();
