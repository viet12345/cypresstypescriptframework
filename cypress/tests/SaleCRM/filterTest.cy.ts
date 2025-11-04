import dayjs from 'dayjs';

function filterByCondition(filterInPage: 'Contacts' | 'Deals',
    filterBy: 'Lifecycle stage' | 'Tag' | 'Country' | 'Industry' | 'Created Date' | 'Close Date',
    filterInputElement: string,
    expectedText: string | [startDate:string, endDate:string]) {
    // Chọn điều kiện filter
    if (filterInPage === 'Contacts'){
        cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/contacts/*').as('getContacts');
        cy.visit(Cypress.env('SaleCRM_URL')+'contacts');
        cy.wait('@getContacts');
        if (filterBy === 'Created Date'){
            const [startDate, endDate] = expectedText;
            const start = startDate;
            const end = endDate;
            cy.get(filterInputElement).click();
            cy.get('.flatpickr-days').first().then($calendar => {
                cy.wrap($calendar).find(`span[aria-label="${start}"]`).first().click();
                cy.wrap($calendar).find(`span[aria-label="${end}"]`).first().click();
            });
        }
        else {
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
        }
        cy.wait('@getContacts', {timeout: 10000});
        //Xác thực kết quả filter
        verifyTableDataWithFilter(filterBy,expectedText);
    }

    if (filterInPage === 'Deals'){
        // Chọn điều kiện filter
        cy.intercept('GET', Cypress.env('SaleCRM_URL')+'/deals/*').as('getDeals');
        cy.visit(Cypress.env('SaleCRM_URL')+'deals');
        cy.wait('@getDeals');
        if (filterBy === 'Close Date'){
           const [startDate, endDate] = expectedText;
            const start = startDate;
            const end = endDate;
            cy.get(filterInputElement).click();
            cy.get('.flatpickr-days').eq(2).then($calendar => {
                cy.wrap($calendar).find(`span[aria-label="${start}"]`).first().click();
                cy.wrap($calendar).find(`span[aria-label="${end}"]`).first().click();
            }); 
        }
        cy.wait('@getDeals', {timeout: 10000});
        //Xác thực kết quả filter
        verifyKanbanDataWithFilter(filterBy,expectedText);
    }
}

function verifyKanbanDataWithFilter(filterBy:string, expectedText: string | [startDate:string, endDate:string]) {
    if (filterBy === 'Close Date'){
        cy.get('#quantityActiveDeal').first().then($numberOfDeal => {
            if ($numberOfDeal.text().trim() === '0 Active Deals'){
                cy.log('Không có kết quả.')
            }
            else{
                const [startDate, endDate] = expectedText;
                const start = dayjs(startDate).format("DD/MM/YYYY");
                const end = dayjs(endDate).format("DD/MM/YYYY");
                cy.get('.deal__item--detail').each(($deal) => {
                    cy.wrap($deal).find('.item__close-date .value').invoke('text').then((text) => {
                        cy.log(start)
                        cy.log(end)
                        cy.log(text)
                        expect(text >= start).to.be.true;
                        expect(text <= end).to.be.true;
                    })
                })
            }
        })
    }
}

function verifyTableDataWithFilter(filterBy:string,expectedText: string | [startDate:string, endDate:string]) {
      cy.get('#dataContactBind').then(($tableList) => {
        let noDataRow = $tableList.find('.no-data').length;
        console.log(noDataRow);
        if (noDataRow === 0) {
            cy.log('Tìm thấy contact(s) phù hợp.');
            if (Array.isArray(expectedText)) {
                const [startDate, endDate] = expectedText;
                const start = dayjs(startDate).format("DD/MM/YYYY");
                const end = dayjs(endDate).format("DD/MM/YYYY");
        
                cy.wrap($tableList).find('tr').then(($row) => {
                    cy.wrap($row).find('.table__contact--created-date').invoke('text').then((text) => {
                        // So sánh cellDate nằm trong khoảng
                        expect(text >= start).to.be.true;
                        expect(text <= end).to.be.true;
                    });
                });
            }
            else {
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
                    cy.wait(2000);
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
        }
        else {
            cy.log('No contacts found. Sửa lại data test hoặc kiểm tra lại chức năng search/filter.');
        }
    });  
}


function addTestDealByAPI(dealName:string) {
    const today = new Date().toLocaleDateString('vi-VN');
    const randomNum = Math.floor(Math.random() * 100) + 1;
    const $dealName = dealName + today + randomNum;
    const body = `name=${$dealName}&stage_id=1&contact_id=49527&closed_date=2025-11-04&amount=&priority=&type_id=&working_model=1&industry_id=`;
    

    cy.request({
        method: 'POST',
        url: `${Cypress.env('SaleCRM_URL')}deals/store`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-CSRF-TOKEN': '8ZxQbalXd0Ga1vlzUSEz58VxqUyHfIXsrr9aLPFs',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: body,
        }).then((response:any) => {
            expect(response.status).to.eq(200);
        })
}


const CONTACT_FILTER_OPTIONS_STAGE = [
    { checkboxSelector: '#checkbox0', expectedStage: 'Lead' },
    { checkboxSelector: '#checkbox1', expectedStage: 'Marketing Qualified' },
    { checkboxSelector: '#checkbox2', expectedStage: 'Sales Qualified' },
    { checkboxSelector: '#checkbox3', expectedStage: 'Customer' },
]
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const today_1 = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

describe('Kiểm tra chức năng filters', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    before('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    describe('Kiểm tra chức năng filter Contact page', () => {
        describe('Filter theo Lifecycle stages', () => {
            Object.values(CONTACT_FILTER_OPTIONS_STAGE).forEach(({ checkboxSelector, expectedStage }) => {
                it(`Kiểm tra filter ${expectedStage} Contact`, () => {
                    //Mở page có chứa filter function
                    filterByCondition('Contacts','Lifecycle stage',checkboxSelector, expectedStage);
                });
            });
        });
    
        it('Filter theo Tag', () => {
            filterByCondition('Contacts','Tag','div[class="tag"]', 'v_vip');
        });
    
        it('Filter theo Country', () => {
            filterByCondition('Contacts','Country','div[class="country"]', 'India');
        });
    
        it('Filter theo Industry', () => {
            filterByCondition('Contacts','Industry','div[class="industry"]', 'Healthcare');
        });
    
        it('Filter theo Created date', () => {
            filterByCondition('Contacts','Created Date','#createdDateFilter', ['October 29, 2025','October 29, 2025']);
        });
    } )

    describe.only('Kiểm tra chức năng filter Deal page', () => {
        it('Filter theo Closed date', () => {
            cy.visit(Cypress.env('SaleCRM_URL')+'deals');
            addTestDealByAPI('Test deal auto cypress');
            filterByCondition('Deals','Close Date','.filter__close-date',[today_1,today_1]);
        });
    })
})