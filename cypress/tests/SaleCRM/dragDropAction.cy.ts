describe('Check drag drop action', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    it.only(`Update deal Approach -> Engaged`, () => {
        //Mở page có chứa search function
        cy.visit('deals'); // Cập nhật đường dẫn nếu cần

        // 1. Drag task sang Done (có xử lý animation delay)
        cy.dragAndDrop('[data-deal-id="10513"] > .deal__item--detail', '#dealItemGridArea_2');

        // 2. Verify modal xuất hiện
        cy.get('#popupConfirmMovingDealToNewStage > .modal-dialog > .modal-content').should('be.visible');
    });
})