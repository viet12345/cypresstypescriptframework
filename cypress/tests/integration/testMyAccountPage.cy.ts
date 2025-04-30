import { VALID_USER } from '../../fixtures/users';
import { myAccountPage } from '../../support/pages/index.page';


describe('Validation input field test', () => {

    beforeEach('Login and redirect to My Account page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        myAccountPage.goToMyAccountSideBarMenu();
    })

    it(`Verify invalid email fields`, () => {
        myAccountPage.verifyEmailWithInvalidFormat();
    })

    describe('Verify required fields', () => {
        Object.entries(myAccountPage.inputFields).forEach(([inputNameField, inputField]) => {
            it(`Verify ${inputNameField} required field`, () => {
                myAccountPage.verifyFieldInvalidFormat(inputField[0], '', inputField[1], inputField[2]);
            })
        })
    })
})