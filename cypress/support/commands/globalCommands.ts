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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6Ik9tdWZ1RFY1anBCTm9tcXZ2eGVVUUE9PSIsInZhbHVlIjoiMnpYa0ExWjV0VzBkSkIxSkZ6b3hSNEJ5WHZwWDhPcmVSVS9nMzBERFFKWEc1VmNVOEZBZk10UFJwUDNqQWkyRURMdGI2a0JoOHBOOW01UUs1RHNodktWMExYcG03T3h3WlR5aU1CaC90UkZKNDhhVEo1aGh0TTJrWXVvSnpnK1YiLCJtYWMiOiJkY2Y0MDlhYzdiMWU3YzhmYTczMjE1YjFkZTEzMDdiNDIyMDMzMTJmOWMzYzc3Y2Q3NjUzOTk3MDZjMDVmYzliIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6ImNlUmFIanlXZnpHM1JnYnduVDUvZ1E9PSIsInZhbHVlIjoiMGUzN2RkUVVBbGUyZXAzcDRhQUNIQWxrbXZTeXJhcW5EOWNmR1VyUjE3c3BSdUF0ei9rclhlVzZUbXNISm5EZWFlR3FuMEgzQlhxY0tkSlhrTy8vS3gxWndsNU84VzhxekZWYkdWRnF2R0JhdXJwUHo0TjZicW1LN09vSTZYcy8iLCJtYWMiOiI3ZGVkZThiMTU0ZjgzYjRhOWEyNDM4ZTVlZGZmZWVlN2E5NWQ1NjZmYTc0NTAyNTYzYTI1ZGVlZmEzMjVjNzJhIiwidGFnIjoiIn0%3D');
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
        .trigger('pointerup', { force: true })
    });
  });
});

