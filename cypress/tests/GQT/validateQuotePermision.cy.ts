function loginByRole(username: string, password: string, acc_name: string, configureRolePermission: any) {
    //Mock role permission API response
    cy.intercept('GET', GET_ROLE_PERMISSION_API_ENDPOINT, {
        statusCode: 200,
        body: configureRolePermission,
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
    cy.wait('@getRolePermission', { timeout: 20000 });
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
const GET_MY_QUOTES_API_ENDPOINT:string = Cypress.env('GQT_API_dev') + 'gqt-quote/api/quotes/my-quotes?*';


describe('Kiểm tra hiển thị MANAGE MY BOOKING button khi config ON', () => {

    describe('Kiểm tra với ADMIN role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Lorelei', ROLE_PERMISSIONS.ADMIN_ROLE.CONFIG_view_manage_my_booking_ON);
        });

        //Test cases
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });

    describe('Kiểm tra với SUPERVISOR role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Giovanna', ROLE_PERMISSIONS.SUP_ROLE.CONFIG_view_manage_my_booking_ON);
        });

        //Test cases
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });

    describe('Kiểm tra với SUPPORT role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Angelique', ROLE_PERMISSIONS.SUPPORT_ROLE.CONFIG_view_manage_my_booking_ON);
        });

        //Test cases
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });

    describe('Kiểm tra với REVENUE role => Check quote_type và quote_status để show MANAGE MY BOOKING button', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Pina', ROLE_PERMISSIONS.REVENUE.CONFIG_view_manage_my_booking_ON);
        });

        //Test cases
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });
})



describe('Kiểm tra không hiển thị MANAGE MY BOOKING button khi config OFF', () => {
    describe('Kiểm tra với ADMIN role', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Lorelei', ROLE_PERMISSIONS.ADMIN_ROLE.CONFIG_view_manage_my_booking_OFF);
        });
        //Test case
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });

    describe('Kiểm tra với SUPERVISOR role', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Giovanna', ROLE_PERMISSIONS.SUP_ROLE.CONFIG_view_manage_my_booking_OFF);
        });
        //Test case
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });

    describe('Kiểm tra với SUPPORT role', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Angelique', ROLE_PERMISSIONS.SUPPORT_ROLE.CONFIG_view_manage_my_booking_OFF);
        });
        //Test case
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });

    describe('Kiểm tra với REVENUE role', () => {
        //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
        beforeEach('Authentication steps' , () => {
            cy.clearSession();
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
            loginByRole(Cypress.env('username_dev'), Cypress.env('password_dev'), 'Pina', ROLE_PERMISSIONS.REVENUE.CONFIG_view_manage_my_booking_OFF);
        });
        //Test case
        Object.entries(MY_QUOTES.validQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
        Object.entries(MY_QUOTES.invalidQuotes).forEach(([quoteType, value]:any) => {
            it(`Check với quoteType ${quoteType}`, () => {
                checkBtnManageMyBookingVisibilityByQuoteType(value, false);
            });
        });
    });
});