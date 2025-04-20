import { PAGE_URLS } from '../../fixtures/url'
import { commonPage } from '../../pages/index.page'

describe('my first demo', () => {
    before('redirect to the login page of demo guru', () => {
        cy.visit(PAGE_URLS.LOGIN_PAGE);
    })

    describe('login with valid credentials', () => {

        it('verify user is able to login with valid credentials', () => {
            commonPage.passwordInputBox().should('be.visible');
            commonPage.usernameInputBox().should('be.visible');
        })
    })
})