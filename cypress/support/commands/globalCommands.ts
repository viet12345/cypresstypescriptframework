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
    cy.setCookie('XSRF-TOKEN', 'eyJpdiI6ImlFNzl0dEdTdmhQQVFKV1RqNWcwY1E9PSIsInZhbHVlIjoiaFlVcXdhMnhvb2tmd0VmTGt4enpiU2dPV2FzdzVtRG1WeFRVNXo1VXlBSEVYMUtyall0SEs1ZU1GV3o1czRCWGJwOFNNbGwwQk1iK1ZFdUJMTnMvMGxkZ0hRa3RUTU1pZEswdHNNdXVORk4zTW13NW1pd3drTks4cGhpbnc4a0oiLCJtYWMiOiI3MTY5ZjZjNjI0ZmY5YzczNDgxZmQzZjE4YjRhZDM4MmI2MGI1YmIyNjhjOWVjM2U4NjUzNmE4NWUyN2YwMGI5IiwidGFnIjoiIn0%3D');
    cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6Im1maDhoSldzSGRrZUR5TkFocFVxYXc9PSIsInZhbHVlIjoiTVo2MUFXK3lWcmVNV0w2RFZ2MU1oblEyRDhIRW9aODRoZUJEcWs4T21QZGJWZXE3TVNjTy8xaVpaRE5RQWNKa1dVdjMrUmY2SkJTT3E4bTRzcDcyY21mZmJCWWVUMngxM29WSXFCRHd3VWFDNlh5ZmlCcExSRU50MkU2NGhOMHgiLCJtYWMiOiJhNDQ5NDQ3YjZjYmMzZmZmMzUwYWI2MmMyNjE4MGMyNjI0MDA0NzNhNjgxZTRjZTIxZTAxMzFkNmRmZDE3NzcwIiwidGFnIjoiIn0%3D');
});
