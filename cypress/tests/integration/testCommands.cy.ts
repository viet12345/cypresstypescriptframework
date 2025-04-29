import { header } from "../../support/components/index.components";
import { VALID_USER } from "../../fixtures/users";

describe("Test commands", function () {
  beforeEach(function () {
    cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
  });

  it("verify logo", function () {
    header.logo().should('be.visible')
  });
});