import { SignInPageSelectors as S } from '../selectors/signInPageSelectors';

export class SignInPage {

  // ---------- Element Getters ----------

  usernameInputBox() {
    return cy.get(S.usernameInput);
  }

  passwordInputBox() {
    return cy.get(S.passwordInput);
  }

  signInButton() {
    return cy.get(S.loginButton);
  }

  signUpButton() {
    return cy.get(S.buttonSignUp);
  }

  rememberMeCheckbox() {
    return cy.get(S.checkboxRememberMe);
  }

  loginUserNameErrorMessage() {
    return cy.get(S.loginUserNameErrorMessage);
  }

  loginPasswordErrorMessage() {
    return cy.get(S.loginPasswordErrorMessage);
  }

  loginErrorMessageAPI() {
    return cy.get(S.loginErrorMessageAPI);
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

  clearAllFields() {
    this.usernameInputBox().clear();
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
    cy.get(S.loginTitle).should('have.text', loginTitleContent);
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
