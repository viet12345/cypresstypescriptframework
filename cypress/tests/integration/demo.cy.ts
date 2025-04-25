import { PAGE_URLS } from '../../fixtures/urls'
import { signInPage } from '../../pages/index.page'
import { VALID_USER, INVALID_USER } from '../../fixtures/users'

describe('my first demo', () => {
    beforeEach('redirect to the login page of demo guru', () => {
        cy.visit(PAGE_URLS.SIGNIN_PAGE);
    })

    describe('login with valid credentials', () => {

        it('Kiểm tra các element hiển thị trên page', () => {
            signInPage.verifyLoginElement();
            signInPage.verifyTitleLoginPage('Sign in');
        })

        it('Kiểm tra login thành công', () => {
            signInPage.loginWith(VALID_USER.USER, VALID_USER.PASSWORD);
            signInPage.verifyLoginSucessfulWithUser(VALID_USER.USER);
        });

        it('Kiểm tra các field không được để trống', () => {
            signInPage.loginWith('', '');
            signInPage.verifyLoginUserNameErrorMessage('Username is required');
            signInPage.verifyLoginPasswordErrorMessage('Password is required');
            signInPage.verifySignInBtnDisabled();
        });

        it('Kiểm tra login invalid user', () => {
            signInPage.loginWith(INVALID_USER.USER, VALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage('Username or password is invalid');
            signInPage.clearAllField();
            signInPage.loginWith(VALID_USER.USER, INVALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage('Username or password is invalid');
        })
    })
}) 