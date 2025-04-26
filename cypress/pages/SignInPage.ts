
const usernameInput = "#username";
const passwordInput = "#password";
const loginButton = "[data-test='signin-submit']";
const loginTitle = "h1";
const buttonSignUp = "[data-test='signup']";
const checkboxRememberMe = "[data-test='signin-remember-me']";
const loginUserNameErrorMessage = "[id='username-helper-text']";
const loginPasswordErrorMessage = "[id='password-helper-text']";
const loginErrorMessageAPI = "[data-test='signin-error']";

export class SignInPage {

  // ---------- Element Getters ----------

  usernameInputBox() {
    return cy.get(usernameInput);
  }

  passwordInputBox() {
    return cy.get(passwordInput);
  }

  signInButton() {
    return cy.get(loginButton);
  }

  signUpButton() {
    return cy.get(buttonSignUp);
  }

  rememberMeCheckbox() {
    return cy.get(checkboxRememberMe);
  }

  loginUserNameErrorMessage() {
    return cy.get(loginUserNameErrorMessage);
  }

  loginPasswordErrorMessage() {
    return cy.get(loginPasswordErrorMessage);
  }

  loginErrorMessageAPI() {
    return cy.get(loginErrorMessageAPI);
  }

  // ---------- Actions ----------

  loginWith(userName: string, password: string) {
    this.usernameInputBox().clear();
    if (userName) this.usernameInputBox().type(userName);
    this.passwordInputBox().clear();
    if (password) this.passwordInputBox().type(password);
    if (userName && password) {
      this.signInButton().click();
    }
  }

  clearAllField() {
    this.usernameInputBox().clear(); // không chắc hàm này để clear, check lại sau
    this.passwordInputBox().clear();
  }



  // ---------- Verifications ----------

  verifyLoginElement() {
    this.passwordInputBox().should('be.visible');
    this.usernameInputBox().should('be.visible');
    this.signInButton().should('be.visible');
    this.signUpButton().should('be.visible');
    this.rememberMeCheckbox().should('be.visible');
  }

  verifyTitleLoginPage(loginTitleContent: string) {
    cy.get(loginTitle).should('have.text', loginTitleContent);
  }

  verifySignInBtnDisabled() {
    this.signInButton().should('be.disabled');
  }

  verifyLoginUserNameErrorMessage(MessageWarning: string) {
    this.signInButton().should('be.disabled');
    this.loginUserNameErrorMessage().should('be.visible').and('have.text', MessageWarning);
  }

  verifyLoginPasswordErrorMessage(MessageWarning: string) {
    this.signInButton().should('be.disabled');
    this.loginPasswordErrorMessage().should('be.visible').and('have.text', MessageWarning);
  }

  verifyInvalidCredentialErrorMessage(MessageWarning: string) {
    this.loginErrorMessageAPI().should('be.visible').and('have.text', MessageWarning);
  }
}

export const signInPage = new SignInPage();
