function loginByRole(username: string, password: string, acc_name: string) {
    //Mock role permission API response
    cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
        statusCode: 200,
        body: ROLE_PERMISSIONS.ADMIN_ROLE.CONFIG_view_manage_my_booking_ON,
    }).as('getRolePermission');

    cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/pages/empty');
    cy.get('.ml-2').should('be.visible').click();
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#submit-user').click();
    cy.get('.p-select-label').click();
    cy.get('.p-select-list').should('be.visible').within(() => {
        cy.get(`[aria-label="${acc_name}"]`).click();
    });
    cy.get('#submit-user').click({ force: true });
    cy.wait('@getRolePermission');
}


function checkBtnManageMyBookingVisibilityByQuoteType(MY_QUOTES_RESPONSE:string, buttonVisible: boolean = true) {
    //Mock API response my quotes
    cy.intercept('POST', GET_MY_QUOTES_API_ENDPOINT,{
        statusCode: 200,
        body: MY_QUOTES_RESPONSE,
    }).as('getQuotes');

    cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes');
    cy.wait('@getQuotes', { timeout: 20000 });
    if (!buttonVisible) {
        cy.get('body').find('button[aria-label="MANAGE MY BOOKING"]').should('not.exist');
    } else
    cy.get('button[aria-label="MANAGE MY BOOKING"]').scrollIntoView().should('be.visible');
}



//Mock data files
const ROLE_PERMISSIONS = require('../../fixtures/GQT/getRolePermission.json');
const MY_QUOTES = require('../../fixtures/GQT/getQuotes.json');

const GET_ROLE_PERMISSION_API_ENDPOINT:string = Cypress.env('GQT_API_dev') + 'gqt-admin/api/decentralization/role-permission/*';
const GET_MY_QUOTES_API_ENDPOINT:string = Cypress.env('GQT_API_dev') + 'gqt-quote/api/quotes/my-quotes?dept=*';


describe('Kiểm tra hiển thị MANAGE MY BOOKING button khi config ON', () => {

    describe('Kiểm tra với Admin role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Lorelei');
        });

        //Test cases
        it(`Config ON với quoteType HOTEL_ONLY`, () => {
            checkBtnManageMyBookingVisibilityByQuoteType(MY_QUOTES.validQuotes.HOTEL_ONLY);
        });

        it(`Config ON với quoteType PACKAGE`, () => {
            checkBtnManageMyBookingVisibilityByQuoteType(MY_QUOTES.validQuotes.PACKAGE);
        });

        it(`Config ON với quoteType AIR_ONLY`, () => {
            checkBtnManageMyBookingVisibilityByQuoteType(MY_QUOTES.validQuotes.AIR_ONLY);
        });

        it(`Config ON với quoteType AIR_ONLY`, () => {
            checkBtnManageMyBookingVisibilityByQuoteType(MY_QUOTES.invalidQuotes.MDT, false);
        });

        it(`Config ON với quoteType CRUISE`, () => {
            checkBtnManageMyBookingVisibilityByQuoteType(MY_QUOTES.invalidQuotes.CRUISE, false);
        });
    });

    describe.only('Kiểm tra với SUP role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Giovanna');
        });

        //Test cases
        it('test', () => {
            cy.intercept('POST', '**/quotes/getQuotes').as('getQuotes');
            cy.visit(Cypress.env('GQT_URL')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes')
            cy.log('success');
        });
    });
})