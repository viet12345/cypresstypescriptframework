const contactsTab = "[data-test='nav-contacts-tab']";
const personalTab = "[data-test='nav-personal-tab']";

export class HomePage {
    // ---------- Element Getters ----------

    contactsTab() {
        return cy.get(contactsTab);
    }

    personalTab() {
        return cy.get(personalTab);
    }

    // ---------- Actions ----------

    switchContactsTab() {
        this.contactsTab().click();
    }

    switchPersonalTab() {
        this.personalTab().click(); 
    }

    // ---------- Verifications ----------
    verifyAllTheBackActionsInHome(){
    }

}

export const homePage = new HomePage();
