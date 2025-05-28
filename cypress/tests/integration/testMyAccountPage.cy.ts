import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/index.components';
import { myAccountPage, inputFields } from '../../support/pages/MyAccountPage';
import { Email, INPUT_WITH_SPACE } from '../../support/constants/pages/myAccountPageConstants';

describe('Validation input field test', () => {

    beforeEach('Signin and redirect to My Account page', () => {
        cy.signinViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        navigationMenu.goToMyAccountSideBarMenu();
    });

    describe('Verify the email must be valid format', () => {
        Object.entries(Email).forEach(([invalidCase, invalidEmail]) => {
            it(`Verify invalid format email ${invalidCase}`, () => {
                myAccountPage.verifyEmailWithInvalidFormat(invalidEmail);
            });
        });
    });

    describe('Verify required fields', () => {
        Object.entries(inputFields).forEach(([inputNameField, inputField]) => {
            it(`Verify ${inputNameField} required field`, () => {
                myAccountPage.verifyRequiredField(inputField, 'The ' + inputNameField + ' is required');
            });
        });
    });

    describe('Verify title name and placeholder of input fields', () => {
        Object.entries(inputFields).forEach(([titleName, titleSelector]) => {
            it(`Verify ${titleName} input field title`, () => {
                myAccountPage.clearInputField(titleSelector);
                // myAccountPage.verifyTitleField(titleSelector, titleName); // Demo hiện tại không có title
                myAccountPage.verifyPlaceHolder(titleSelector, titleName);
            });
        });
    });

    describe('Verify all input fields can type', () => {
        Object.entries(inputFields).forEach(([inputNameField, inputFieldSelector]) => {
            it(`Verify ${inputNameField} input field can type`, () => {
                myAccountPage.clearInputField(inputFieldSelector);
                myAccountPage.verifyInputFieldCanType(inputFieldSelector, inputNameField);
            });
        });
    });

    //Bổ sung thêm 1 test case cho verify trim space khi create data
    describe('Verify all input values must trim space after update', () => {
        Object.entries(INPUT_WITH_SPACE).forEach(([inputNameField, inputField]) => {
            it.only(`Verify ${inputNameField} value must trim space`, () => {
                myAccountPage.verifyTrimSpaceAfterUpdate(inputField.selector, inputField.inputValue);
            });
        });
    });
});