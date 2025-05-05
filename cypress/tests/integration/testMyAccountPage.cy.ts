import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/index.components';
import { myAccountPage, inputFields } from '../../support/pages/MyAccountPage';


describe('Validation input field test', () => {

    beforeEach('Login and redirect to My Account page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        navigationMenu.goToMyAccountSideBarMenu();
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
    
})