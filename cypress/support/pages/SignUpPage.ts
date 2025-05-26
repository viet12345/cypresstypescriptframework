import { SignUpPageSelectors as S, SignUpPageMessages as M } from '../constants/pages/signUpPageConstants';
import { BasePage } from './BasePage';
import { Form } from '../components/Form';

export const signupElement = {
  'First name input': S.firstNameInput,
  'Last name input': S.lastNameInput,
  'User name input': S.userNameInput,
  'Password input': S.passwordInput,
  'Confirm password input': S.confirmPasswordInput,
  'Sign up button': S.signupButton,
  'Sign in text link': S.signInTextLink,
}

export const signupfields = ['First name', 'Last name', 'User name', 'Password', 'Confirm password']

export class SignUpPage extends BasePage {
  private form: Form;

  constructor() {
    super();
    this.form = new Form();
  }

  // ---------- Element Getters ----------

  firstNameInputBox() {
    return cy.get(S.firstNameInput);
  }

  lastNameInputBox() {
    return cy.get(S.lastNameInput);
  }
  usernameInputBox() {
    return cy.get(S.userNameInput);
  }

  passwordInputBox() {
    return cy.get(S.passwordInput);
  }

  confirmPasswordInputBox() {
    return cy.get(S.confirmPasswordInput);
  }

  signUpButton() {
    return cy.get(S.signupButton);
  }

  signInTextLink() {
    return cy.get(S.signInTextLink);
  }

  errMessOnField(fieldName: keyof typeof signupElement) {
    return cy.get(signupElement[fieldName]).parent().next();
  }

  signupFirstNameErrorMessage() {
    return cy.get(S.firstNameErrorMessage);
  }

  signuplastNameErrorMessage() {
    return cy.get(S.lastNameErrorMessage);
  }

  signupUserNameErrorMessage() {
    return cy.get(S.userNameErrorMessage);
  }

  signupPasswordErrorMessage() {
    return cy.get(S.passwordErrorMessage);
  }

  signupConfirmPasswordErrorMessage() {
    return cy.get(S.confirmPasswordErrorMessage);
  }

  signupErrorMessageAPI() {
    return cy.get(S.signupErrorMessageAPI);
  }

  // ---------- Actions ----------

  fillAllSignupField(firstName: string, lastName: string, userName: string, password: string, confirmPassword: string) {
    if (firstName) this.type(S.firstNameInput, firstName);
    if (lastName) this.type(S.lastNameInput, lastName);
    if (userName) this.type(S.userNameInput, userName);
    if (password) this.type(S.passwordInput, password);
    if (confirmPassword) this.type(S.confirmPasswordInput, confirmPassword);
    return firstName && lastName && userName && password && confirmPassword;
  }

  signUpWith(firstName: string, lastName: string, userName: string, password: string, confirmPassword: string) {
    if (this.fillAllSignupField(firstName, lastName, userName, password, confirmPassword)) {
      this.click(S.signupButton);
    }
  }

  clearAllFields() {
    super.clearAllFields(S);
  }

  // ---------- Verifications ----------

  verifySignUpElementVisible(selector: string) {
    return cy.get(selector).should('be.visible');
  }

  verifyTitleSignUpPage(signUpTitleContent: string) {
    cy.get(S.signupTitle).should('have.text', signUpTitleContent);
  }

  verifySignUpBtnDisabled() {
    this.signUpButton().should('be.disabled');
  }

  verifyErrMesDataIsRequiredOfField(fieldName: keyof typeof signupElement) {
    this.errMessOnField(fieldName).should('be.visible').and('have.text', M.fieldDataIsRequired(fieldName));
  }

  verifyUsernameExistedErrorMessage() {
    this.signupErrorMessageAPI().should('be.visible').and('have.text', M.userNameExisted);
  }

  verifyPasswordFieldInvalid() {
    this.form.verifyPasswordFieldValidation(S.passwordErrorMessage);
  }

  verifyPasswordInputValuesShouldBeHidden() {
    this.form.verifyPasswordInputValuesShouldBeHidden(S.passwordInput);
  }

  verifyButtonShowPassword() {
    this.form.verifyPasswordInputValuesShouldBeShown(S.showPasswordButton, S.passwordInput);
  }
}

export const signUpPage = new SignUpPage();
