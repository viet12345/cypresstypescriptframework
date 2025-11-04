import dayjs from 'dayjs'
describe('Kiểm tra chức năng sorting', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    //Chỉ hoạt động với acc Staff role.
    describe.only('Sorting Contact page', () => {

        it('test kí tự giảm dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts');
            cy.get('th').contains('Lifecycle stage').click();
            cy.wait('@getContacts', {timeout:10000});
            cy.get('span[id="sort_stage_id"]').should('have.attr', 'data-sort-type', 'desc').then(() => {
                cy.get('#dataContactBind .table__contact--stage').then($cells => {
                    const values = [...$cells].map(c => c.innerText.trim() || null)
                    const sorted = [...values].sort((a:any, b:any) => a.localeCompare(b, 'vi', { sensitivity: 'base' }));
                    expect(values).to.deep.eq(sorted);
                })
            });
        });

        it('test kí tự tăng dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts');
            cy.get('th').contains('Lifecycle stage').click();
            cy.wait('@getContacts', {timeout:10000});
            cy.get('th').contains('Lifecycle stage').click();
            cy.wait('@getContacts', {timeout:10000});
            cy.get('span[id="sort_stage_id"]').should('have.attr', 'data-sort-type', 'asc').then(() => {
                cy.get('#dataContactBind .table__contact--stage').then($cells => {
                    const values = [...$cells].map(c => c.innerText.trim() || null)
                    const sorted = [...values].sort((a:any, b:any) => a.localeCompare(b, 'vi', { sensitivity: 'base' }));
                    expect(values).to.deep.eq(sorted);
                })
            });
        });

        it('test ngày giảm dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts',{timeout:10000});
            cy.get('span[id="sort_created_at"]').should('have.attr', 'data-sort-type', 'desc').then(() => {
                cy.get('#dataContactBind .table__contact--created-date').then($cells => {
                    const values = [...$cells].map(c => c.innerText.trim() || null);
                    const sort = [...values].sort((a, b) => dayjs(b, 'DD/MM/YYYY').valueOf() - dayjs(a, 'DD/MM/YYYY').valueOf());
                    expect(values).to.deep.equal(sort);
                })
            });
        });

        it('test ngày tăng dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts',{timeout:10000});
            cy.get('th').contains('Created date').click();
            cy.wait('@getContacts', {timeout:10000});
            cy.get('span[id="sort_created_at"]').should('have.attr', 'data-sort-type', 'asc').then(() => {
                cy.get('#dataContactBind .table__contact--created-date').then($cells => {
                    const values = [...$cells].map(c => c.innerText.trim() || null);
                    const sort = [...values].sort((a, b) => dayjs(a, 'DD/MM/YYYY').valueOf() - dayjs(b, 'DD/MM/YYYY').valueOf());
                    expect(values).to.deep.equal(sort);
                })
            });
        });
    })

    //Chỉ hoạt động với acc Admin role.
     describe('Sorting Kpis-point page', () => {
        it('test số giảm dần', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'kpis');
            cy.get('th').contains('Monthly KPI goal').click();
            cy.get('span[id="monthly_kpi_goal"]').should('have.attr', 'data-sort-type', 'desc').then(() => {
                cy.get('[class^="goal-kpi-"]').then($cells => {
                    const values = [...$cells].map(c => c.innerText.trim() || null)
                    const numericValues = values.map(v => v ? Number(v) : null)
                    const sorted = [...numericValues].sort((a, b) => (b ?? -Infinity) - (a ?? -Infinity))
                    expect(numericValues).to.deep.eq(sorted)
                })
            });
        });

        it('test số tăng dần', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'kpis');
            cy.get('th').contains('Monthly KPI goal').click();
            cy.get('th').contains('Monthly KPI goal').click();
            cy.get('span[id="monthly_kpi_goal"]').should('have.attr', 'data-sort-type', 'asc').then(() => {
                cy.get('[class^="goal-kpi-"]').then($cells => {
                    const values = [...$cells].map(c => c.innerText.trim() || null);
                    const numericValues = values.map(v => v ? Number(v) : null);
                    const sorted = [...numericValues].sort((a, b) => (a ?? -Infinity) - (b ?? -Infinity));
                    expect(numericValues).to.deep.eq(sorted);
                })
            });
        });
    })
})