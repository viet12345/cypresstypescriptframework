
export class BackButton {
    
    // ---------- Element Getters ----------

    backButton(backButtOnPage:string) {
        return cy.get(backButtOnPage);
    }

    // ---------- Actions ----------

    clickBackButton(backButtOnPage:string) {
        this.backButton(backButtOnPage).click();
    }

    // ---------- Verifications ----------

}
export const backButton = new BackButton();