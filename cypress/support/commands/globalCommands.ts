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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IlAxTWNoVkVOSHRFUHpLQ3p1R2FaclE9PSIsInZhbHVlIjoiVUw2TVpXcVJjbjFMdWh1blpOK29URzdQUzJLM1czc295K25hTUVmWG41bDJCK2ZZRDVET2ZvNVI5czJlb2pBT1VGc3VsYkhkalVCYTR2aFNETm9ZVCtDWVBkN2ZQZVJoYjJDMEdSRExqcjE0Z2xuMm5haW5qMlB0MDN6NFRJMEsiLCJtYWMiOiJiMmI3M2NhMmU0NTg5OTM2M2VjMjdlN2FkY2MxZjcxZDUyNzNmZTk1NjBlZmZiMTFkZjY0NzkzYTJkOGU2MTBmIiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6InV2R01mM01yUDlGWHIvSjc2WFpvVEE9PSIsInZhbHVlIjoiQUtrV1NvV1RIRVY3VjAwUDFsYkdqdFZYVmFMTjhiNlVHaDZVUjlLSGNPM04yWE83TGNCUkVhaUVhY0ZXUEk2cFlVQUwydkRQQ3VweHlPQURSN2huQzdvd2U4UldwYUNJUURsVFJUeVVoSVRyTWNhdjA5c05UVVdBWmczckNxdS8iLCJtYWMiOiJhNjIzZmRkODRlYjU1ZjFkZjVhMDA3YmNmYjI5YWYzZDcwYTQ0NWU1MmY4MDVmOGUwNzIyOTc2ZTU0MjVmODYwIiwidGFnIjoiIn0%3D');
});
