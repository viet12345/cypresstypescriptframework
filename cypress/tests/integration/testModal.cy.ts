import { BANK_ACC, VALID_USER } from '../../fixtures/users';
import { navigationMenu, Modal } from '../../support/components/index.components';
import { ModalMessages as M } from '../../support/constants/components/modalConstants';
import { BankAccountsPageSelectors as S } from '../../support/constants/pages/bankAccountsPageConstants';
import { homePage } from '../../support/pages/index.page';

describe('Delete Confirmation Modal', () => {
    const modal = new Modal();

    beforeEach('Login and redirect to Bank Accounts page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        homePage.verifyLoginSucessfulWithUser(VALID_USER.USER);
        cy.createBankAccount(BANK_ACC.BANK_NAME, BANK_ACC.ROUTING_NUM, BANK_ACC.ACC_NUM);
    })

    it('should show modal and cancel deletion', () => {
        cy.get(S.deleteButton).last().click(); // nút delete

        modal.shouldBeVisible();
        modal.shouldContainText(M.delete);

        modal.cancelAndCheckClosed();

        // Check item still exists
        cy.get(S.accListItem).last().should('contain', BANK_ACC.BANK_NAME);
    });

    it('should show modal and confirm deletion', () => {
        cy.get(S.deleteButton).last().click();

        modal.shouldBeVisible();
        modal.shouldContainText(M.delete);

        modal.confirmAndCheckClosed();

        // Check item removed
        cy.get(S.accListItem).should('not.contain', BANK_ACC.BANK_NAME);
    });
});
