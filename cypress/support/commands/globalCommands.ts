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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6InFrZk5EWFN6N1Y0QnNyMUkxc01zUVE9PSIsInZhbHVlIjoidlFkOFVoTElXaEVCbytYaVl5M2tGaVhJS1Fvdm5aYmtvYmcrNGRlRVgydnJqa3ZVT3VwcGt3dzFkcEtFMmFqeUlRWFJMaHB0a0g4OVNMVkt6WEVSV0JZR3dGSEJSYmQ4Q1VUMlhoa2F1OFFTV05PQWVQSDNWU215SE9sbVppb28iLCJtYWMiOiJjZGM0ZjMzYWE2ZWJhZGE5N2IxNTg4Y2M3YzJmYjgyNjExNGQ0MDYyYjk5N2I0YjI5MTM1OGRkOGRiZTljN2JjIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6IndHcG1RTVpLeE0zOWljWHkwUE42Q3c9PSIsInZhbHVlIjoiVTZNNTJlcHpGZnZ1bnJJd1BBL0dvc3F2NE1Xc216V0dBT0Nqai9WbXZ2ZnJqUkhlbFdMN0RWNk9jTmFsY2ZxZGlSZ3RZdS83WXRtaVdSWVZmOTZkVlRtRFNZVHpOUkRSMnRNcE5QQUZSRm0xclptNWphUmdSWERQSEw5UllRMDEiLCJtYWMiOiJiMGFkNDdhMzU2ZjM4Y2FmNTNkNDMzZjhiY2I4NDYzNThmMTk4ZTFkM2QwOWEyYmJjODA3MTZhYmVlMTg5ZjFkIiwidGFnIjoiIn0%3D');
});
