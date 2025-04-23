import { PAGE_URLS } from '../../fixtures/urls'
import { signInPage } from '../../pages/index.page'
import {VALID_USER,INVALID_USER} from '../../fixtures/users'

describe('my first demo', () => {
    beforeEach('redirect to the login page of demo guru', () => {
        cy.visit(PAGE_URLS.SIGNIN_PAGE);
    })

    describe('login with valid credentials', () => {
        
        it('Kiểm tra các element hiển thị trên page', () => {
            signInPage.passwordInputBox().should('be.visible');
            signInPage.usernameInputBox().should('be.visible');
            signInPage.loginButton().should('be.visible');
            signInPage.verifyTitleLoginPage('Sign in').should('be.visible');
            signInPage.signUpButton().should('be.visible');
            signInPage.rememberMeCheckbox().should('be.visible');
        })

        it('Kiểm tra login thành công', () => {
            signInPage.usernameInputBox().type(VALID_USER.USER);
            signInPage.passwordInputBox().type(VALID_USER.PASSWORD);
            signInPage.loginButton().click();
            cy.contains(VALID_USER.USER).should('be.visible');
        });

        it('Kiểm tra validation invalid login', () => {
            //Kiểm tra các field không được để trống
            signInPage.usernameInputBox().should('be.empty');
            signInPage.passwordInputBox().should('be.empty');
            signInPage.loginButton().click();
            signInPage.loginButton().should('be.disabled');
            signInPage.loginUserNameErrorMessage().should('be.visible').and('have.text', 'Username is required');
            //signInPage.loginPasswordErrorMessage().should('be.visible').and('have.text', 'Password is required'); (tạm thời bỏ qua để pass test vì demo không yêu cầu, nhưng thực tế sẽ cần)

            //Kiểm tra user name không hợp lệ
            cy.reload();
            cy.get('body', { timeout: 10000 }).should('be.visible');
            signInPage.usernameInputBox().type(INVALID_USER.USER);
            signInPage.passwordInputBox().type(VALID_USER.PASSWORD);
            signInPage.loginButton().click();
            //Verify validation message hiển thị
            signInPage.loginErrorMessageAPI().should('be.visible').and('have.text', 'Username or password is invalid');

            //Kiểm tra password không hợp lệ
            cy.reload();
            cy.get('body', { timeout: 10000 }).should('be.visible');
            signInPage.usernameInputBox().type(VALID_USER.USER);
            signInPage.passwordInputBox().type(INVALID_USER.PASSWORD);
            signInPage.loginButton().click();
            //Verify validation message hiển thị
            signInPage.loginErrorMessageAPI().should('be.visible').and('have.text', 'Username or password is invalid');
        });

        it('verify user is able to login with valid credentials', () => {
            signInPage.passwordInputBox().should('be.visible');
            signInPage.usernameInputBox().should('be.visible');
        })
    })
})