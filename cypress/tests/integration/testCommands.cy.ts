import { header } from "../../components/index.components";
import { VALID_USER } from "../../fixtures/users";

describe("Test commands", function () {
  beforeEach(function () {
    cy.login(VALID_USER.USER, VALID_USER.PASSWORD);
  });

  it("verify logo", function () {
    header.logo().should('not.be.visible')   //make a fail case
  });
});