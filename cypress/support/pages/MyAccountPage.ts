import { Form } from '../components/Form';
import { MyAccountPageSelectors as S, MyAccountPageMessages as M, Email as E } from '../constants/pages/myAccountPageConstants';
import { BasePage } from './BasePage';


export class MyAccountPage extends BasePage {
  private form: Form;

  constructor() {
    super();
    this.form = new Form();
  }

  // ---------- Element Getters ----------


  // ---------- Actions ----------


  // ---------- Verifications ----------

  verifyFieldInvalidFormat(fieldSelector: string, invalidValue: string, messageSelector: string, message: string): void {
    this.form.clearInputField(fieldSelector);
    if (invalidValue) this.form.fillInputField(fieldSelector, invalidValue);
    this.form.verifyValidationErrorMessage(messageSelector, message);
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }

  verifyEmailWithInvalidFormat(): void {
    this.verifyFieldInvalidFormat(S.emailInput, E.invalidEmail, S.emailMessageValidation, M.invalidEmail);
  }

  verifyRequiredEmail(): void {
    this.verifyFieldInvalidFormat(S.emailInput, '', S.emailMessageValidation, M.noEmail);
  }

  verifyRequiredFirstName(): void {
    this.verifyFieldInvalidFormat(S.firstNameInput, '', S.firstNameErrorMessage, M.noFirstName);
  }

  verifyRequiredLastName(): void {
    this.verifyFieldInvalidFormat(S.lastNameInput, '', S.lastNameErrorMessage, M.noLastName);
  }

  verifyRequiredPhoneNumber(): void {
    this.verifyFieldInvalidFormat(S.phoneInput, '', S.phoneErrorMessage, M.noPhoneNumber);
  }
}

export const myAccountPage = new MyAccountPage();
