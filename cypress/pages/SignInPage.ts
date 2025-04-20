export class SignInPage {
  usernameInputBox() {
    return cy.get("#username");
  }

  passwordInputBox() {
    return cy.get("#password");
  }
}

export const signInPage = new SignInPage();
