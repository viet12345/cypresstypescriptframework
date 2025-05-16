import { GUEST_MODE_URLS, LOGGED_IN_URLS, PAGE_URLS } from '../../fixtures/urls';
import { VALID_USER } from '../../fixtures/users';
import { homePage } from '../../support/pages/index.page';

describe('Home Page Test', () => {

    //Kiểm tra các liên kết nội bộ (Internal Links) có hoạt động đúng không.
    //Chia ra 2 loại link cần authen và không authen, đảm bảo các link đều hiển thị với nội dung expected
    
    // Verify guest mode valid urls
    describe('Verify guest mode valid urls', () => {
        Object.entries(GUEST_MODE_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name} page in guest mode`, () => {
                cy.visit(url);
                cy.verifyUrl(url);
                cy.contains(site_name).should('be.visible');
            })
        })
    })
    
    // Verify guest mode invalid urls
    describe('Verify guest mode invalid urls', () => {
        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name} page in guest mode`, () => {
                cy.visit(url);
                cy.wait(1000);
                cy.verifyUrl(PAGE_URLS.SIGNIN_PAGE);
                cy.contains('Sign in').should('be.visible');
            })
        })
    })

    // Verify logged in mode valid urls
    describe('Verify logged in mode valid urls', () => {
    
        beforeEach('redirect to the login page of demo guru', () => {
            cy.loginByApi();
        })

        Object.entries(LOGGED_IN_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name}`, () => {
                cy.visit(url);
                cy.wait(1000);
                cy.verifyUrl(url);
            })
        })
    })

    // Verify logged in mode invalid urls
    describe('Verify logged in mode invalid urls', () => {
    
        beforeEach('redirect to the login page of demo guru', () => {
            cy.loginByApi();
        })

        Object.entries(GUEST_MODE_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name}`, () => {
                cy.visit(url);
                cy.wait(1000);
                cy.verifyUrl('');
            })
        })
    })

    describe('Back action from browser button test', () => {
        Object.entries(homePage.tabNames).forEach(([tab_name, tab]) => {
            it(`Verify back action from ${tab_name} tab`, () => {
                homePage.switchTab(tab);
                cy.backActionFromBrowser();
                cy.verifyUrl(PAGE_URLS.HOMEPAGE);
            })
        })
    })
})