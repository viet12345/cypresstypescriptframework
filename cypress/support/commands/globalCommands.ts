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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IklhS1ArdFZHK08zVnFBOGZhVks2a1E9PSIsInZhbHVlIjoiNWZGRnpveGhsZy9yb1lWeERkMWlKMDZEVWJTN2F5MUpJM3RpTDJoVWg0Nk14djcveHNUUTZiT3RUTlJTbjJhUjBTS2t6ZHNaRXd4OEVQREFuZTk2R1VGajZnaXFOWWQ3UkZ2ZjM3Rmpubk5RaXh6Q0Y1QTFmYXhJcy9qNXozSDMiLCJtYWMiOiJjOWIwMTcwODllYmY2NDZkMDI2YTVlMmI0MWQyYTBlMGEzYjA4ZDM5ZDdkYTg1Zjk1NDc5NTNkN2Y4YTEzOTdjIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IlVEU1RDdHp1RFg5MmJES1h0cUZ1dlE9PSIsInZhbHVlIjoiSFVlYWNzb2JYbktyeGdYSmh3VFhrbGpuK21SQWVVV0xSWTlYN1p3VWZTNGtzUlJrQVNCdFdDTWFEc2xWc3gydDlXNWtqWnpEWjRxVHpSRVJ5RFEySlk4dTQydW5vdEdrQU5WZGRMQ0RKR2xlbnk1ZXZaUElOb1FlODkyK2FUdW0iLCJtYWMiOiI4YmFiNGEyZDkyMTU3MGIxODRlZTM3ODBmZmJlNTQyZDVkMTZjMjA5NDAyNTllODMyODViNjliNjA1ZDVhMTk3IiwidGFnIjoiIn0%3D');
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

