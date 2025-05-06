import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/index.components';
import { bankAccountPage } from '../../support/pages/BankAccount';

describe('Validation input field test', () => {
    beforeEach('Login and redirect to My Account page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        navigationMenu.goToBankAccountsSideBarMenu();
    })

    it('Verify double click action is not allowed', () => {
        bankAccountPage.createNewBankAccountButton();
        bankAccountPage.verifyBankAccountNameNotExist('[data-test="bankaccount-name"]', 'Test Bank Account');
        bankAccountPage.verifyDuplicateBankAccountName('Test Bank Account');
    })
})