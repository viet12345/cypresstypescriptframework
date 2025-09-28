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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IjhjbWw5Mityc29tL1hWWkFqNUhQRnc9PSIsInZhbHVlIjoiVlExb0hXK0pYK1pib2hlNmMvN3g5U1owTS8vTDB4ZHpCbmFSV2NoUXoybys2VGZZbUJZYnZEM01SVDc0MW5Xc01kSXUwVGpvNEVjV1BpS0phWjhMSnhtWEJma294WGxhdE9wWEtMMkdVcGIwTUZodVhNOS8xc2pudmhTbFY5K1YiLCJtYWMiOiJjN2NhYzMxMzEwOWI3NDBiYWU0ZWRmNWQ4ZTQ1MDE3MTdlMzQ3ZGFjMWQ3ZmRmNWFlZDNiMWY5ZGM3ZTdiYWExIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IkZWMC9pL0VrTUtMQ2hjWllqL0h0MXc9PSIsInZhbHVlIjoiNFlxWmltYVFSWkNiemc2Q05OZ0o0Q0ZGWTI0Z1FoajdIcGFnc0JQRHlnRi9DUEk2T2c3S2FyaUY4Q1NidDBhZCtBbzRONXlkb1NnWU5TaEM0VjQyWjdLaFYvSDdzcVRLczJJQ1pXN29hRW9KN2VscUl3TzVUWEFpL095K3M2MW8iLCJtYWMiOiIxNzJjYzNhMTkzMDJiZGNiYjhlMzI4NDk3ODQ3ODViYzJlMzJmZjQ0MWYwYjk3ZDE3NTk0NmUwYWYwMWY1NTYwIiwidGFnIjoiIn0%3D');
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

