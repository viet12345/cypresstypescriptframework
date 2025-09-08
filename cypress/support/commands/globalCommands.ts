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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6Im9hWUk5THBUbW05T00vOWppVEpsSWc9PSIsInZhbHVlIjoieHhITlc0QU9aT1RTTXZHT1VPZE93RGZqbElkaENyU1Q3dDFDcE5WV3ludk9jOG1wYWZzdGJFOS9rcGkwQVA0OXluWEFvMVhKaHlMT3ZxT1BBdGltYWN0WitwcGZLM0dHS2xoT2ZYTWdEbVVJaS92b1RSQmY5cWZOcy9EWDZ6b0kiLCJtYWMiOiI2NDA0OTQyNzkyOGY0MTc0YzU1NTg4NzBkODc5ZTM4YWFlMTcxNDdlMzU2MDEwMWU5MDhiMTZmMDYwNWIxYWI3IiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6Ik9YTXVsbE1QTWJnc2xNbXNZVjB3SXc9PSIsInZhbHVlIjoiUkRrN2piVitnSzF2RmVuTnRQdFcrOGFyY3VycUU0SzlmWWFwVzdyUnFzY1RFLzNJSnlpVFB5Q2svOHkram1OOXF4N2pXUG9MTDU0U3BEQjZhR0xXNU9IRjB0Z3VzSXVwNXRmQUs1Mm51Y0NZK2xEaXprV1ZmTHNCWThtcGd2WUYiLCJtYWMiOiJlMjAzMWQ5YmE4ZGI5MzA1Yjg0OWNlYzE3MjM3Y2JiNDU0YTZlNTI0ZWFmNjQ5ZDNiZGUwNDU4OTlkMDYyMWJiIiwidGFnIjoiIn0%3D');
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

