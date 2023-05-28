describe("", () => {
  context("Verify user settings page", () => {
    //Check login form behavior with incorrect credentials
    it("Verify the possibility of opening User settings", () => {
      cy.loginEmail();
      cy.userSettings();
      cy.logout();
    });

    // it("Check the behavior of the Logout button.", () => {});
  });
});
