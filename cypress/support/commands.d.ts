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

    /**
     * Save the current login session.
     */
    saveLoginSession(): Chainable<Subject>;


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

    
    // -------- Actions by using trigger() event, do not use the package --------
    /**
     * Perform drag and drop action.
     * @param sourceSelector Selector for the source element to drag.
     * @param targetSelector Selector for the target element to drop.
     * @param modalSelector Optional selector for a modal dialog to interact with after the drop.
     * @param options Additional options for the drag and drop action.
     */
    dragAndDropManual(sourceSelector: string, targetSelector: string, modalSelector?: string, options?: Partial<Cypress.Loggable>): Chainable<Subject>;


    // -------- Actions by using package @4tw/cypress-drag-drop--------
    /**
     * Perform drag and drop action.
     * @param targetSelector Selector for the target element to drop.
     * @param options Additional options for the drag and drop action.
     */
    dragAndDrop(targetSelector: any, options?: any): Chainable<Subject>;
  }
}

