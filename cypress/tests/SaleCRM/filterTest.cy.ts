function filterWithStage(stageCheckboxElement: string, expectedStageText: string) {
    // Chọn điều kiện filter
    cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
    cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
    cy.wait('@getContacts');
    cy.get('.btn-more-filter').click();
    cy.get(stageCheckboxElement).check();
    cy.get('.btn-apply').click();
    cy.wait('@getContacts');
    
    cy.get('#dataContactBind').then(($tableList) => {
        let noDataRow = $tableList.find('.no-data').length;
        console.log(noDataRow);
        if (noDataRow === 0) {
            cy.log('Tìm thấy contact(s) phù hợp.');
            cy.wrap($tableList).find('tr').each($row => {
                cy.wrap($row).find('.table__contact--stage').then($stageCell => {
                    const stageText = $stageCell.text().trim();
                    expect(stageText).to.contain(expectedStageText);
                });
            });
        }
        else {
            cy.log('No contacts found. Sửa lại data test hoặc kiểm tra lại chức năng filter.');
        }
    });
}


describe('Kiểm tra chức năng filter', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    it(`Kiểm tra filter Lead Contact`, () => {
        //Mở page có chứa filter function
        filterWithStage('#checkbox0', 'Lead');
    });

    it(`Kiểm tra filter Marketing Qualified Contact`, () => {
        filterWithStage('#checkbox1', 'Marketing Qualified');
    });

    it(`Kiểm tra filter Sales Qualified Contact`, () => {
        filterWithStage('#checkbox2', 'Sales Qualified');
    });

    it(`Kiểm tra filter Customer Contact`, () => {
        filterWithStage('#checkbox3', 'Customer');
    });
})