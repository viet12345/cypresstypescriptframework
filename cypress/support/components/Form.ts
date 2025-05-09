export class Form {
  // ---------- Element Getters ----------

  inputField(inputSelector: string) {
    return cy.get(inputSelector);
  }

  submitButton(submitSelector: string) {
    return cy.get(submitSelector);
  }

  errorMessage(errorSelector: string) {
    return cy.get(errorSelector);
  }

  showPasswordButton(hideOrShowSelector: string) {
    return cy.get(hideOrShowSelector);
  }

  // ---------- Actions ----------

  fillInputField(inputSelector: string, value: string | number) {
    this.inputField(inputSelector).type(value.toString());
  }

  clearInputField(inputSelector: string) {
    this.inputField(inputSelector).clear();
  }

  clickSubmitButton(submitSelector: string) {
    this.submitButton(submitSelector).click();
  }

  doubleClickSubmitButton(submitSelector: string) {
    this.submitButton(submitSelector).dblclick();
  }

  clickShowPasswordButton(showPasswordSelector: string) {
    this.showPasswordButton(showPasswordSelector).click();
  }

  // ---------- Verifications ----------

  //Input field can type value and the value must be visible in the input field
  verifyInputFieldCanType(inputSelector: string, value: string | number) {
    this.inputField(inputSelector).should('be.visible').type(value.toString()).should('have.value', value.toString());
  }
  
  //Title of input field must be visible
  verifyTitleField(titleSelector: string, titleName: string) {
    this.inputField(titleSelector).should('have.text', titleName);
  }

  //Placeholder must be visible when the input is empty
  verifyPlaceHolder(inputSelector: string, placeHoderText: string) {
    this.inputField(inputSelector).should('have.attr', 'placeholder', placeHoderText);
  }

  //The error message must be visible when the input is invalid
  verifyValidationErrorMessage(errorSelector: string, errorMessage?: string) {
    const assertion = this.errorMessage(errorSelector).should('be.visible');
    if (errorMessage) {
      assertion.and('have.text', errorMessage);
    }
  }

  //Input field must be red when the input is invalid
  verifyHighlightInputFieldInvalid(inputSelector: string) {
    this.inputField(inputSelector).should('have.css', 'color', 'rgb(211, 47, 47)');
  }

  //Submit button must be disabled when the form is invalid
  verifySubmitButtonDisabled(submitSelector: string) {
    this.submitButton(submitSelector).should('be.disabled');
  }

  //Password must be hiddeden when typing
  verifyPasswordInputValuesShouldBeHidden(inputSelector: string) {
    this.inputField(inputSelector).should('have.attr', 'type', 'password');
  }

  //Password must be at least 8 characters, including letters, numbers and special characters.
  verifyPasswordFieldValidation(errorSelector: string) {
    this.errorMessage(errorSelector).should('be.visible').and('have.text', 'Password must be at least 8 characters, including letters, numbers and special characters.');
  }

  //Password must be shown when clicking the eye icon
  verifyPasswordInputValuesShouldBeShown(showPasswordSelector:string, inputSelector: string) {
    this.fillInputField(inputSelector, '12345678');
    this.clickShowPasswordButton(showPasswordSelector);
    this.inputField(inputSelector).should('have.attr', 'type', 'text');
  }
}
export const form = new Form();