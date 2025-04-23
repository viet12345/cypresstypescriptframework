import { PAGE_URLS } from '../../fixtures/urls'
import { signInPage } from '../../pages/index.page'

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
        })

        it('verify user is able to login with valid credentials', () => {
            signInPage.passwordInputBox().should('be.visible');
            signInPage.usernameInputBox().should('be.visible');
        })
    })
})