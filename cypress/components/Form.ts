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

  verifyValidationErrorMessage(errorSelector: string, errorMessage?: string) {
    const assertion = this.errorMessage(errorSelector).should('be.visible');
    if (errorMessage) {
      assertion.and('contain', errorMessage);
    }
  }

  verifySubmitButtonDisabled(submitSelector: string) {
    this.submitButton(submitSelector).should('be.disabled');
  }
}
export const form = new Form();