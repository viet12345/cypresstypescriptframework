const LoginPageSelectors = {
  usernameInput: "#username",
  passwordInput: "#password",
  loginButton: "[data-test='signin-submit']",
  loginTitle: "h1",
  buttonSignUp: "[data-test='signup']",
  checkboxRememberMe: "[data-test='signin-remember-me']",
  loginUserNameErrorMessage: "[id='username-helper-text']",
  loginPasswordErrorMessage: "[id='password-helper-text']",
  loginErrorMessageAPI: "[data-test='signin-error']",
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

  signUpButton() {
    return cy.get(LoginPageSelectors.buttonSignUp);
  }

  rememberMeCheckbox() {
    return cy.get(LoginPageSelectors.checkboxRememberMe);
  }

  loginUserNameErrorMessage() {
    return cy.get(LoginPageSelectors.loginUserNameErrorMessage);
  }

  loginPasswordErrorMessage() {
    return cy.get(LoginPageSelectors.loginPasswordErrorMessage);
  }
  
  loginErrorMessageAPI() {
    return cy.get(LoginPageSelectors.loginErrorMessageAPI);
  }
}

export const signInPage = new SignInPage();
