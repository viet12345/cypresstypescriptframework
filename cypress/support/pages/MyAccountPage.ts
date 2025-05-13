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

  fillInputField(inputSelector:string,inputValues:string){
    this.form.fillInputField(inputSelector,inputValues)
  }

  clickSubmitButton(buttonSelector:string){
    this.form.clickSubmitButton(buttonSelector)
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

  verifyEmailWithInvalidFormat(invalidEmail:string): void {
    this.form.verifyInvalidEmailFormat(S.emailInput, invalidEmail, S.emailMessageValidation, M.invalidEmail);
  }

  verifyRequiredField(inputField:string,errorSelector:string): void {
    this.form.clearInputField(inputField);
    this.form.fillInputField(inputField, ' ');
    this.form.verifyValidationErrorMessage(errorSelector);
    this.form.verifyHighlightInputFieldInvalid(errorSelector);
    this.form.verifySubmitButtonDisabled(S.submitButton);
  }

  verifyTrimSpaceAfterUpdate(inputFieldSelector:string, valueWithSpaces:string){
    this.clearInputField(inputFieldSelector)
    //Update với input values chứa space đầu cuối
    this.fillInputField(inputFieldSelector,valueWithSpaces)
    this.clickSubmitButton(S.submitButton)
    //Mở lại detail page (Đa số ở các case update cần có cách redirect về lại page detail của item được update)
    //Ở page demo đang giữ nguyên ở page detail khi update xong.
    cy.reload()
    //Verify updated values không chứa space đầu cuối
    this.form.verifyTrimSpaceInput(inputFieldSelector, valueWithSpaces.trim())
  }
}

export const myAccountPage = new MyAccountPage();
