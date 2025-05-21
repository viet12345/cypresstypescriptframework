import { PAGE_URLS } from '../../fixtures/urls'
import { signInPage, homePage } from '../../support/pages/index.page'
import { VALID_USER, INVALID_USER } from '../../fixtures/users'
import { INVALID_PASSWORD } from '../../fixtures/passwords'

describe('my first demo', () => {
    
    beforeEach('redirect to the signin page of demo guru', () => {
        cy.visit(PAGE_URLS.SIGNIN_PAGE);
    })

    describe('signin with valid credentials', () => {

        it('Kiểm tra các element hiển thị trên page', () => {
            //Luôn cần case verify việc hiển thị các element trên từng page
            signInPage.verifySigninElement();
            signInPage.verifyTitleSigninPage('Sign in');
        })

        it('Kiểm tra password cần hiển thị, khi click button show password', () => {
            signInPage.verifyButtonShowPassword();
        })

        it('Kiểm tra signin thành công', () => {
            signInPage.signinWith(VALID_USER.USER, VALID_USER.PASSWORD);
            homePage.verifySigninSucessfulWithUser(VALID_USER.USER);
        });

        it('Kiểm tra các field không được để trống', () => {
            signInPage.signinWith('', '');
            signInPage.verifySigninUserNameErrorMessage();
            signInPage.verifySignInBtnDisabled();
        });

        it('Kiểm tra signin invalid user', () => {
            //Kiểm tra cả 2 case, khi password hoặc username invalid
            signInPage.signinWith(INVALID_USER.USER, VALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage();
            signInPage.clearAllFields();
            signInPage.signinWith(VALID_USER.USER, INVALID_USER.PASSWORD);
            signInPage.verifyInvalidCredentialErrorMessage();
        })
    })
    
    //Chỉ áp dụng cho các chức năng tạo mật khẩu mới, không nên áp dụng cho chức năng signin
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