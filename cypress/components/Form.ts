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

    successMessage(messageSelector: string) {
      return cy.get(messageSelector);
    }
  // ---------- Actions ----------

  fillInputField(inputSelector: string, value: string | number) {
    this.inputField(inputSelector).type(value.toString());
  }

  clickSubmitButton(submitSelector: string) {
    this.submitButton(submitSelector).click();
  }

  // ---------- Verifications ----------

  verifyFormSubmissionSuccess(messageSelector: string, successMessage: string) {
    this.successMessage(messageSelector).should('be.visible').and('contain', 'Successfully');
  }

  verifyValidationError(errorSelector: string, errorMessage: string) {
    this.errorMessage(errorSelector).should('be.visible').and('contain', errorMessage);
  }
}
export const form = new Form();