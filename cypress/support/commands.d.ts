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
       * Clear cookies and local storage to reset session.
       */
      clearSession(): Chainable<Subject>;
  
  
      // -------- Authentication / Login Page Commands --------
  
      /**
       * Perform login through UI elements.
       * @param username Username to login.
       * @param password Password to login.
       */
      loginViaUI(username: string, password: string): Chainable<Subject>;
  
  
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
  