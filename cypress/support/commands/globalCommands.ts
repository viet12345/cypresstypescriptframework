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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IlA2Q1YxWU0yVmo5am1pcHIzcjIwR0E9PSIsInZhbHVlIjoidjdjUDJuSkF2QmFDV3p2V0ZOQ20wUFlhL3IrblpwdldGMyt6ZDlnRlFyTVRaazREQ1ZjdC9RUy9SdEpMcG15cWY1TE1UNDVzOXJaanBoVkQwam9Kb2tUTUFsKzhNSG1QbXpzYTVxVnFBL3hQNDNvQk02elhYWGRKNHRIYUZNY1YiLCJtYWMiOiI2ODgzZmZiMjU2MjllYjI3MjU2ZWI2MjA1NGZkYmJhODY0YTg2ODk0MWFkNTgzMmMwZmVkYjMzZTExNWNlMjJlIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6ImFhRmcxcEY4Y3ZXNnk2Tkk2VlYydVE9PSIsInZhbHVlIjoiTUNjSlEycEZiT2tZcy85cXdGYnpXUkFXQU4zbzhVaVljMnluZmVVQ3cyNFoxQUhFU2gzcXNjK0ZCOXBzV0lGL0t3MUZpWFQzelB4WVBXQ21hR1VnNDlENXhvZGVRdFQvRktpYUcrUkxZRFRZVVhlWjBxVTJNTUlLM2JYQmNmWmsiLCJtYWMiOiIwMjgwYzUzMmI1NzNmMjQxZGUwMmNkNDk4MzlhNWM4NTVkNzY5M2MwN2EzNWI4YmNmOTQ2ZDYyYWUxNTU0Y2UwIiwidGFnIjoiIn0%3D');
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

