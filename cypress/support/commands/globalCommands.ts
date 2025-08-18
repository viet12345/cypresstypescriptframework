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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6Im9nY21PKzBxNnJCYWZGSFQra0F5WXc9PSIsInZhbHVlIjoibWE3cHR1ZHBmTGk2Q0FrbWFaNENHbkdHVTJLV3JhK1dIMHZ0UXJUbzZWanJNZ1N1akNXb3BTMFhBUzJTUTR4d3JOVGdhbG9iV1E3Sm9zaEQrNkU4L1g1dy9tT3hsSG9mRE01U2hZR0doZlFpd1hMUCtFTzl5bWM0T3NDQldYdGciLCJtYWMiOiI1MDMzZmQzMDZmN2RlMTZhMjEzZmZiNGQ1ZmZjZTAzODg0ZmZhMWM4NTVhZGM0OGE0OTg1NjM0MzlkY2ZkYmI0IiwidGFnIjoiIn0');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6Ik8xRHpJMHFWcDQ0aU5uK2NzTlVtV2c9PSIsInZhbHVlIjoiNWZKOGFHWjRtVkhEVFAxTVh2UU1iSGtucStvUUV6dUcwaTB0aUJIMnY2UTlTREh0dGI2bHNOK3dremVQQ2lQMmF3UFdoNHlmM1YvLy9oa1M5bEhscGFMc2tVTW4xN0hxbGFmbGhrdThaOE9zRlA0UHlQUW5HQWF1MjdzRS8ydksiLCJtYWMiOiI3Zjg3MTE0ZjI2NDAyZGM5YTUyZjBjNWU3OWU1MzU2MDI0Y2I2ZmRlNTVlNWMzZjJmN2MzMjRhY2EzOTkzNmU5IiwidGFnIjoiIn0%3D');
});
