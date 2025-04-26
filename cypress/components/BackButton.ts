const backButtonOnPage = '[data-cy=back-button]';

export class BackButton {
    
    // ---------- Element Getters ----------

    backButton() {
        return cy.get(backButtonOnPage);
    }

    // ---------- Actions ----------

    clickBackButton() {
        this.backButton().click();
    }
    
    clickBackButtonFromBrowser() {
        cy.go('back');
    }

    // ---------- Verifications ----------

    verifyBackAction(preUrl: string): void {
        cy.url().then((currentUrl) => {
            if (currentUrl === Cypress.config('baseUrl')+preUrl) {
                cy.log('Back action verified successfully.');
            } else {
                cy.log(`Back action failed. Expected: ${Cypress.config('baseUrl')+preUrl}, but got: ${currentUrl}`);
            }
        });
    }
}
export const backButton = new BackButton();