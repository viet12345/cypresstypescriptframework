Cypress.Commands.add('verifyUrl', (expectedPath: string) => {
    const expectedUrl = buildUrl(Cypress.config('baseUrl')!, expectedPath);
    cy.url().then((currentUrl) => {
        cy.log(`Verifying URL: Expected = ${expectedUrl}, Actual = ${currentUrl}`);
        expect(currentUrl).to.eq(expectedUrl);
    });
});

Cypress.Commands.add('clearSession', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.log('Session cleared.');
});

Cypress.Commands.add('backActionFromBrowser', () => {
    cy.go('back');
    cy.log('Navigated back using browser action.');
});

Cypress.Commands.add('saveLoginSession', () => {
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IkZvT1JnSGlhTk5iSUFhWTg1OCtZNHc9PSIsInZhbHVlIjoiUnVLblBtQ3RjYVhNWGMzQ0hzcGhQRlJVa1g1MWJvaGg2Q1VuRlNiVTBSMk40VkxjUnhRalorU0ovUTgyZVRCQ2FJRVJRTzh6TDlhQ3NLRmdkYUR0YmFEalZVUHdNSGlneFhWUFhzQ1E2WTZkQVdBbEtEZzdEbFdCTnRnRG50UW4iLCJtYWMiOiI5M2ZjNTIzZDY4NGI0ZGQ0ODczZjU3YThhZmIyNmIyYWQwZWU5MGY1NjlkMjViNWRmNTY3YTQwM2U3MjJkZDE1IiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6Inc1bFR1a3JDMWlGN3FDMDNQTHhrU0E9PSIsInZhbHVlIjoid1I2akR1NkJYV2E2cW8yVU8rdWhOYlFJekFzSlVhMUI5Z080SGRTZExvZncveGlkS0g3eDNGRFA3M05DMjcxdkR3dXJicHRZWW8rRlRVcHJ5ckZ2c2Z3ckxMd3o5Ri91NjNoZVVDNWxabGR1RGVHS0h5ZXQ4eExDUDJza0JUdksiLCJtYWMiOiJlNmFhNzkzMGNmNzZhNWEyZjIyMzg4NjQxNWVjYWNkMjBlMjI4OGNiZWVkODEyMWRjM2UyZTZiNzg2YjYyNmYzIiwidGFnIjoiIn0%3D');
});

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {

  cy.get(sourceSelector).then($source => {
    const dataTransfer = new DataTransfer();

    // Pointer down and drag start
    cy.wrap($source)
      .trigger('pointerdown', { button: 0 })
      .trigger('dragstart', { dataTransfer });

    // Move source over target
    cy.get(targetSelector).then($target => {
      cy.wrap($target)
        .trigger('pointerover')
        .trigger('dragover', { dataTransfer })
    });

    // Drop + dragend
    cy.get(targetSelector).then($target => {
      cy.wrap($target)
        .trigger('pointerup')
    });
  });
});

