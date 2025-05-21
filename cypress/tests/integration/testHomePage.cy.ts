import { ADMIN_URLS, GUEST_MODE_URLS, LOGGED_IN_URLS, PAGE_URLS } from '../../fixtures/urls';
import { SUB_USER, VALID_USER } from '../../fixtures/users';
import { homePage } from '../../support/pages/HomePage';

describe('Home Page Test', () => {

    //Kiểm tra các liên kết nội bộ (Internal Links) có hoạt động đúng không.
    //Chia ra 2 loại link cần authen và không authen, đảm bảo các link đều hiển thị với nội dung expected

    describe('Verify guest mode valid urls', () => {
        Object.entries(GUEST_MODE_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name} page in guest mode`, () => {
                cy.visit(url);
                cy.verifyUrl(url);
                cy.contains(site_name).should('be.visible');
            })
        })
    })

    describe('Verify guest mode invalid urls', () => {
        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name} page in guest mode`, () => {
                homePage.visit(url);
                cy.verifyUrl(PAGE_URLS.SIGNIN_PAGE);
                cy.contains('Sign in').should('be.visible');
            })
        })
    })

    describe('Verify logged in mode valid urls', () => {

        beforeEach('redirect to the signin page by api', () => {
            cy.signinByApi(VALID_USER.USER, VALID_USER.PASSWORD);
        })

        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name}`, () => {
                homePage.visit(url);
                cy.verifyUrl(url);
            })
        })
    })

    // This case is used to verify home page will be opened when navigate to guest mode url after signin
    describe('Verify logged in mode invalid urls - guest mode url', () => {

        beforeEach('redirect to the signin page by api', () => {
            cy.signinByApi(VALID_USER.USER, VALID_USER.PASSWORD);
        })


        Object.entries(GUEST_MODE_URLS).forEach(([site_name, url]) => {
            it(`Verify home page is opened when navigate to guest mode url of ${site_name}`, () => {
                homePage.visit(url);
                cy.verifyUrl('');
            })
        })
    })

    // This case is to test if there are site that cannot access by sub-user (system don't have this case)
    describe('Verify logged in mode invalid urls - no permission', () => {

        beforeEach('redirect to the signin page by api', () => {
            cy.signinByApi(SUB_USER.USER, SUB_USER.PASSWORD);
        })

        Object.entries(ADMIN_URLS).forEach(([site_name, url]) => {
            it(`Non-admin user cannot access admin ${site_name} endpoint (stubbed 403)`, () => {
                const apiUrl = Cypress.env('apiUrl') as string;
                cy.intercept(
                    'GET',
                    `${apiUrl}/admin/data`,
                    { statusCode: 403, body: { message: 'Forbidden' } }
                ).as('getAdminData');

                cy.visit(url);
                cy.wait('@getAdminData');
                cy.contains('403').should('be.visible');
            });
        })
    })

    describe('Back action from browser button test', () => {

        beforeEach('redirect to the signin page by api', () => {
            cy.signinByApi(VALID_USER.USER, VALID_USER.PASSWORD);
        })

        Object.entries(homePage.tabNames).forEach(([tab_name, tab]) => {
            it(`Verify back action from ${tab_name} tab`, () => {
                homePage.switchTab(tab);
                cy.backActionFromBrowser();
                cy.verifyUrl(PAGE_URLS.HOMEPAGE);
            })
        })
    })
})