export class Form {
  // ---------- Element Getters ----------

  inputField(inputSelector: string) {
    return cy.get(inputSelector);
  }

  submitButton(submitSelector: string) {
    return cy.get(submitSelector).should('be.visible').should('not.be.disabled');
  }

    errorMessage(errorSelector: string) {
      return cy.get(errorSelector);
    }

  // ---------- Actions ----------

  fillInputField(inputSelector: string, value: string | number) {
    this.inputField(inputSelector).type(value.toString());
  }

  clickSubmitButton(submitSelector: string) {
    this.submitButton(submitSelector).click();
  }

  // ---------- Verifications ----------

  verifyFormSubmissionSuccess(successMessage: string) {
    cy.contains(successMessage).should('be.visible');
  }

  verifyValidationError(errorSelector: string, errorMessage: string) {
    this.errorMessage(errorSelector).should('be.visible').and('contain', errorMessage);
  }

verifyInputFieldLength(errorSelector: string, errorMessage: string = 'This field can not exceed 255 characters') {
    this.errorMessage(errorSelector).should('be.visible').and('contain', errorMessage);
}
}
export const form = new Form();