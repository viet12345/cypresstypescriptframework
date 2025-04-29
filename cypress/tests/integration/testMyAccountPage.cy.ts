import { form } from '../../components/Form'
import { VALID_USER } from '../../fixtures/users';
import { PAGE_URLS } from '../../fixtures/urls';
import { myAccountPage } from '../../pages/MyAccountPage';


describe('Validation input field test', () => {
        beforeEach('Login and redirect to My Account page', () => {
            cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
            myAccountPage.goToMyAccountSideBarMenu();
        })
    it.only(`Verify invalid email fields`, () => {
        myAccountPage.verifyEmailWithInvalidFormat();
    })
})