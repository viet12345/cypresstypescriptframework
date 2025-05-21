import { SignInPageSelectors as S, SignInPageMessages as M } from '../constants/pages/signInPageConstants';
import { BasePage } from './BasePage';
import { Form } from '../components/Form';

export class SignInPage extends BasePage {
  private form: Form;

  constructor() {
    super();
    this.form = new Form();
  }

  // ---------- Element Getters ----------

  usernameInputBox() {
    return cy.get(S.usernameInput);
  }

  passwordInputBox() {
    return cy.get(S.passwordInput);
  }

  signInButton() {
    return cy.get(S.signinButton);
  }

  signUpButton() {
    return cy.get(S.buttonSignUp);
  }

  rememberMeCheckbox() {
    return cy.get(S.checkboxRememberMe);
  }

  signinUserNameErrorMessage() {
    return cy.get(S.signinUserNameErrorMessage);
  }

  signinPasswordErrorMessage() {
    return cy.get(S.signinPasswordErrorMessage);
  }

  signinErrorMessageAPI() {
    return cy.get(S.signinErrorMessageAPI);
  }

  // ---------- Actions ----------

  signinWith(userName: string, password: string) {
    this.clearAllFields();
    if (userName) this.type(S.usernameInput, userName);
    if (password) this.type(S.passwordInput, password);
    if (userName && password) {
      this.click(S.signinButton);
    }
  }

  clearAllFields() {
    this.clear(S.usernameInput);
    this.clear(S.passwordInput);
  }

  // ---------- Verifications ----------

  verifySigninElement() {
    this.passwordInputBox().should('be.visible');
    this.usernameInputBox().should('be.visible');
    this.signInButton().should('be.visible');
    this.signUpButton().should('be.visible');
    this.rememberMeCheckbox().should('be.visible');
  }

  verifyTitleSigninPage(loginTitleContent: string) {
    cy.get(S.signinTitle).should('have.text', loginTitleContent);
  }

  verifySignInBtnDisabled() {
    this.signInButton().should('be.disabled');
  }

  verifySigninUserNameErrorMessage() {
    this.signInButton().should('be.disabled');
    this.signinUserNameErrorMessage().should('be.visible').and('have.text', M.usernameIsRequired);
  }

  verifySigninPasswordErrorMessage() {
    this.signInButton().should('be.disabled');
    this.signinPasswordErrorMessage().should('be.visible').and('have.text', M.userNamePasswordInvalid);
  }

  verifyInvalidCredentialErrorMessage() {
    this.signinErrorMessageAPI().should('be.visible').and('have.text', M.userNamePasswordInvalid);
  }

  verifyPasswordFieldInvalid() {
    this.form.verifyPasswordFieldValidation(S.signinPasswordErrorMessage);
  }

  verifyPasswordInputValuesShouldBeHidden() {
    this.form.verifyPasswordInputValuesShouldBeHidden(S.passwordInput);
  }

  verifyButtonShowPassword() {
    this.form.verifyPasswordInputValuesShouldBeShown(S.showPasswordButton,S.passwordInput);
  }
}

export const signInPage = new SignInPage();
