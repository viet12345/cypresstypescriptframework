import { Form } from '../components/Form';
import { MyAccountPageSelectors as S } from '../constants/selectors/myAccountPageSelectors';
import { MyAccountPageMessages as M } from '../constants/messages/myAccountPageMessages';
import { BasePage } from './BasePage';


export class MyAccountPage extends BasePage{
  private form: Form;

  constructor() {
    super();
    this.form = new Form();
  }

  // ---------- Element Getters ----------

  inputFields = {
    'Email': [S.emailInput, S.emailMessageValidation, M.noEmail],
    'First name': [S.firstNameInput, S.firstNameErrorMessage, M.noFirstName],
    'Last name': [S.lastNameInput, S.lastNameErrorMessage, M.noLastName],
    'Phone number': [S.phoneInput, S.phoneErrorMessage, M.noPhoneNumber],
  }

  // ---------- Actions ----------

  goToMyAccountSideBarMenu() {
    return this.click(S.myAccountSideBarMenu);
  }

  // ---------- Verifications ----------

  verifyFieldInvalidFormat(fieldSelector: string, invalidValue: string, messageSelector: string, message: string): void {
    this.form.clearInputField(fieldSelector);
    if (invalidValue) this.form.fillInputField(fieldSelector, invalidValue);
    this.form.verifyValidationErrorMessage(messageSelector, message);
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }

  verifyEmailWithInvalidFormat(): void {
    this.verifyFieldInvalidFormat(S.emailInput, 'email@invalid', S.emailMessageValidation, M.invalidEmail);
  }

  verifyRequiredField(inputFieldSelector: string, errorSelector: string, message: string): void {
    this,this.verifyFieldInvalidFormat(inputFieldSelector, '', errorSelector, message);
  }
}

export const myAccountPage = new MyAccountPage();
