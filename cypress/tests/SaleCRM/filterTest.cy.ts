
function filterWithStage(filterBy: 'Lifecycle stage' | 'Tag' | 'Country' | 'Industry',
    filterInputElement: string,
    expectedText: string) {
    // Chọn điều kiện filter
    cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
    cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
    cy.wait('@getContacts');
    cy.get('.btn-more-filter').click();
    if (filterBy === 'Lifecycle stage') {
        cy.get(filterInputElement).check();
    }
    if (filterBy === 'Tag') {
        cy.get(filterInputElement).then($tags => {
            cy.wrap($tags).find('.selectize-input').click().type(expectedText).type('{enter}');
        });
    }
    if (filterBy === 'Country') {
        cy.get(filterInputElement).then($country => {
            cy.wrap($country).find('.selectize-input').click().type(expectedText).type('{enter}');
        });
    }
    if (filterBy === 'Industry') {
        cy.get(filterInputElement).then($industry => {
            cy.wrap($industry).find('.selectize-input').click().type(expectedText).type('{enter}');
        });
    }
    cy.get('.btn-apply').click({force: true});
    cy.wait('@getContacts', {timeout: 10000});
    
    //Xác thực kết quả filter
    verifyTableDataWithFilter(filterBy,expectedText);
}

function verifyTableDataWithFilter(filterBy:string,expectedText: string) {
      cy.get('#dataContactBind').then(($tableList) => {
        let noDataRow = $tableList.find('.no-data').length;
        console.log(noDataRow);
        if (noDataRow === 0) {
            cy.log('Tìm thấy contact(s) phù hợp.');
            if (filterBy === 'Lifecycle stage'){
                cy.wrap($tableList).find('tr').each($row => {
                    cy.wrap($row).find('.table__contact--stage').then($stageCell => {
                        const stageText = $stageCell.text().trim();
                        expect(stageText).to.contain(expectedText);
                    });
                });
            }
            if (filterBy === 'Tag'){
                cy.wrap($tableList).find('tr').each($row => {
                    cy.wrap($row).find('.table__contact--tag').then($tagCell => {
                        cy.wrap($tagCell).get('.contact__tag').then($tags => {
                            const tags = Array.from($tags).some(tag => tag.innerText.trim() === expectedText);
                            if (tags) {
                                cy.log(`Found '${expectedText}' in visible tags`);
                                expect(tags).to.be.true;
                            }
                            else {
                                cy.get('.number_more_tag').trigger('mouseover');
                                cy.get('.tooltip-inner').then(($tooltipHtml) => {
                                    expect($tooltipHtml).to.contain(expectedText);
                                });
                            }
                        });
                    });
                });
            }
            if (filterBy === 'Country'){
                cy.wrap($tableList).find('tr').each($row => {
                    cy.wrap($row).find('.table__contact--address').then($cell => {
                        const text = $cell.text().trim();
                        expect(text).to.contain(expectedText);
                    });
                });
            }
            if (filterBy === 'Industry'){
                cy.wrap($tableList).find('tr').each($row => {
                    cy.wrap($row).find('.table__contact--industry').then($stageCell => {
                        const stageText = $stageCell.text().trim();
                        expect(stageText).to.contain(expectedText);
                    });
                });
            }
        }
        else {
            cy.log('No contacts found. Sửa lại data test hoặc kiểm tra lại chức năng search/filter.');
        }
    });  
}

const CONTACT_FILTER_OPTIONS_STAGE = [
    { checkboxSelector: '#checkbox0', expectedStage: 'Lead' },
    { checkboxSelector: '#checkbox1', expectedStage: 'Marketing Qualified' },
    { checkboxSelector: '#checkbox2', expectedStage: 'Sales Qualified' },
    { checkboxSelector: '#checkbox3', expectedStage: 'Customer' },
]


describe('Kiểm tra chức năng filter', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    describe.only('Filter theo Lifecycle stage', () => {
        Object.values(CONTACT_FILTER_OPTIONS_STAGE).forEach(({ checkboxSelector, expectedStage }) => {
            it(`Kiểm tra filter ${expectedStage} Contact`, () => {
                //Mở page có chứa filter function
                filterWithStage('Lifecycle stage',checkboxSelector, expectedStage);
            });
        });
    });

    it('Filter theo Tag', () => {
        filterWithStage('Tag','div[class="tag"]', 'v_vip');
    });

    it('Filter theo Country', () => {
        filterWithStage('Country','div[class="country"]', 'India');
    });

    it('Filter theo Industry', () => {
        filterWithStage('Industry','div[class="industry"]', 'Healthcare');
    });
})