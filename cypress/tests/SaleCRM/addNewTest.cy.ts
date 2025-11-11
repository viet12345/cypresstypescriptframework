import dayjs from 'dayjs';

function selectOptionAndVerify(inputSelector: string, inputCase:string|any) {
    // Mở form
    // Chọn giá trị từ dropdown.
    cy.get(inputSelector).click().clear().type(inputCase).type('{enter}');
    cy.wait(2000);
    // cy.get(`.optgroup .option`).contains(inputCase).click();
}

function deleteTaskByID(id:string|undefined) {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('SaleCRM_URL')}tasks/${id}/delete`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-CSRF-TOKEN': Cypress.env('XCSRFTOKEN'),
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
}

function deleteStaffByID(id:string|undefined) {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('SaleCRM_URL')}staffs/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-CSRF-TOKEN': Cypress.env('XCSRFTOKEN'),
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
}

function deleteTeamByID(id:string|undefined) {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('SaleCRM_URL')}teams/${id}/delete`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-CSRF-TOKEN': Cypress.env('XCSRFTOKEN'),
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
}
const Role = Cypress.env('Role');
const Today = dayjs().format("MMMM DD, YYYY");

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
        it('Add new a deal', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'deals');
            cy.get('#btn-create-deal').click();
            cy.get('#form-deal').should('be.visible').then($form => {
                cy.wrap($form).find('#name').type('Cypress');
                cy.wrap($form).find('#formAddDealSelectContact-selectized').click().type('Vic Main');
                cy.get(`.option`).contains('Vic Main').should('be.visible').click();
                cy.wrap($form).get('#formAddDealSelectWorkingModel-selectized').click().type('Project Base');
                cy.get(`.option`).contains('Project Base').should('be.visible').click();
                cy.wrap($form).find('#save-deal').click({force:true});
            });
            //Verify add thành công.
            cy.wait(10000);
            // //Clear data test.
            cy.get('.deal__item--detail').first().then($item => {
                cy.wrap($item).find('#itemAction').first().click();
                cy.wrap($item).find('.btn-deal__delete').first().click();
                cy.get('.button__moving-deal--accept').eq(2).should('be.visible').click();
            })
        });

        it('Add new a list view', () => {
            
        });
    })

    describe('Add new task page', () => {
        it('Add new a task', () => {
            cy.intercept('GET',Cypress.env('SaleCRM_URL')+'tasks/get-all-task-by-current-role?*').as('GetTasks')
            cy.visit(Cypress.env('SaleCRM_URL')+'tasks');
            cy.get('.task-list__add-button').click();
            cy.get('#form-task-module').should('be.visible').then($form => {
                cy.wrap($form).find('#name').type('Cypress');
                cy.wrap($form).find('input[id="type_id-selectized"]').click();
                cy.get(`.option`).contains('Training').should('be.visible').click();
                cy.get('input[name="due_date"]').click();
                cy.get('.flatpickr-days').eq(3).within(() => {
                    cy.get(`span[aria-label="${Today}"]`).first().click({force:true});
                });
                cy.get('#save-form').click();
            })
            cy.wait('@GetTasks');
            //Clear data test.
            cy.get('button[data-bs-target="#deleteTaskModuleModal"]').first()
            .invoke('attr', 'data-delete-task-id').then($id => {
                const taskId = $id?.toString();
                console.log(taskId);
                deleteTaskByID(taskId);
            });

        });
    })

    describe('Add new staff page', () => {
        it.only('Add new a staff', () => {
            //Add staff
            cy.intercept('GET',Cypress.env('SaleCRM_URL')+'/staffs/search?*').as('GetStaffs');
            cy.intercept('GET',Cypress.env('SaleCRM_URL')+'/teams?*').as('GetKPIs');
            cy.visit(Cypress.env('SaleCRM_URL')+'staffs');
            cy.get('.add-staff').click();
            cy.get('#offcanvasStaff').should('be.visible').then($form => {
                selectOptionAndVerify('#user_id-selectized','Testers');
                selectOptionAndVerify('#role_id-selectized','STAFF');
                selectOptionAndVerify('#position-selectized','Sales');
                selectOptionAndVerify('#team_id-selectized','Product Development Team');
                cy.wrap($form).find('.btn-save-staff').click({force:true});
            });

            //Add KPIs
            cy.visit(Cypress.env('SaleCRM_URL')+'kpis');
            cy.get('#btn-form-configure-kpi').click();
            cy.get('#form-configure-kpi').should('be.visible').then($form => {
                selectOptionAndVerify('#selectizeFilterStaffInConfigure-selectized','Tester');
                cy.get('#selectizeFilterTimeFrame-selectized').click();
                cy.wrap($form).find('.selectize-dropdown-content .option').contains('2026').click({force:true});
                cy.wait(3000);
                cy.wrap($form).find('#month-configure-3').then($input => {
                    const isDisabled = $input.prop('disabled');
                    console.log(isDisabled);
                    if (!isDisabled)
                    {
                       cy.wrap($input).type('100');
                       cy.wrap($form).find('#save-deal').click();
                       cy.wait('@GetKPIs');
                    }
                })
            });

            //Clear data staff test.
            cy.visit(Cypress.env('SaleCRM_URL')+'staffs');
            cy.wait('@GetStaffs');
            cy.get('.btn-outline-danger').first()
            .invoke('attr', 'data-id').then($id => {
                const staffId = $id?.toString();
                console.log(staffId);
                deleteStaffByID(staffId);
            });
        });

        it('Add new a team', () => {
            cy.intercept('GET',Cypress.env('SaleCRM_URL')+'/teams?*').as('GetTeams');
            cy.visit(Cypress.env('SaleCRM_URL')+'teams');
            cy.get('#btn-create-team').click();
            cy.get('#form-team').should('be.visible').then($form => {
                cy.wrap($form).find('#name').clear().type('Cypress team');
                cy.wrap($form).find('#description').clear().type('Cypress team');
                cy.wrap($form).find('#save-team').click();
            });
            cy.wait('@GetTeams');
            //Clear data test.
            cy.get('.remove-item-btn').first()
            .invoke('attr', 'data-team-id').then($id => {
                const teamId = $id?.toString();
                console.log(teamId);
                deleteTeamByID(teamId);
            });
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