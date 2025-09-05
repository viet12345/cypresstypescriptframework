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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6ImNBeCtFMTRneitXZlAwK2VZZGd2ZHc9PSIsInZhbHVlIjoiRFo2S2ZVTnc4ZE9kQkJXYXM1M244dUhkM29DZDVqWUE0eGVLZUkwdk05dzROSUE4RmtBREFVWlU0VUszVzRHdXpBSW91UlI3WlJYUm8xcGpkcG1qNW1Pd2FDWFZmNklSRTBqWGNqYmE0bXJVQXg0RTFzZ0hFYTFRS3NkTEJ0cmsiLCJtYWMiOiI3MDQ2ZTMyMDEyNjdiZWMyYjVmZGQ0YWRiOTU5YWE2OWZmNTAxMTY0MzkyNTJjYjgyZmM5MGZmNzE3YTg0NzY5IiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IkRQNkJBdkxNZUhVRVYrK09ma2tDM1E9PSIsInZhbHVlIjoiWkZrQmp0dUlMTU5KdUVTblBvYVZxZldDVzdVajVGdjZ3U1ZlNHoxaTlySjJtaGxBc1NQZ2ZQWUZKdW8vMWcwTmk2L1FvVXVXMUdzUlIxR2pQRUo3enZnSERoTTFHelM4NDBOOVV6bHVLaFlhUTZEbXN6TVFnMTZRZWEzNVY4dGsiLCJtYWMiOiI4ZTQ3NjIxYzc0ZTJjNzNlZjA2M2NhMGVjNmU4YjVlMzI5MjQ2NmM0Y2NhYjk2MGMxODI5YjFhNzE5YzQxMzUxIiwidGFnIjoiIn0%3D');
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

