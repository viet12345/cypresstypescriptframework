import { VALID_USER } from "../../fixtures/users";

Cypress.Commands.add('loginByApi', () => {
    cy.request('POST', buildUrl(Cypress.config('baseUrl')!, '/login'), {
        type: "LOGIN",
        username: VALID_USER.USER,
        password: VALID_USER.PASSWORD,
    }).then((resp) => {
        window.localStorage.setItem('authToken', resp.body.token);
    });
});