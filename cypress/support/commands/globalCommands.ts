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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6ImMwT2piWFpVSk1kQ1ViOTU1WGZQalE9PSIsInZhbHVlIjoiemp1dzc4UCtySnozNEFIRDNuNCt3b3gvQ01UYTIwMFA5MjkyaXJURXBaUnBCakFDZmVib0ptT1JTbUFXK0dwMklQdWdvRmpyQnE0ejhRdWNOTWlzSURGUHhBOXpuU3l0WWM5S1psU2crdEtuWWdKazdOcHJJbkFHRU5obGtWQkYiLCJtYWMiOiI2Y2RiYmRlMzMwNzY0MTM4ZGM1ZTllNzI1YWViYjgxYjRkZjdkYWMzMTcwYTkxZjVlMTJkYTVmM2ZiMjY5ZTNkIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6InBRSVV0bXFqck10Y296NGh5a29kNWc9PSIsInZhbHVlIjoidlpTTE1IOHZQc3NWZFFWamdTcWNtUWdHamM4MkY5b0x0ZGg1VXhGdTNtNjV6Q1lIMm5yTm5WWExUL09XMjBMZUo1OGVjRW5WVmE2V2l3NzU0MHcrNEs0dkFvYklyWEdFMERRQnhkSXkxRWIzZys4TkJ3eGJUazhkYVhWL05xZDIiLCJtYWMiOiJhMjU1ODA4Y2E4YzQ3NGY3ZDA5YTgwNTY1NDRmZjlkNzdiMjYwOTM2OTVkZGFmZGQ4MTE1Y2QyNzdiZTA0ZThlIiwidGFnIjoiIn0%3D');
});
