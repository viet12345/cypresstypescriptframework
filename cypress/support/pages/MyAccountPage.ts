import { Form } from '../components/Form';
import { MyAccountPageSelectors as S, MyAccountPageMessages as M, Email as E } from '../constants/pages/myAccountPageConstants';
import { BasePage } from './BasePage';

export const inputFields = {
  'Email': S.emailInput,
  'First Name': S.firstNameInput,
  'Last Name': S.lastNameInput,
  'Phone Number': S.phoneInput,
}

export class MyAccountPage extends BasePage {
  private form: Form;

  constructor() {
    super();
    this.form = new Form();
  }

  // ---------- Element Getters ----------

  // ---------- Actions ----------

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

  verifyFieldInvalidFormat(fieldSelector: string, invalidValue: string, messageSelector: string, message: string): void {
    this.form.clearInputField(fieldSelector);
    if (invalidValue) this.form.fillInputField(fieldSelector, invalidValue);
    this.form.verifyValidationErrorMessage(messageSelector, message);
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }

  verifyEmailWithInvalidFormat(): void {
    this.verifyFieldInvalidFormat(S.emailInput, E.invalidEmail, S.emailMessageValidation, M.invalidEmail);
  }  

  verifyRequiredField(inputField:string,errorSelector:string): void {
    this.form.clearInputField(inputField);
    this.form.fillInputField(inputField, ' ');
    this.form.verifyValidationErrorMessage(errorSelector);
    this.form.verifyHighlightInputFieldInvalid(errorSelector);
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }
}

export const myAccountPage = new MyAccountPage();
