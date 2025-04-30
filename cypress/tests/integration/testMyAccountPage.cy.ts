import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/index.components';
import { myAccountPage } from '../../support/pages/index.page';


describe('Validation input field test', () => {

    beforeEach('Login and redirect to My Account page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        navigationMenu.goToMyAccountSideBarMenu();
    })

    it(`Verify invalid email fields`, () => {
        myAccountPage.verifyEmailWithInvalidFormat();
    })

    it(`Verify required email fields`, () => {
        myAccountPage.verifyRequiredEmail();
    })

    it(`Verify required first name fields`, () => {
        myAccountPage.verifyRequiredFirstName();
    })

    it(`Verify required last name fields`, () => {
        myAccountPage.verifyRequiredLastName();
    })

    it(`Verify required phone number fields`, () => {
        myAccountPage.verifyRequiredPhoneNumber();
    })
    
})