describe('Kiểm tra intergrated data', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        cy.clearSession();
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    describe('Kiểm tra data list', () => {
        it(`Kiểm tra data Contact`, () => {
            const CONTACT_LIST_API_ENDPOINT:string = Cypress.env('SaleCRM_URL') + 'contacts/get-all-contact-by-current-role';
            const MOCK_DATA_CONTACT_LIST:any = require('../../fixtures/SaleCRM/contactList.json');
            
            //Intercept API để chờ dữ liệu load xong (có thể mock dữ liệu nếu cần)
            cy.intercept('GET', CONTACT_LIST_API_ENDPOINT, {
                statusCode: 200,
                body: MOCK_DATA_CONTACT_LIST,
            }).as('getContacts');
            
            //Mở page list contact
            cy.visit(Cypress.env('SaleCRM_URL')+'contacts'); // Cập nhật đường dẫn nếu cần

            //Lấy dữ liệu từ API
            cy.wait('@getContacts').then((interception) => {
                const CONTACT_LIST:any[] = interception.response?.body.data.data.data;
                CONTACT_LIST.forEach((contact,index) => {
                    const FULL_NAME = contact.first_name + ' ' + contact.last_name;
                    const LIFE_CYCLE_STAGE = contact.stage.name;

                    //Kiểm tra dữ liệu với UI đang hiển thị
                    cy.get('#dataContactBind > tr').eq(index).within(() => {
                        cy.get('.table__contact--name').should('contain', FULL_NAME);
                        cy.get('.table__contact--stage').should('contain', LIFE_CYCLE_STAGE);
                    })
                });
            });
        })
    })  
})