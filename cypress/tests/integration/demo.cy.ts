import { PAGE_URLS } from '../../fixtures/urls'
import { signInPage, homePage } from '../../support/pages/index.page'
import { VALID_USER, INVALID_USER } from '../../fixtures/users'
import { INVALID_PASSWORD } from '../../fixtures/passwords'

describe('my first demo', () => {
    
    beforeEach('redirect to the login page of demo guru', () => {
        cy.visit(PAGE_URLS.SIGNIN_PAGE);
    })

    describe('login with valid credentials', () => {

        it('Kiểm tra các element hiển thị trên page', () => {
            signInPage.verifyLoginElement();
            signInPage.verifyTitleLoginPage('Sign in');
        })

        it('Kiểm tra password cần hiển thị khi show', () => {
            signInPage.verifyButtonShowPassword();
        })

        it('Kiểm tra login thành công', () => {
            signInPage.loginWith(VALID_USER.USER, VALID_USER.PASSWORD);
            homePage.verifyLoginSucessfulWithUser(VALID_USER.USER);
        });

        it('Kiểm tra các field không được để trống', () => {
            signInPage.loginWith('', '');
            signInPage.verifyLoginUserNameErrorMessage();
            signInPage.verifySignInBtnDisabled();
        });

        it('Kiểm tra login invalid user', () => {
            signInPage.loginWith(INVALID_USER.USER, VALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage();
            signInPage.clearAllFields();
            signInPage.loginWith(VALID_USER.USER, INVALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage();
        })
    })
    
    //Chỉ áp dụng cho các chức năng tạo mật khẩu mới, không áp dụng cho chức năng login
    describe('Kiểm tra validate password field', () => {
        Object.entries(INVALID_PASSWORD).forEach(([invalidCase, invalidValue]) => {
            it(`Verify password is ${invalidCase}`, () => {
                signInPage.passwordInputBox().type(invalidValue);
                signInPage.rememberMeCheckbox().click();
                signInPage.verifyPasswordInputValuesShouldBeHidden();
                signInPage.verifyPasswordFieldInvalid();
            })
        })
    })
}) 