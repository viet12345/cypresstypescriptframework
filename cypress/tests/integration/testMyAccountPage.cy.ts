import { form } from '../../components/Form'
import { VALID_USER } from '../../fixtures/users';
import { PAGE_URLS } from '../../fixtures/urls';
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
        Object.entries(inputFields).forEach(([fieldName, inputField]) => {
            it.only(`Verify required ${fieldName} field`, () => {
                verifyRequiredField(inputField, fieldName, );
            })
        })
    })
})