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
            //Luôn cần case verify việc hiển thị các element trên từng page
            signInPage.verifyLoginElement();
            signInPage.verifyTitleLoginPage('Sign in');
        })

        it('Kiểm tra password cần hiển thị, khi click button show password', () => {
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
            //Kiểm tra cả 2 case, khi password hoặc username invalid
            signInPage.loginWith(INVALID_USER.USER, VALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage();
            signInPage.clearAllFields();
            signInPage.loginWith(VALID_USER.USER, INVALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage();
        })
    })
    
    //Chỉ áp dụng cho các chức năng tạo mật khẩu mới, không nên áp dụng cho chức năng login
    describe('Kiểm tra khởi tạo password với các giá trị invalid', () => {
        Object.entries(INVALID_PASSWORD).forEach(([invalidCase, invalidValue]) => {
            it(`Verify password is ${invalidCase}`, () => {
                //Nhập Password invalid
                signInPage.passwordInputBox().type(invalidValue);
                //Action (optional) để trigger validation
                signInPage.rememberMeCheckbox().click();
                //Kiểm tra password nhập vào phải bị hide
                signInPage.verifyPasswordInputValuesShouldBeHidden();
                //Kiểm tra phải có validation message cho password hiển thị
                signInPage.verifyPasswordFieldInvalid();
            })
        })
    })
}) 