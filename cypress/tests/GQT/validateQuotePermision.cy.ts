function loginByRole(username: string, password: string, role_name: string) {
    cy.visit(Cypress.env('GQT_URL')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/pages/empty');
    cy.get('.ml-2').should('be.visible').click();
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#submit-user').click();
    cy.get('.p-select-label').click();
    cy.get('.p-select-list').should('be.visible').within(() => {
        cy.get(`[aria-label="${role_name}"]`).click();
    });
    cy.get('#submit-user').click({ force: true });
}

describe('Kiểm tra Package Quote data', () => {
    //Mock data
    const MY_QUOTES = [];
        

    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps' , () => {
        cy.clearSession();
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
        loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Lorelei');
    });

    describe('Kiểm tra khi config view_manage_my_booking = ON => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        it('test', () => {
            cy.intercept('POST', '**/quotes/getQuotes').as('getQuotes');
            cy.visit(Cypress.env('GQT_URL')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes')
            cy.log('success');
        });
    });

    describe('Kiểm tra khi config view_manage_my_booking = OFF => Với mọi quote_type và quote_status đều cần disable button MANAGE MY BOOKING ', () => {
        it('test', () => {
            cy.intercept('POST', '**/quotes/getQuotes').as('getQuotes');
            cy.visit(Cypress.env('GQT_URL')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes')
            cy.log('success');
        });
    });
})