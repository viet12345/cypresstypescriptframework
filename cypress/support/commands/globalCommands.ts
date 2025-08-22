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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IkNZc0NOZm52TVJqTWxkVGlja1NVcFE9PSIsInZhbHVlIjoiQkl2dkJ4VzFwdVBReklJNFNWekZNUm9Sd1pmQmlJeTJLY2RQajRjTi9MbENlTGtlRUtXOHhwbzZkZnNEZk5iR0ZleXBnZWFJM0dBN3F1RDBlUUNrYWhOUjdMUEY4cmRDdHN0UnIwL2pJb3pVZjY4dUZjQnROSld6WE0wK000b1IiLCJtYWMiOiIxZWYxZDhhOThjYzhlNzczNGUwZGQyNTVlZDMwYWY2YTNlYTVmMThmMmVhNjRjYTFhMzE3YzYwNzMzNTJlZjZiIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6InQvekoydGJ1aTBwdURLdEFJNGQrNWc9PSIsInZhbHVlIjoiSkh6K00rN0p2czFodGJEeENCdnRZaHdCL1l2VE5YZnlIam5mZkcxZllaLzdDS0dBdVoyTTRvK0N0OEphaHdzT3ZueFEvVFVCajk3SWZjYW9rUGJNSVlsc2MxT01ITHl0VTlERys3b0NNNTVYcEtVdlYrbXJFeXBZd3FiSHNFdVoiLCJtYWMiOiIyM2JkYjNjYzVkZGIzYzhmNjRlMmZjNjVlMTEyOTRmMzNiNTI5MzllODg4YjM1NDQ4NDU4ZTY2ZTA5Yzk1YmM5IiwidGFnIjoiIn0%3D');
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

