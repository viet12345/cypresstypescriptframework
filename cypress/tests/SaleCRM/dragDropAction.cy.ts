describe('Check drag drop action', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    it.only(`Update deal Approach -> Engaged`, () => {
        const dealSourceSelector = '[data-deal-id="10376"] > .deal__item--detail';
        const dealTargetSelector = '#dealItemGridArea_2';

        //Mở page có chứa search function
        cy.visit('deals'); // Cập nhật đường dẫn nếu cần

        //Lấy deal name để sử dụng verify move stage thành công sau khi drag and drop
        cy.get(dealSourceSelector).then($dealItem => {
            cy.wrap($dealItem).find('.item__name').invoke('text').then($dealName => {
                const expectedDealName = $dealName.trim();
                // 1. Drag task sang Done (có xử lý animation delay)
                cy.dragAndDrop(dealSourceSelector, dealTargetSelector)
        
                // 2. Verify modal xuất hiện
                cy.get('#popupConfirmMovingDealToNewStage > .modal-dialog > .modal-content').should('be.visible');
                cy.get('#buttonAcceptMovingDeal').click();
        
                // 3. Nhập thông tin note và đính kèm file.
                cy.get('iframe[id="content_ifr"]').first().then($iframe => {
                    const body = $iframe.contents().find('body');
                    cy.wrap(body).type('First Meeting (Approach -> Engaged)');
                });
                cy.get('input[class="filepond--browser"]').first().attachFile(`DataTestingFiles/download.jpeg`); // Đính kèm file ảnh nếu required
                cy.get('button[class="milestone__button--save"]').contains('Save').click({ force: true });
                cy.reload();
        
                // 4. Verify deal đã được cập nhật stage
                cy.get(dealTargetSelector).then($target => {
                    cy.wrap($target).find('.item__name').first().should('contain.text', expectedDealName);
                });
            });
        })
    });
})