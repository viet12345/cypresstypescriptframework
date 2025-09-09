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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IlRnQVNKZFhjbzROQXZCTHNObk9Tb2c9PSIsInZhbHVlIjoicE5RWlpqZlRjTzZTem93Um9uTG16TjQrR01xdEMwVFRVMzhhaTFwYStEbko5NDdzbXZRVlpZRk9FYm5kUVhQcTU0UHNtTEszamlENUJkakhaRHZ1NDlvMnNKVkVRVmdOOElHQm54WVdUQmUrMWpROUYwVlp0WG15TXpQaDUxeWsiLCJtYWMiOiJhMjI5NWE5YTQ5YjM4ZWQ2NTg4ZDA0YjQ5MDYxZDVlOTVlYjRlNWRjOTIzMGIxMDI5YTQ4NmU4YjgzNDVjZGMyIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IlFyNUdOMnRrVm9QelcvNlF6bFhoenc9PSIsInZhbHVlIjoic2M3NjZIT0k5RFEwOG43RE5wSzY4Tno2Q25jQ3drOHVyeDZzUVRFcDZuV1oxSHZHbmtTZ25xMHJlM3c4SmhNd2hnWDlTR3NIVDFLSzFUSWpYMUt6OG53MHdzakQrd0J6UVQ5b3BNUU9LK0VaaFhrMzRmZVN0WStqWkZ4dGtGSXoiLCJtYWMiOiI5MjE2NzdkOTU4NWZlYmMyMGFkY2UyNTYwNDI5OWIxNTAxMjMxYmM4NTkwMjhhZTg5NzUzMjgxODVkNzVmYzlhIiwidGFnIjoiIn0%3D');
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

