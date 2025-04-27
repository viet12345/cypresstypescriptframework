import { backButton } from '../../components/BackButton';
import { HOME_PAGE_URLS,PAGE_URLS } from '../../fixtures/urls';
import { VALID_USER } from '../../fixtures/users';
import { homePage,tabNames } from '../../pages/index.page'

describe('Home Page Test', () => {
    beforeEach('redirect to the login page of demo guru', () => {
        cy.login(VALID_USER.USER, VALID_USER.PASSWORD);
    })

    describe('Navigation test', () => {
        Object.entries(HOME_PAGE_URLS).forEach(([site_name, url]) => {
            it(`Verify url of ${site_name}`, () => {
                homePage.openUrl(url);
                homePage.verifyAvailableUrl(url);
            })
        })
    })

    describe('Back action from browser button test', () => {
        Object.entries(tabNames).forEach(([tab_name, tab]) => {
            it.only(`Verify back action from ${tab_name}`, () => {
                homePage.switchTab(tab);
                backButton.clickBackButtonFromBrowser();
                backButton.verifyBackAction(PAGE_URLS.HOMEPAGE);
            })
        })
    })
})