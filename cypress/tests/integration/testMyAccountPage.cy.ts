import { VALID_USER } from '../../fixtures/users';
import { myAccountPage, inputFields } from '../../pages/MyAccountPage';


describe('Validation input field test', () => {
    beforeEach('Login and redirect to My Account page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        myAccountPage.goToMyAccountSideBarMenu();
    })
    it(`Verify invalid email fields`, () => {
        myAccountPage.verifyEmailWithInvalidFormat();
    })
    describe('Verify required fields', () => {
        Object.entries(inputFields).forEach(([inputNameField, inputField]) => {
            it(`Verify ${inputNameField} required field`, () => {
                myAccountPage.verifyRequiredField(inputField, 'The ' + inputNameField + ' is required');
            })
        })
    })

    describe('Verify title name and place holder of input fields', () => {
        Object.entries(inputFields).forEach(([titleName, titleSelector]) => {
            it(`Verify ${titleName} input field title`, () => {
                myAccountPage.clearInputField(titleSelector);
                //myAccountPage.verifyTitleField(titleSelector, titleName); //Demo hiện tại không có title
                myAccountPage.verifyPlaceHolder(titleSelector, titleName);
            })
        })
    })

    describe('Verify all input fields can type', () => {
        Object.entries(inputFields).forEach(([inputNameField, inputFieldSelector]) => {
            it.only(`Verify ${inputNameField} input field can type`, () => {
                myAccountPage.clearInputField(inputFieldSelector);
                myAccountPage.verifyInputFieldCanType(inputFieldSelector, inputNameField);
            })
        })
    })
})