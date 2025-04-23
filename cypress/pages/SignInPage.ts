const LoginPageSelectors = {
  usernameInput: "#username",
  passwordInput: "#password",
  loginButton: "[data-test='signin-submit']",
  loginTitle: ".MuiTypography-h5"
};

export class SignInPage {
  usernameInputBox() {
    return cy.get(LoginPageSelectors.usernameInput);
  }

  passwordInputBox() {
    return cy.get(LoginPageSelectors.passwordInput);
  }

  loginButton() {
    return cy.get(LoginPageSelectors.loginButton);
  }

  verifyTitleLoginPage(titleLoginPage:string) {
    return cy.get(LoginPageSelectors.loginTitle).should('have.text', titleLoginPage);
  }
  
}

export const signInPage = new SignInPage();
