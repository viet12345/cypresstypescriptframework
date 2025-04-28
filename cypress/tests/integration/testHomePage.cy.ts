import { HOME_PAGE_URLS } from '../../fixtures/urls';
import { VALID_USER } from '../../fixtures/users';

describe('Home Page Test', () => {
    before('redirect to the login page of demo guru', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
    })

    describe('Navigation test', () => {
        Object.entries(HOME_PAGE_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name}`, () => {
                cy.visit(url);
                cy.verifyUrl(url);
            })
        })
    })
})