describe('Trim space in search', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    describe('Check trim space in search', () => {

        it(`Kiểm tra search Contact`, () => {
            //Mở page có chứa search function
            cy.visit('contacts'); // Cập nhật đường dẫn nếu cần

            // Nhập giá trị tìm kiếm với khoảng trắng ở đầu và cuối
            cy.intercept('GET', 'https://sales-crm.adamo.tech/contacts/*').as('searchRequest');
            cy.get('#searchInput').clear().type('   Chris T   ');
            cy.wait('@searchRequest');
            cy.wait('@searchRequest');
            // Click button search (nếu có)

            // Kiểm tra search thành công
            cy.get('#contactTable_wrapper').then(($tableList) => {
                let noDataRow = $tableList.find('.no-data').length;
                console.log(noDataRow);
                if (noDataRow === 0) {
                    cy.log('Tìm thấy contact(s) phù hợp.');
                    cy.get('.contact__name').first().then($el => {
                        const text = $el.text().trim();
                        expect(text).to.contain('Chris T');
                    });
                }
                else {
                    cy.log('No contacts found. Sửa lại data test hoặc kiểm tra lại chức năng search.');
                }
            });
        });
    })  
})