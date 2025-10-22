


function loginByRole(username: string, password: string, acc_name: string) {
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
}

//Chưa dùng được
// function checkBtnManageMyBookingVisibilityByQuoteType(ROLE_PERMISSIONS_RESPONSE:string, MY_QUOTES_RESPONSE:string) {
//     //Mock role permission API response
//     cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
//         statusCode: 200,
//         body: ROLE_PERMISSIONS_RESPONSE,
//     }).as('getRolePermission');

//     //Mock API response my quotes
//     cy.intercept('POST', GET_MY_QUOTES_API_ENDPOINT,{
//         statusCode: 200,
//         body: MY_QUOTES_RESPONSE,
//     }).as('getQuotes');

//     cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes');
//     cy.wait('@getRolePermission');
//     cy.wait('@getQuotes');
//     cy.get('button[aria-label="MANAGE MY BOOKING"]').should('be.visible').click();
// }

const GET_ROLE_PERMISSION_API_ENDPOINT:string = Cypress.env('GQT_API_dev') + 'gqt-admin/api/decentralization/role-permission/*';
const GET_MY_QUOTES_API_ENDPOINT:string = Cypress.env('GQT_API_dev') + 'gqt-quote/api/quotes/my-quotes?dept=*';


describe('Kiểm tra Package Quote data', () => {
    //Mock data
    const ROLE_PERMISSIONS = require('../../fixtures/GQT/getRolePermission.json');
    const MY_QUOTES = require('../../fixtures/GQT/getQuotes.json');

    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps' , () => {
        cy.clearSession();
        cy.reload();
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
        loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Lorelei');
        cy.wait(10000);
    });

    describe.only('Kiểm tra với Admin role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        it.only(`Config ON với quoteType HOTEL_ONLY`, () => {
            cy.log(ROLE_PERMISSIONS.ADMIN_ROLE);
            //Mock role permission API response
            cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
                statusCode: 200,
                body: ROLE_PERMISSIONS.ADMIN_ROLE.CONFIG_view_manage_my_booking_ON,
            }).as('getRolePermission_1');

            //Mock API response my quotes
            cy.intercept('POST', GET_MY_QUOTES_API_ENDPOINT,{
                statusCode: 200,
                body: MY_QUOTES.validQuotes.HOTEL_ONLY,
            }).as('getQuotes_1');

            cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes');
            cy.wait('@getRolePermission_1');
            cy.wait('@getQuotes_1');
            cy.get('button[aria-label="MANAGE MY BOOKING"]').scrollIntoView().should('be.visible');
        });

        it(`Config ON với quoteType PACKAGE`, () => {
            //Mock role permission API response
            cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
                statusCode: 200,
                body: ROLE_PERMISSIONS['ADMIN_ROLE']['CONFIG_view_manage_my_booking_ON'],
            }).as('getRolePermission_2');

            //Mock API response my quotes
            cy.intercept('POST', GET_MY_QUOTES_API_ENDPOINT,{
                statusCode: 200,
                body: MY_QUOTES.validQuotes.PACKAGE,
            }).as('getQuotes_2');

            cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes');
            cy.wait('@getRolePermission_2');
            cy.wait('@getQuotes_2');
            cy.get('button[aria-label="MANAGE MY BOOKING"]').scrollIntoView().should('be.visible');
        });

        it(`Config ON với quoteType AIR_ONLY`, () => {
            //Mock role permission API response
            cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
                statusCode: 200,
                body: ROLE_PERMISSIONS['ADMIN_ROLE']['CONFIG_view_manage_my_booking_ON'],
            }).as('getRolePermission_3');

            //Mock API response my quotes
            cy.intercept('POST', GET_MY_QUOTES_API_ENDPOINT,{
                statusCode: 200,
                body: MY_QUOTES.validQuotes.AIR_ONLY,
            }).as('getQuotes_3');

            cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes');
            cy.wait('@getRolePermission_3');
            cy.wait('@getQuotes_3');
            cy.get('button[aria-label="MANAGE MY BOOKING"]').scrollIntoView().should('be.visible');
        });

        // it('Config OFF ', () => {
        //     cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
        //         statusCode: 200,
        //         body: ROLE_PERMISSIONS['ADMIN_ROLE']['CONFIG.view_manage_my_booking.OFF'],
        //     }).as('getRolePermission');
        //     cy.intercept('POST', GET_MY_QUOTES_API_ENDPOINT).as('getQuotes');
        //     cy.visit(Cypress.env('GQT_URL_dev')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes');
        //     cy.wait('@getRolePermission');
        //     cy.wait('@getQuotes');
        //     cy.log('success 2');
        // });

    });

    describe('Kiểm tra với SUP role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        it('test', () => {
            cy.intercept('POST', '**/quotes/getQuotes').as('getQuotes');
            cy.visit(Cypress.env('GQT_URL')+'i-78jbjg98738bjbbcvzbkjbuibuy.html#/external/myquotes')
            cy.log('success');
        });
    });
})