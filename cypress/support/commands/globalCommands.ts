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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IkpLRGlzbzdjWE1oUXpZRFkrMWh6MGc9PSIsInZhbHVlIjoiS3V3MVJ0Q3ZiUmxwRnZQMzdZVEJsNmZmaXZzbnNzbHJ2ZEQydXdUeVN5TUFKY0ZGTVhiRUp4K0xMcnV1MHpqZ25Cb0RpaGRuN1lxU0c0ZXNnT0MzSVJyREtydzhDK2RwenlVZEo2d1ovYkNWcUtZWmlYZFl3dG1LSmt1ZFI1THAiLCJtYWMiOiI0ZmQ0N2JiZmFhNjRlYjMyOWZlODBjZDBkNmE4OTc0ZWQ1ZDMwODMwZDg3ZDVmMjhlY2Q0ZWZkZTNiMDVhNmZlIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IjhrQ3hVeGJFVXpYNkRnd2J4QTFtaFE9PSIsInZhbHVlIjoiZkpGM1d1eE9oYjFDL1pJV3V0czJJcnFNbTVON0d2SE9ORWo0V3hvYWkvZDdzcmFaRk41ZnhDamtlSHpKV0paNVFGaTRKMm9NVXdkWld6a0JtUWdJMUIwSXN1d1BpdVg3QUphVEJxWjRkdDM4WWt5YlNSbEV5SEpFWVJOeWxZSjAiLCJtYWMiOiIwNDEyZGQxYzA2NzUxY2FhMzYwYTNlYjBhZjAyNGI1ZWMzZTY2N2I2Y2Y4MzQ2ZDgxZDJlNDY1N2I2NzhhN2E1IiwidGFnIjoiIn0%3D');
});
