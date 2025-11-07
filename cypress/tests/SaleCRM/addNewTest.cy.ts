import dayjs from 'dayjs';

function selectOptionAndVerify(inputSelector: string, inputCase:string) {
    // Mở form
    // Chọn giá trị từ dropdown.
    cy.get(inputSelector).click().type(inputCase).wait(2000).type('{enter}');
    // cy.get(`.optgroup .option`).contains(inputCase).click();
}

const Role = Cypress.env('Role');

describe('Kiểm tra chức năng filters', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.reload();
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })
    
    describe('Add new contact page', () => {
        it('Add new a contact', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.get('#btn-add-contact').click();
            cy.get('#form-contact').should('be.visible').then($form => {
                cy.wrap($form).find('#first_name').clear().type('Cypress');
                cy.wrap($form).find('#last_name').clear().type('Auto');
                cy.wrap($form).find('#email').clear().type('cypressauto@gmail.com');
                selectOptionAndVerify('#formAddContactSelectResource-selectized','Marketing');
                selectOptionAndVerify('#formAddContactSelectCountry-selectized','Afghanistan');
                selectOptionAndVerify('#formAddContactSelectIndustry-selectized','Healthcare');
                // cy.wrap($form).find('phone').clear().type('');
                // cy.wrap($form).find('linkedin').clear().type('');
                // cy.wrap($form).find('job').clear().type('');
                // cy.wrap($form).find('company').clear().type('');
                cy.wrap($form).find('#save-contact').click({force:true});
            });
            //Verify add thành công.
            cy.wait(2000);
            //Clear data test.
            cy.get(':nth-child(1) > #td_actions > .table__action > #td_delete').click({force:true});
            cy.get('#deleteContactModal > .modal-dialog > .modal-content').then(modal => {
                cy.wrap(modal).find('#confirm-delete-contact').click();
            })

        });

        it('Add new a list view', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.get('#listViewsDropdown').click();
            cy.get('.btn-add-view').click();
            cy.get('#form-list-view').should('be.visible').then($form => {
                cy.wrap($form).find('#list_name').type('Cypress test');
                selectOptionAndVerify('#formAddViewSelectResource-selectized','Marketing');
                cy.wrap($form).find('.btn-primary').click({force:true});
            })
            //Verify add thành công.
            //Clear data test.
            cy.get('#listViewsDropdown').click();
            cy.get('.list-view-dropdown-menu').then($dropdown => {
                cy.wrap($dropdown).find('#itemAction').first().click();
                cy.wrap($dropdown).find('span[class="delete"]').first().click();
                cy.get('button[type="button"]').contains('Yes, delete it!').click();
            })

        });
    });

    describe('Add new deal page', () => {
        it.only('Add new a deal', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'deals');
            cy.get('#btn-create-deal').click();
            cy.get('#form-deal').should('be.visible').then($form => {
                cy.wrap($form).find('#name').type('Cypress');
                cy.wrap($form).find('#formAddDealSelectContact-selectized').click().type('Vic Main 3').type('{enter}');
                cy.wrap($form).find('#formAddDealSelectWorkingModel-selectized').click().type('Project Based').type('{enter}');
                cy.wrap($form).find('#save-deal').click({force:true});
            });
            //Verify add thành công.
            // cy.wait(2000);
            // //Clear data test.
            // cy.get(':nth-child(1) > #td_actions > .table__action > #td_delete').click({force:true});
            // cy.get('#deleteContactModal > .modal-dialog > .modal-content').then(modal => {
            //     cy.wrap(modal).find('#confirm-delete-contact').click();
            // })  
        });

        it('Add new a list view', () => {
            
        });
    })

    describe('Add new task page', () => {
        it('Add new a task', () => {
            
        });
    })

    describe('Add new staff page', () => {
        it('Add new a staff', () => {
            
        });

        it('Add new a team', () => {
            
        });
    })

    describe('Add new KPIs page', () => {
        it('Add new a KPIs', () => {
            
        });

        it('Add new a Revenue KPIs', () => {
            
        });
    })

    describe('Add new Settings page', () => {
        it('Add new a industries', () => {
            
        });

        it('Add new a Tag', () => {
            
        });
    })
})