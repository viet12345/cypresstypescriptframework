export class CommonPage {
  usernameInputBox() {
    return cy.get("#username");
  }

  passwordInputBox() {
    return cy.get("#password");
  }
}

export const commonPage = new CommonPage();
