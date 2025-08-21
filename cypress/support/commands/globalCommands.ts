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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IkZzZXorZTVrNmUyTmVSdE1Ja0QzNXc9PSIsInZhbHVlIjoiU29qODlhN2VyRHNpNzN1clZhMGV0UmN0Tlg1ZlNrUUlCT2h4WTFaSmU0NmZGakNUTWdqeFhkZWJHeGNFeG5ZR2RaNnp4b1VESFRyeGFsTzJ0ZGdvK2ZiMXFtSVlhaXNETjNsTHh3THFEU2Q4NVlGaUJGbFdsS3VlT2xmSE5Md0wiLCJtYWMiOiJhMjY0MjMyZDYxZmUwZWQ0ZDFlY2U3ZDE5OTNiMTAwZmY4ODlkNjkxMWYwMjMxMGMyZTBhNWJlMGZkOWE5MDEyIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IlI2WFVMV3FhaUc1Y3F1SDh3QlFIckE9PSIsInZhbHVlIjoiclVicXdVTzlYalVJRjZaazRGU3R6OWl4OXpmRTY0bTFrd0hOYnQzOVVvb1FTMFluZktwdlZvcFBhbTI3dVdtb0EzVTY1VmMzWjdxYjJSanYvNUpjV1U4Qkh5Z2xUQnBTSTRjbkNmME1jR0JodmFMZVRNcEE1MmhaaXdOTHE1NzIiLCJtYWMiOiI4OGQxMzcwMDFhN2IzMGY0MDRjMGVjNDAyZjFiMDUxY2E0NTA4MjVhZGM5MTAzZDVlZDk3OTUxNjQ2ODAwNjNmIiwidGFnIjoiIn0%3D');
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

