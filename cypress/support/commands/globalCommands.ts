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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IjdrNXRTb2YyUU03SlFJdGpsY1o0dlE9PSIsInZhbHVlIjoicVc2NFRncEZkam91YVZvYTc0eEEwQ1dtZDdlV3lSbmc2a1lkRVQ4VE43ODdueFNieis2cmR3dkJ4dUZSMU54MGY2MTZNSnhzYmg3OHNIZ0Zvbld2aDNFbUE0TWN5MXUyNGhOL1BKZ3VCQUhZeDFMSzBBTzl2eWpiL3Bod1lFVFoiLCJtYWMiOiIxNDFjM2UxOGQyMDFhY2JlYjEzZmQzZDE2NWRkMTk0NzY1MTNmNzM2N2IxY2ExZGY3OTk0ZmNjODk0M2EwN2EwIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6ImFQdTFOS3h4bVpIRDI3dkpySGEwTEE9PSIsInZhbHVlIjoieVhTd29CczBOcmpXdTEwY1pndjVBdzdoQjJCV1AvZEFDejg0UkZIQnN1TmMvOTVKZDJPL3lGdCtsZHZDbVkwSkJ5L2hUZ1B0THdCM2U0Rm4zdXpRQWUwaVU0RHFGeEtrTjVSaklsUFRxb3V4dXptWnRLWm1ONnlXcEZwQ0hFWkkiLCJtYWMiOiJiNzBkMDJlYjA4NDM2YWY5NjMzY2VjZDIyODhmNTdiNzZhYWZmOGRhNjkxN2FkOTQwM2JiZWE3MjMzZTVmMWQzIiwidGFnIjoiIn0%3D');
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

