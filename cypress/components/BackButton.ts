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

}
export const backButton = new BackButton();