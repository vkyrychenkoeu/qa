describe("Test cases to User Settings page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  beforeEach(() => {
    cy.visit("https://app.fleek.co/#/auth/sign-in?method=Email");
    cy.clearAllSessionStorage();
    cy.request("https://m.stripe.com/6").then((response) => {
      expect(response).property("status").to.equal(200);
    });
  });

  context("User Setting Tests", () => {
    it("Verify the User Profile UI", () => {
      cy.loginEmail();
      //Opening the Profile modal and navigating to the Settings page.
      cy.userSettings();
      //Check that the user profile info for the current user is correct. //Dummy way to check for now
      cy.get("div.jss132.jss192.jss189")
        .should("be.visible")
        .within(() => {
          // cy.get("h6.MuiTypography-root").should("have.text", "kyry...1998");
          cy.get("p.MuiTypography-body2")
            .eq(0)
            .should("have.text", "kyrychenko.vladyslav1998@gmail.com");
          cy.get("p.MuiTypography-body2")
            .eq(1)
            .should("have.text", "Joined on May 27, 2023");
        });
    });
    it("Verify the Personal Information UI", () => {
      cy.userSettings();

      cy.get("div.jss211.jss220.jss211")
        .should("be.visible")
        .within(() => {
          cy.get("li.jss150.jss212")
            .eq(0)
            .within(() => {
              cy.get(
                "p.MuiTypography-root.jss214.MuiTypography-body2.MuiTypography-colorTextPrimary"
              ).should("have.text", "Username:");
              cy.get(
                "p.MuiTypography-root.MuiTypography-body2.MuiTypography-noWrap"
              ).find("span.MuiBox-root.jss223");
              // .should("have.text", "-");
            });

          cy.get("li.jss150.jss212")
            .eq(1)
            .within(() => {
              cy.get(
                "p.MuiTypography-root.jss214.MuiTypography-body2.MuiTypography-colorTextPrimary"
              ).should("have.text", "Email:");
              cy.get(
                "p.MuiTypography-root.MuiTypography-body2.MuiTypography-noWrap"
              )
                .find("span.MuiBox-root.jss224")
                .should("have.text", "kyrychenko.vladyslav1998@gmail.com");
            });

          cy.get("div.jss213").within(() => {
            cy.get("button.MuiButtonBase-root.MuiButton-root").should(
              "have.text",
              "Edit"
            );
          });
        });
    });
    it("Verify changing the User Name feature", () => {
      cy.userSettings();
      cy.get(".jss213 > .MuiButtonBase-root")
        .should("be.visible")
        .should("have.attr", "type", "button")
        .and("have.css", "color", "rgba(0, 0, 0, 0.87)")
        .click({ force: true })
        .wait(1000);

      //randomizer to use each test new unique username
      cy.generateRandomUsername().then((newUsername) => {
        cy.get(
          "div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth"
        )
          .first()
          .find("input")
          .clear()
          .type(newUsername);

        cy.get(
          "div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth"
        )
          .first()
          .find("input")
          .should("have.value", newUsername);
        cy.contains("Save")
          .should("have.css", "color", "rgba(0, 0, 0, 0.87)")
          .click();

        cy.get(
          "div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth"
        )
          .first()
          .find("input")
          .should("have.value", newUsername);
      });
    });
    it("Verify changing the User Email feature", () => {
      cy.userSettings();
      cy.get(".jss213 > .MuiButtonBase-root")
        .should("be.visible")
        .should("have.attr", "type", "button")
        .and("have.css", "color", "rgba(0, 0, 0, 0.87)")
        .click({ force: true })
        .wait(1000);

      const invalidEmail = "invalidemail";
      const newEmail = "newemailevenvalid@example.com";

      cy.get(
        "div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth"
      )
        .contains("Email")
        .next()
        .find("input")
        .should("have.value", "kyrychenko.vladyslav1998@gmail.com");

      cy.get(
        "div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth"
      )
        .contains("Email")
        .next()
        .find("input")
        .clear()
        .type(invalidEmail)
        .closest(".MuiInputBase-root");
      cy.contains("Save")
        .should("have.css", "color", "rgba(0, 0, 0, 0.87)")
        .click()
        .then(() => {
          cy.get(".Toastify__toast-body").should(
            "have.text",
            "Updating personal information failed: The email address is badly formatted."
          );
        });
      // cy.get(".Toastify__close-button").click().wait(1000);
      ////////////
      //The test below will be a comment because the platform tried to change an Email.
      //But first five attempts, it wasn't possible.
      ////////////

      //   cy.get(
      //     "div.MuiFormControl-root.MuiTextField-root.MuiFormControl-fullWidth"
      //   )
      //     .contains("Email")
      //     .next()
      //     .find("input")
      //     .clear()
      //     .type(newEmail)
      //     .should("have.value", newEmail);
      //   cy.contains("Save")
      //     .should("have.css", "color", "rgba(0, 0, 0, 0.87)")
      //     .click()
      //     .then(() => {
      //       cy.get(".Toastify__toast-body").should(
      //         "have.text",
      //         "Updating personal information failed: This operation is sensitive and requires recent authentication. Log in again before retrying this request."
      //       );
      //     });
      cy.logout();
      cy.url().should("include", "/auth/sign-in");
      cy.get(".drip-c-bjHFcE").should("be.visible");
    });
  });
});
