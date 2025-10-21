describe('Access success the valid pages', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        cy.clearSession();
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    it(`Kiểm tra Home page`, () => {
        // Mở trang Home
        cy.visit(Cypress.env('SaleCRM_URL')+'home'); // Cập nhật đường dẫn nếu cần

        // Xác minh URL
        cy.verifyUrl(Cypress.env('SaleCRM_URL')+'/home');

        // Kiểm tra flag có hiển thị (vi dụ: tiêu đề page,... bất cứ thành phần nào có thể xác minh trang đã load thành công)
        cy.get('.home__title').should('be.visible');
        cy.get('.home__welcome-message').should('contain', 'Welcome to SaleCRM');
    });

    it(`Kiểm tra Contact page`, () => {
        // Mở trang Contact
        cy.visit(Cypress.env('SaleCRM_URL')+'contacts'); // Cập nhật đường dẫn nếu cần

        // Xác minh URL
        cy.verifyUrl('/contacts');

        // Kiểm tra flag có hiển thị (vi dụ: tiêu đề page,... bất cứ thành phần nào có thể xác minh trang đã load thành công)
        cy.get('.page-title').should('be.visible').should('contain', 'Contacts');

        //Kiểm tra có thể click vào contact để show detail
        cy.get(':nth-child(1) > #td_name > .contact__name').first().click();
        cy.url().should('match', /\/contacts\/\d+$/);
        cy.backActionFromBrowser();

        // Kiểm tra nút "Add new" có hiển thị và không bị vô hiệu hóa
        cy.get('#btn-add-contact').should('be.visible').and('contain', 'Add new').click();
        cy.get('#form-contact').should('be.visible').type('{esc}');

        //Kiểm tra button "Import" có hiển thị và không bị vô hiệu hóa
        cy.get('.btn__import').should('be.visible').click();
        cy.get('#form-import-contact').should('be.visible').type('{esc}');

        //Kiểm tra button "Export" có hiển thị và không bị vô hiệu hóa
        cy.get('#buttonExportContact').should('be.visible').click();
        cy.get('#modalExportContact > .modal-dialog > .modal-content').should('be.visible');
        cy.get('#modalExportContact > .modal-dialog > .modal-content > .modal-header > .modal-title')
            .should('contain', 'Ready to download!')
            .then(() => {
            cy.get('#modalExportContact > .modal-dialog > .modal-content').type('{esc}');
        });

        //Kiểm tra button "More filters" có hiển thị và không bị vô hiệu hóa
        cy.get('.btn-more-filter').should('be.visible').click();
        cy.get('#listViewMoreFilter').should('be.visible').type('{esc}');

        //Kiểm tra button "List view" có hiển thị và không bị vô hiệu hóa
        cy.get('#listViewsDropdown').should('be.visible').click();
        cy.get('.list-view-dropdown-menu').should('be.visible').then(() => {
            cy.get('li.default-view > .dropdown-item').contains('Default view').click();
        });

        //Kiểm tra button "Bulk actions" có hiển thị và không bị vô hiệu hóa
        cy.get('.dt-column-title > .d-flex > .bulk-item').click();
        cy.get('.select-bulk-box').should('be.visible');
        
        //Kiểm tra button "Next/Previous" page có hiển thị và không bị vô hiệu hóa
        cy.get('.pagination-next').should('be.visible').click();
        cy.get('.pagination-prev').as('btnPrev').click();

        //Kiểm tra button "Page number" có hiển thị và không bị vô hiệu hóa
        cy.get(':nth-child(2) > .page').click();
        cy.get(':nth-child(1) > .page').click();

        //Kiểm tra button "Rows per page" có hiển thị và không bị vô hiệu hóa
        cy.get('#rowsPerPageDropdown').click();
        cy.get('.option-page__dropdown-menu > :nth-child(2) > .dropdown-item').click();

        //Kiểm tra filter "My team" và "Owner" bị vô hiệu hóa
        cy.get('.selectize__filter--team.selectize-control > .selectize-input').should('have.class', 'disabled');
        cy.get('.selectize__filter--contact-owner.selectize-control > .selectize-input').should('have.class', 'disabled');
    });

    it('Kiểm tra Contact exchange page', () => {
        // Đăng ký intercept trước khi visit để đảm bảo bắt được request
        cy.intercept(Cypress.env('SaleCRM_URL')+'/contact-exchange/**').as('getContactExchange');
        cy.intercept(Cypress.env('SaleCRM_URL')+'/contact-exchange/receive/**').as('chooseContactExchange');

        // Mở trang Contact exchange
        cy.visit(Cypress.env('SaleCRM_URL')+'contact-exchange'); // Cập nhật đường dẫn nếu cần

        // Xác minh URL
        cy.verifyUrl('/contact-exchange');

        // Kiểm tra flag có hiển thị (vi dụ: tiêu đề page,... bất cứ thành phần nào có thể xác minh trang đã load thành công)
        cy.get('.header__title').should('be.visible').should('contain', 'Contact exchange');


        //Xác minh button "Notification" có hiển thị và không bị vô hiệu hóa
        cy.get('#listNotificationDropdown').should('be.visible').click();
        cy.get('.dropdown-menu').should('be.visible').find('.notification__menu--footer > .button__close-menu').click({scrollBehavior: false});
        
        //Xác minh button "Choose" có hiển thị và không bị vô hiệu hóa.
        cy.get('tbody > tr').first().find('.table__contact--stage').then(($stage) => {
            const stageText = $stage.text().trim();
            if (stageText === 'Sales Qualified') {
                cy.get(':nth-child(1) > [width="15%"] > .action > .choose-btn').should('be.visible').click();
                cy.get('.swal2-popup').should('be.visible').type('{esc}');
            } else {
                cy.get(':nth-child(1) > [width="15%"] > .action > .choose-btn').should('be.visible').click();
                cy.get('.swal2-popup').should('be.visible');
                cy.get('.swal2-confirm').should('be.visible').click();
                cy.wait('@chooseContactExchange');
            }
        });
        //Xác minh button "View detail" có hiển thị và không bị vô hiệu hóa
        cy.get(':nth-child(1) > [width="15%"] > .action > .preview-contact').should('be.visible').click();
        cy.wait('@getContactExchange').get('#preview-contact').should('be.visible').type('{esc}');

        //Xác minh button Next/Previous page có hiển thị và không bị vô hiệu hóa
        cy.get('.pagination-next').should('be.visible').click();
        cy.get('.pagination-prev').as('btnPrev').click();

        //Kiểm tra button "Page number" có hiển thị và không bị vô hiệu hóa
        cy.get(':nth-child(2) > .page').click();
        cy.get(':nth-child(1) > .page').click();
    });
})