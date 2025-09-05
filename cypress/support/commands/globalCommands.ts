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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IldtcDlpRVhxbEt2ODlZTkdrZUs4Mmc9PSIsInZhbHVlIjoiZmhOOEJ2M0I1ZFRnR2dDVTk4Q0ZFWmllSXZ5RGJJc2M2WDIwbW4rcllzNzlGQlB3L1BsZ0hhZytNVDBQYVNTMjdrTjFWZHdKSFk1akd1c0RaWGdqT2dPK3hsT1krRVBXLzRFZzNGZWwwcFpZdDRwVGtFcjBlcmpac2N0ZHluNjQiLCJtYWMiOiJjZjZiMzE0MTY0YjNkM2Q1Nzk0YjViNWFiNTNkZWE0YWM1ZTUyYTgwMDNhODFjMjMxZWU2NDMzZDMyMzAxMTMzIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IlFQbzA4Zk5qTEl3bDhIY0VTdlVLamc9PSIsInZhbHVlIjoiUGo0bnhUMW5oQ1BxbEk3aVN4NERBUWFCRnFuOE4wQUlnSytGN1psb1ZSREFMb290aXpDL2NPbXl2eGpmSmUvelZSalFuRng1aEJobnA1UTZHcCtSeTNVTEJ3TlRPMGtDQS9FUWN6TzNIT3dwNDlQSk0yeXRKTk05V09lK1ptbjEiLCJtYWMiOiI1ZDM5ZGFkYjIyZDUyNzY1NmFhNzU3OTA1NjVmZDM1MmM2NjUzOGVjMzhmYWJiZTQxNDZlMzk5NmM4NWE1NTBkIiwidGFnIjoiIn0%3D');
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

