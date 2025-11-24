describe('checkRequiredFields', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    describe('Check Contact page', () => {
        it(`Kiểm tra Add a new contact`, () => {
            // Mở form tạo mới contact
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts'); // Cập nhật đường dẫn nếu cần
            cy.get('#btn-add-contact').should('be.visible').click();

            // Click submit mà không điền thông tin
            cy.get('#formContact > .form-contact__button > #save-contact').click();

            // Kiểm tra thông báo lỗi
            cy.get('#first_name-error').should('contain', 'First name is required');
            cy.get('#last_name-error').should('contain', 'Last name is required');
            cy.get('#email-error').should('contain', 'Email is required');
            cy.get('#contact_resource_id-error').should('contain', 'Contact resource is required');
            cy.get('#country_id-error').should('contain', 'Country is required');
            cy.get('#industry_id-error').should('contain', 'Industry is required');
        });

        it(`Kiểm tra Edit a contact`, () => {
            // Mở form edit contact
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts/49786'); // Cập nhật đường dẫn nếu cần
            cy.get('.button-edit').should('be.visible').click();

            //clear các trường thông tin
            cy.get('.staff__name--first-name > .form__input').clear();
            cy.get('.staff__name--last-name > .form__input').clear();
            cy.get('.staff__email > .form__input').clear();
            cy.get('.staff__country > .selectize-control > .selectize-input > .item').type('{backspace}');
            cy.get('body').type('{esc}');
            cy.get('.select__lifecycle-stage > .selectize-control > .selectize-input')
            .then(($inputField) => {
                const isDisabled =
                $inputField.hasClass('disabled') ||
                $inputField.attr('aria-disabled') === 'true';
                cy.wrap(isDisabled).as('stageFieldIsDisabled');
                if (!isDisabled) {
                    cy.log('User có thể chọn Stage vì trường này không bị disable');
                    cy.wrap($inputField).find('input').type('{backspace}');
                    cy.get('body').type('{esc}');
                } else {
                    cy.log('Stage select đã bị disable');
                }
            });


            cy.get('.select__contact-resource > .selectize-control > .selectize-input > .item').type('{backspace}');
            cy.get('body').type('{esc}');
            cy.get('.select__industry > .selectize-control > .selectize-input > .item').type('{backspace}');
            cy.get('body').type('{esc}');

            // Click submit mà không điền thông tin
            cy.get('#btnSaveEditContact').click();

            // Kiểm tra thông báo lỗi
            cy.get('#first_name-error').should('contain', 'First name is required');
            cy.get('#last_name-error').should('contain', 'Last name is required');
            cy.get('#email-error').should('contain', 'Email is required');
            cy.get('#country_id-error').should('contain', 'Country is required');
            cy.get('@stageFieldIsDisabled').then((isDisabled) => {
                if (!isDisabled) {
                    cy.get('.select__lifecycle-stage > #stage_id-error').should('contain', 'Stage is required');
                } else {
                    cy.log('Bỏ qua kiểm tra Stage vì trường này bị disable');
                }
            })
            cy.get('#industry_id-error').should('contain', 'Industry is required');
            cy.get('#contact_resource_id-error').should('contain', 'Contact resource is required');
        }); 
    })  
})