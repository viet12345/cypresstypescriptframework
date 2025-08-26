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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6ImZObHpOeEltRERTTWwrK0JJdk5JNHc9PSIsInZhbHVlIjoiYnl3RThkdGd1eUtwd09oc2prLzVXRk81cFFLV2VsbWdpbE9zVVAyS0JuTnVWYjVPT0NYQmc4YmlCTUsxQkJyL0VaNnZwWC9XRUhha09TejRNVTdxN0dxU1p6OUNlbkZPZGgxMUJ1akFoYjIzZjh6U0ZhNngvOHRqYXBZMk5NQmEiLCJtYWMiOiI4N2I3YmYzZTBjZGQ1YzM1YzZjNGZmNThmOWUwNzg1OTFjMDdiMmVhNGI4OWQ0YjhlNjY1NmQ0YmNkMzRiYmM5IiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6ImxicDV5SExnc2JQSWlqSUdDalVuN2c9PSIsInZhbHVlIjoieEQ5V2E4Rk9VcHpiZ1JZUFFWMzgvN0tBT0UwVHE5SWQ5WWttWjJ3TGtVREl3VHVXQ0JRZzdJVUxiQitKeUx6ZEloaGNzcjkxQVh6cTZ3SUxXZkZPRlBwSVpPb1MwZVBVVzVBTi9TSDV1U1E0MTRsMVNIRVI1dGFmZXRiWDNQaVAiLCJtYWMiOiI2NDQzMzA4N2E0Njk0OWU3NTZhZGIwZjU4ODJlNDVkN2IxNDE2ZDUwNGU5YmI4ZjIwMDc0ZjkwOGQ0ZmU4NTA1IiwidGFnIjoiIn0%3D');
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

