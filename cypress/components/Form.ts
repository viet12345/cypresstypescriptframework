export class Form {
  // ---------- Element Getters ----------

  form(formSelector: string) {
    return cy.get(formSelector);
  }

  inputField(formSelector:string ,inputSelector: string) {
    return this.form(formSelector).find(inputSelector);
  }

  numberInputField(formSelector:string ,inputSelector: string) {
    return this.form(formSelector).find(inputSelector).should('have.attr', 'type', 'number');
  }

  submitButton(submitSelector: string) {
    return this.form(submitSelector).find('button[type="submit"]');
  }

    errorMessage(errorSelector: string) {
            return cy.get(errorSelector);
    }

  // ---------- Actions ----------

fillInputField(formSelector: string, inputSelector: string, value: string | number) {
    this.inputField(formSelector, inputSelector).type(value.toString());
}

  clickSubmitButton(submitSelector: string) {
    this.submitButton(submitSelector).click();
  }

  // ---------- Verifications ----------

  verifyFormSubmissionSuccess(successMessage: string) {
    cy.contains(successMessage).should('be.visible');
  }

verifyInputFieldLength(errorSelector: string, errorMessage: string = 'This field can not exceed 255 characters') {
    this.errorMessage(errorSelector).should('be.visible').and('contain', errorMessage);
}
}