import dayjs from 'dayjs'

function verifySorting(dataType:'alphabet' | 'number' | 'date', orderBy:'asc'|'desc', sortColumn:string, tableCell:string) {
    if (dataType==='alphabet'){
        cy.get(sortColumn).should('have.attr', 'data-sort-type', `${orderBy}`).then(() => {
            cy.get(`#dataContactBind ${tableCell}`).then($cells => {
                const values = [...$cells].map(c => c.innerText.trim() || null);
                const sorted = [...values].sort((a:any, b:any) => a.localeCompare(b, 'vi', { sensitivity: 'base' }));
                expect(values).to.deep.eq(sorted);
            })
        });
    }

    if (dataType==='date'){
        cy.get(sortColumn).should('have.attr', 'data-sort-type', `${orderBy}`).then(() => {
            cy.get(`#dataContactBind ${tableCell}`).then($cells => {
                const values = [...$cells].map(c => c.innerText.trim() || null);
                if (orderBy === 'desc'){
                    const sort = [...values].sort((a, b) => dayjs(b, 'DD/MM/YYYY').valueOf() - dayjs(a, 'DD/MM/YYYY').valueOf());
                    expect(values).to.deep.equal(sort);
                } else {
                    const sort = [...values].sort((a, b) => dayjs(a, 'DD/MM/YYYY').valueOf() - dayjs(b, 'DD/MM/YYYY').valueOf());
                    expect(values).to.deep.equal(sort);
                }
            })
        });
    }

    if (dataType==='number'){
        cy.get(sortColumn).should('have.attr', 'data-sort-type', `${orderBy}`).then(() => {
            cy.get(`${tableCell}`).then($cells => {
                const values = [...$cells].map(c => c.innerText.trim() || null);
                const numericValues = values.map(v => v ? Number(v) : null);
                if (orderBy === 'desc'){
                    const sorted = [...numericValues].sort((a, b) => (b ?? -Infinity) - (a ?? -Infinity))
                    expect(numericValues).to.deep.eq(sorted);
                } else {
                    const sorted = [...numericValues].sort((a, b) => (a ?? -Infinity) - (b ?? -Infinity))
                    expect(numericValues).to.deep.eq(sorted);
                }
            })
        });
    }
}

//Khai báo các biến config/setup data.
const Role = Cypress.env('Role');


describe('Kiểm tra chức năng sorting', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })
    if (Role === 'Admin'){
        describe('Sorting Kpis-point page', () => {
            it('test số giảm dần', () => {
                cy.visit(Cypress.env('SaleCRM_URL')+'kpis');
                cy.get('th').contains('Monthly KPI goal').click();
                verifySorting('number','desc','span[id="monthly_kpi_goal"]','[class^="goal-kpi-"]');
            });

            it('test số tăng dần', () => {
                cy.visit(Cypress.env('SaleCRM_URL')+'kpis');
                cy.get('th').contains('Monthly KPI goal').click();
                cy.get('th').contains('Monthly KPI goal').click();
                verifySorting('number','asc','span[id="monthly_kpi_goal"]','[class^="goal-kpi-"]');
            });
        })
    }

    //Chỉ hoạt động với acc Staff role.
    describe('Sorting Contact page', () => {

        it('test kí tự giảm dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts');
            cy.get('th').contains('Lifecycle stage').click();
            cy.wait('@getContacts', {timeout:10000});
            verifySorting('alphabet','desc','span[id="sort_stage_id"]','.table__contact--stage');
        });

        it('test kí tự tăng dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts');
            cy.get('th').contains('Lifecycle stage').click();
            cy.wait('@getContacts', {timeout:10000});
            cy.get('th').contains('Lifecycle stage').click();
            cy.wait('@getContacts', {timeout:10000});
            verifySorting('alphabet','asc','span[id="sort_stage_id"]','.table__contact--stage');
        });

        it('test ngày giảm dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts',{timeout:10000});
            verifySorting('date','desc','span[id="sort_created_at"]','.table__contact--created-date');
        });

        it('test ngày tăng dần', () => {
            cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
            cy.wait('@getContacts',{timeout:10000});
            cy.get('th').contains('Created date').click();
            cy.wait('@getContacts', {timeout:10000});
            verifySorting('date','asc','span[id="sort_created_at"]','.table__contact--created-date');
        });
    })
})