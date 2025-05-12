
export class DataTable {
    
    // ---------- Element Getters ----------
    searchInput(inputSelector: string) {
        return cy.get(inputSelector);
    }

    // ---------- Actions ----------
    fillSearchInput(inputSelector: string, value: string | number) {
        this.searchInput(inputSelector).type(value.toString());
    }

    // ---------- Verifications ----------

}
export const dataTable = new DataTable();