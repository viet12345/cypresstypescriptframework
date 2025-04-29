import { homePage } from '../../pages/index.page'
import { form } from '../../components/Form'
import { VALID_USER } from '../../fixtures/users';
import { PAGE_URLS } from '../../fixtures/urls';


describe('Validation input field test', () => {
        beforeEach('Login and redirect to My Account page', () => {
            cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
            cy.visit(PAGE_URLS.MY_ACCOUNT);
        })
    it.only(`Verify invalid email fields`, () => {
    })
})