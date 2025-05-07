import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/index.components';
import { bankAccountPage } from '../../support/pages/BankAccount';
import { BANK_ACC } from '../../fixtures/users';

describe('Validation input field test', () => {
    beforeEach('Login and redirect to My Account page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        navigationMenu.goToBankAccountsSideBarMenu();
    })

    it('Verify double click action is not allowed', () => {
        //Case này demo sẽ fail vì khi xóa, data test không mất mà chỉ có chú thích Deleted, trên thực tế sẽ luôn xóa thành công và data test sẽ không hiển thị.
        bankAccountPage.verifyBankAccountNameNotExist(BANK_ACC.BANK_NAME);
        bankAccountPage.openCreateNewBankAccountForm();
        bankAccountPage.verifyDuplicateBankAccountName();

    })
})