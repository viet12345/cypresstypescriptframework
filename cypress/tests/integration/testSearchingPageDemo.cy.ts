import { PAGE_URLS } from '../../fixtures/urls';
import { VALID_USER } from '../../fixtures/users';
import { dataTable } from '../../support/components/dataTable';
import { TransactionSelector as S } from '../../support/constants/pages/transactionNewPage';

describe('Searching Page Demo Tests', () => {
    beforeEach('Navigate to Searching Page', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        // Điều hướng đến page tìm kiếm
        cy.visit(PAGE_URLS.SEARCHING_PAGE);
    });

    it('Cần có GUI riêng cho việc hiển thị No data', () => {
        dataTable.verifySearchNoData(S.searchInput, S.listOfTransaction);
    });
});
