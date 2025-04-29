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

    // ---------- Verifications ----------

}
export const backButton = new BackButton();