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
}
export const form = new Form();