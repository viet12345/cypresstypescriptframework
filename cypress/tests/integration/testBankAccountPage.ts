import { VALID_USER } from '../../fixtures/users';
import { navigationMenu } from '../../support/components/index.components';
import { bankAccountPage } from '../../support/pages/BankAccount';
import { BANK_ACC } from '../../fixtures/users';

describe('Validation input field test', () => {
    beforeEach('Signin and redirect to My Account page', () => {
        cy.signinViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
        navigationMenu.goToBankAccountsSideBarMenu();
    })

    //Case này demo sẽ fail vì khi xóa, data test không mất mà chỉ có chú thích Deleted, trên thực tế sẽ luôn xóa thành công và data test sẽ không hiển thị.
    it('Verify double click không tạo ra duplicate bản ghi trong chức năng tạo mới', () => {
        //Xác nhận bản ghi định tạo chưa tồn tại trong list data
        bankAccountPage.verifyBankAccountNameNotExist(BANK_ACC.BANK_NAME);
        //Tạo data mới và thực hiện double-click button trong form
        bankAccountPage.openCreateNewBankAccountForm();
        //Cần bước trung gian để hiển thị lại list data mới nhất (optional)
        //Xác nhận double-click action chỉ tạo 1 bản ghi mới duy nhất
        bankAccountPage.verifyDuplicateBankAccountName();

    })
})