import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/NavigationMenu';
import { newTransactionPage } from '../../support/pages/NewTransactionPage';

describe('Searching Page Demo Tests', () => {
    beforeEach('Navigate to Searching Page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        // Điều hướng đến page tìm kiếm
        navigationMenu.goToNewTransaction();
    });

    it('Cần có GUI riêng cho việc hiển thị No data', () => {
        newTransactionPage.verifySearchingNoData();
    });

    it.only('Cần loại bỏ space đầu cuối khi search', () => {
        newTransactionPage.verifySearchingMustTrimSpace();
    });
});
