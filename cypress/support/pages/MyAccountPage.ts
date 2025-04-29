import { Form } from '../components/Form';
import { MyAccountPageSelectors as S } from '../selectors/myAccountPageSelectors';


export class MyAccountPage {
  private form: Form;

  constructor() {
    this.form = new Form();
  }

  // ---------- Element Getters ----------

  inputFields = {
    'Email': S.emailInput,
    'First name': S.firstNameInput,
    'Last name': S.lastNameInput,
    'Phone number': S.phoneInput,
  }

  // ---------- Actions ----------
  goToMyAccountSideBarMenu() {
    return cy.get(S.myAccountSideBarMenu).click();
  }

  // ---------- Verifications ----------
  verifyEmailWithInvalidFormat(): void {
    this.form.clearInputField(S.emailInput);
    this.form.fillInputField(S.emailInput, 'email@invalid');
    this.form.verifyValidationErrorMessage(S.emailMessageValidation, 'Must contain a valid email address');
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }

  verifyRequiredField(inputField: string, errorSelector: string): void {
    this.form.clearInputField(inputField);
    this.form.fillInputField(inputField, ' ');
    this.form.verifyValidationErrorMessage(errorSelector);
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }
}

export const myAccountPage = new MyAccountPage();
