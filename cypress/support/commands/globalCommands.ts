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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IlUzVWZISXdsSExpLzh1djJxY0lQZEE9PSIsInZhbHVlIjoiWDN6L0NlcHZOL3l5cG5ldWQ2T1J6SVNYUitSVTVHMVY1T2l2eGRtVGUzS2I0UGdsZXoyZ3lrSVdqUklXbldhMU9XSkJBaktvSG1JVndBbUJJT3JnWW9qMlRaaTRxRzVieEVyekNhY3ZISmpFdy9GbEFHYitCNG01M3lybmZ2MXciLCJtYWMiOiI4OTBhOGU3NDk4MDE0MDg4YjQ0YmFlZmFhNjYwMDg3MDY1NzU0ZmE4Mjg1NDdjMWNkZmQyZTZlNzY5ZWEyZGMxIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6ImxEV3h2MkIwek8rQTk4Z1d5WG1VbVE9PSIsInZhbHVlIjoiaU9VNUI1MFh1cUNnem4wWHpEMWRkNnJhWVZsM2FyNnpPS0J0c3VzbWVwWk5DbjgvMlVFTkhzV1V2Mjh0a25Hc3lmZ3cvV04yYVBQZUJwcVRZMjNwcnppZ3JZSXdVa2pTWElaTFh0Q1N6TzY4cVQ2cUxqL2pGOHB4MWVsd3F5bC8iLCJtYWMiOiI4MGFlNzE5ODAzZGU4ZGI4OGIzMDg0ZjZjZmZmMWQwZWRkMDNlMjY5ZDJhZGM3MjdmMWE4NGI3MmI2NmNkOGM5IiwidGFnIjoiIn0%3D');
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

