/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    // -------- Global Commands --------

    /**
     * Verify the current URL matches the expected path.
     * @param expectedPath The expected URL path after navigation.
     */
    verifyUrl(expectedPath: string): Chainable<Subject>;

    /**
      * Click the button Back from the browser.
      */
    backActionFromBrowser(): Chainable<Subject>;

    /**
     * Clear cookies and local storage to reset session.
     */
    clearSession(): Chainable<Subject>;


    // -------- Authentication / Signin Page Commands --------

    /**
     * Perform signin through UI elements.
     * @param username Username to signin.
     * @param password Password to signin.
     */
    signinViaUI(username: string, password: string): Chainable<Subject>;


    // -------- API Commands --------

    /**
     * Perform signin through API.
     * @param username Username to signin.
     * @param password Password to signin.
     */
    signinByApi(username: string, password: string): Chainable<Subject>;

    /**
     * Perform signin through API.
     */
    printLocalStorage(): Chainable<Subject>;


    // -------- Bank Accounts Page Commands --------

    /**
     * Perform create bank account through UI elements.
     * @param bankName Bank name to create.
     * @param routingNumber Routing Number to create.
     * @param accountNumber Account to create.
     */
    createBankAccount(bankName: string, routingNumber: string, accountNumber: string): Chainable<Subject>;


    // -------- Modal Component Commands --------

    /**
     * Open a modal dialog by clicking a specific element.
     * @param selector Selector for the element to open the modal.
     */
    openModal(selector: string): Chainable<Subject>;

    /**
     * Close the currently opened modal dialog.
     */
    closeModal(): Chainable<Subject>;


    // -------- Table Component Commands --------

    /**
     * Sort table data by a specific column.
     * @param columnName Name of the column to sort by.
     */
    sortTableByColumn(columnName: string): Chainable<Subject>;

    /**
     * Search text inside a table input search box.
     * @param text Text to search.
     */
    searchInTable(text: string): Chainable<Subject>;
  }
}

