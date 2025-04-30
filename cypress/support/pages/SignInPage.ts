import { SignInPageSelectors as S, SignInPageMessages as M } from '../constants/signInPageConstants';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {

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
    this.clearAllFields();
    if (userName) this.type(S.usernameInput, userName);
    if (password) this.type(S.passwordInput, password);
    if (userName && password) {
      this.click(S.loginButton);
    }
  }

  clearAllFields() {
    this.clear(S.usernameInput);
    this.clear(S.passwordInput);
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

  verifyLoginUserNameErrorMessage() {
    this.signInButton().should('be.disabled');
    this.loginUserNameErrorMessage().should('be.visible').and('have.text', M.usernameIsRequired);
  }

  verifyLoginPasswordErrorMessage() {
    this.signInButton().should('be.disabled');
    this.loginPasswordErrorMessage().should('be.visible').and('have.text', M.userNamePasswordInvalid);
  }

  verifyInvalidCredentialErrorMessage() {
    this.loginErrorMessageAPI().should('be.visible').and('have.text', M.userNamePasswordInvalid);
  }
}

export const signInPage = new SignInPage();
