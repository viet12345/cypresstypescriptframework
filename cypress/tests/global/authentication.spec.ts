import { signInPage, homePage, signUpPage, signupElement } from '../../support/pages/index.page'
import { VALID_USER, INVALID_USER, VALID_SIGNUP_USER } from '../../fixtures/users'
import { INVALID_PASSWORD } from '../../fixtures/passwords'
import { PAGE_URLS } from '../../fixtures/urls'

describe('Authentication Test', () => {

  describe('Sign In authentication', () => {

    beforeEach('', () => {
      homePage.visit(PAGE_URLS.SIGNIN_PAGE);
    })

    describe('Kiểm tra hiển thị trang Sign In', () => {

      it('Kiểm tra Sign in page title', () => {
        signInPage.verifyTitleSigninPage('Sign in');
      })

      it('Kiểm tra các element hiển thị trên page', () => {
        //Luôn cần case verify việc hiển thị các element trên từng page
        signInPage.verifySigninElement();
      })

      it('Kiểm tra password cần hiển thị, khi click button show password', () => {
        signInPage.verifyButtonShowPassword();
      })

    })

    it('Kiểm tra Sign In thành công', () => {
      signInPage.signinWith(VALID_USER.USER, VALID_USER.PASSWORD);
      homePage.verifySigninSucessfulWithUser(VALID_USER.USER);
    });

    describe('Kiểm tra invalid signin', () => {

      it('Kiểm tra các field không được để trống', () => {
        signInPage.signinWith('', '');
        signInPage.verifySigninUserNameErrorMessage();
        signInPage.verifySignInBtnDisabled();
      });

      it('Kiểm tra signin invalid user', () => {
        signInPage.signinWith(INVALID_USER.USER, VALID_USER.PASSWORD);
        signInPage.verifyInvalidCredentialErrorMessage();
      })

      it('Kiểm tra signin wrong password', () => {
        signInPage.clearAllFields();
        signInPage.signinWith(VALID_USER.USER, INVALID_USER.PASSWORD);
        signInPage.verifyInvalidCredentialErrorMessage();
      })

    })
  })

  describe.only('Sign Up authentication', () => {

    beforeEach('', () => {
      homePage.visit(PAGE_URLS.SIGNUP_PAGE);
    })

    describe('Kiểm tra hiển thị trang Sign Up', () => {

      it('Kiểm tra Sign Up page title', () => {
        signUpPage.verifyTitleSignUpPage('Sign Up');
      })

      describe('Kiểm tra các element hiển thị trên page', () => {
        Object.entries(signupElement).forEach(([elementName, selector]) => {
          it(`Verify ${elementName} should be visible`, () => {
            signUpPage.verifySignUpElementVisible(selector);
          })
        })
      })

      describe('Kiểm tra các field không được để trống', () => {

        beforeEach('Input valid data to all field', () => {
          signUpPage.fillAllSignupField(
            VALID_SIGNUP_USER.FIRST_NAME,
            VALID_SIGNUP_USER.LAST_NAME,
            VALID_SIGNUP_USER.USER,
            VALID_SIGNUP_USER.PASSWORD,
            VALID_SIGNUP_USER.CONFIRM_PASS
          )
        })

        Object.entries(signupElement).forEach(([elementName, selector]) => {
          if (!(elementName.includes('button')) && !(elementName.includes('link'))) {
            it(`Kiểm tra ${elementName} field không được để trống`, () => {
              signUpPage.clear(selector);
              signUpPage.verifyErrMesDataIsRequiredOfField(elementName as keyof typeof signupElement);
            })
          }
        })
      });

      describe('Kiểm tra sign up button disable khi có field để trống', () => {

        beforeEach('Input valid data to all field', () => {
          signUpPage.fillAllSignupField(
            VALID_SIGNUP_USER.FIRST_NAME,
            VALID_SIGNUP_USER.LAST_NAME,
            VALID_SIGNUP_USER.USER,
            VALID_SIGNUP_USER.PASSWORD,
            VALID_SIGNUP_USER.CONFIRM_PASS
          )
        })

        Object.entries(signupElement).forEach(([elementName, selector]) => {
          if (!(elementName.includes('button')) && !(elementName.includes('link'))) {
            it(`Kiểm tra sign up button disable khi ${elementName} field để trống`, () => {
              signUpPage.clear(selector);
              signUpPage.verifySignUpBtnDisabled();
            })
          }
        })
      });

      it('Kiểm tra password cần hiển thị, khi click button show password', () => {
        signUpPage.verifyButtonShowPassword();
      })

    })

    describe('Kiểm tra khởi tạo password với các giá trị invalid', () => {
      Object.entries(INVALID_PASSWORD).forEach(([invalidCase, invalidValue]) => {
        it(`Verify password is ${invalidCase}`, () => {
          //Nhập Password invalid
          signUpPage.passwordInputBox().type(invalidValue);
          //Kiểm tra password nhập vào phải bị hide
          signUpPage.verifyPasswordInputValuesShouldBeHidden();
          //Kiểm tra phải có validation message cho password hiển thị
          signUpPage.verifyPasswordFieldInvalid();
        })
      })
    })
  })
}) 