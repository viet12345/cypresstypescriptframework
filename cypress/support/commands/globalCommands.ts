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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6ImNXd3B6YW9CT0xldFdBdEdiZUpGOEE9PSIsInZhbHVlIjoiall5M3VRYVIzZjQvVDFNMXkxZ1NxTGdvTFRlYTdzeFdqbitkelA2ZFI3R0lHM2tySi9LRWxRUGtZQ2xsLzk0NlE1cWVQQmhnbytIdDJCNTl3dkVZY05CMlZkSHJFbmV3VjExL3kzQjFEd0EvVHVvNUF2dGJob3hhTWdaNnQvSEIiLCJtYWMiOiI2ZGYyNDBjZmNjNDRjOThkZDVmYmRiMWVmZWJmYzNhOGJlZjUwYWQyMTEyODc0ODcwYTQ4N2E2YTVjZTQ3YzgxIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6ImRVUEZvdlVPZmxqRTZtamZyTmRVc1E9PSIsInZhbHVlIjoiblg1dFZ3aUkyd25VSHJ1MHduT1Y3M1AyVGFwYzlNSXdwVEJreDYwT0NsbkRzTkxrT2huYTJvOUdmR2xiOHB6M3B3c3dpTzRDQUNrb2g2c002VHovUDJXMWtDc0NpNWRLMGREUDNiTC9wTWpJdTZpUXRZZWZpRzJLNk9vQzhJN0kiLCJtYWMiOiI1YTQzYmIwOTE4NDlmZTQxNmVhZDdlODEyMjE3NTU3N2RiY2M3OTYyZjRmM2EzODU1NGMzZGIxNzBhNjQ3ZGY0IiwidGFnIjoiIn0%3D');
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

