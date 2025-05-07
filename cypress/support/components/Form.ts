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

  // ---------- Verifications ----------
  verifyInputFieldCanType(inputSelector: string, value: string | number) {
    this.inputField(inputSelector).should('be.visible').type(value.toString()).should('have.value', value.toString());
  }
  
  verifyTitleField(titleSelector: string, titleName: string) {
    this.inputField(titleSelector).should('contain', titleName);
  }

  verifyPlaceHolder(inputSelector: string, placeHoderText: string) {
    this.inputField(inputSelector).should('have.attr', 'placeholder', placeHoderText);
  }

  verifyValidationErrorMessage(errorSelector: string, errorMessage?: string) {
    const assertion = this.errorMessage(errorSelector).should('be.visible');
    if (errorMessage) {
      assertion.and('contain', errorMessage);
    }
  }

  verifyHighlightInputFieldInvalid(inputSelector: string) {
    this.inputField(inputSelector).should('have.css', 'color', 'rgb(211, 47, 47)');
  }

  verifySubmitButtonDisabled(submitSelector: string) {
    this.submitButton(submitSelector).should('be.disabled');
  }

  verifyPasswordInputValuesShouldBeHidden(inputSelector: string) {
    this.inputField(inputSelector).should('have.attr', 'type', 'password');
  }

  //Password must be at least 8 characters, including letters, numbers and special characters.
  verifyPasswordFieldValidation(inputSelector: string, errorSelector: string) {
    this.inputField(inputSelector)
      .invoke('val')
      .then((value) => {
        const password = value?.toString() || '';
        const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/.test(password);
        if (!isValid) {
          this.errorMessage(errorSelector).should('be.visible').and('contain', 'Password must be at least 8 characters, including letters, numbers and special characters.');
        }
      });
  }
}
export const form = new Form();