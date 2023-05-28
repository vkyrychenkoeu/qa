describe("Test cases to Logging in with an Email provider", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  beforeEach(() => {
    cy.visit("https://app.fleek.co/#/auth/sign-in?method=Email");
    cy.clearAllSessionStorage();
  });

  context("Logging in with an Email.", () => {
    //Check login form behavior with correct credentials
    it("Verify that the login is successful, and the user is redirected to the Hosting Page", () => {
      cy.visit("https://app.fleek.co/#/auth/sign-in?method=Email");
      cy.request("https://m.stripe.com/6").then((response) => {
        expect(response).property("status").to.equal(200);
      });

      // Logo should exist
      cy.get(".drip-c-jBgzwS")
        .should("be.visible")
        .should("exist")
        .should("have.attr", "alt", "fleek-logo")
        .should(
          "have.attr",
          "src",
          "https://storage.googleapis.com/terminal-assets/images/fleek/fleek-logo.png"
        );

      //Check that redirect link is not undefined
      cy.get("a").each(($a) => {
        const message = $a.text();
        expect($a, message).to.have.attr("href").not.contain("undefined");
      });

      cy.verifyLinkAtIndex(0, "Blog", "https://blog.fleek.co/");
      cy.verifyLinkAtIndex(1, "Community", "https://discord.gg/psychedelic");
      cy.verifyLinkAtIndex(2, "Docs", "https://docs.fleek.co/");
      cy.verifyLinkAtIndex(
        3,
        "Terms of Service",
        "https://fleek.co/terms-of-service"
      );
      cy.verifyLinkAtIndex(
        4,
        "Privacy Policy",
        "https://fleek.co/privacy-policy"
      );

      //Logining to the platform
      cy.loginEmail();
      //Logout from the platform
      cy.logout().wait(3000);
    });

    it("Verify that the login with incorrect credentials is unsuccessful", () => {
      cy.request("https://m.stripe.com/6").then((response) => {
        expect(response).property("status").to.equal(200);
      });
      cy.url().should("include", "Email");
      cy.get("input:first")
        .should("be.visible")
        .should("exist")
        .should("have.attr", "placeholder", "Email")
        .type("broken_and_not_existing_mail123@gmail.com");
      cy.get("input:last")
        .should("be.visible")
        .should("exist")
        .should("have.attr", "placeholder", "Password")
        .type("broken_and_not_existing_password$@!");
      cy.contains("Sign In")
        .should("be.visible")
        .should("exist")
        .should("have.attr", "type", "submit")
        .click();

      it("Verifies status code 400", () => {
        cy.request({
          method: "GET",
          url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=*",
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(400);
        });
      });

      cy.contains(
        "The email entered is not valid or does not represent an existing account. Try again."
      )
        .should("have.class", "drip-c-FkCil")
        .find("svg")
        .should("have.attr", "stroke", "currentColor");
    });

    it("Verify that the login with invalid inputs is unsuccessful", () => {
      cy.get(".drip-c-bQzyIt-ikOCZdl-css").within(() => {
        cy.url().should("include", "Email");
        cy.get("input:first")
          .should("be.visible")
          .should("exist")
          .should("have.attr", "placeholder", "Email")
          .type("134jbasj.as@as");
        cy.get("input:last")
          .should("be.visible")
          .should("exist")
          .should("have.attr", "placeholder", "Password")
          .type("!_");
        cy.contains("Sign In")
          .should("be.visible")
          .should("exist")
          .should("have.attr", "type", "submit")
          .click()
          .wait(1000);

        cy.verifyErrorMasage(0, "Please enter a valid email address.");
        cy.verifyErrorMasage(
          1,
          "Please enter a password at least 6 characters long."
        );
      });
    });

    it("Verify error notification with empty email and password fields", () => {
      cy.get(".drip-c-bQzyIt-ikOCZdl-css").within(() => {
        cy.url().should("include", "Email");
        cy.get("input:first")
          .should("be.visible")
          .should("exist")
          .should("have.attr", "placeholder", "Email");
        cy.get("input:last")
          .should("be.visible")
          .should("exist")
          .should("have.attr", "placeholder", "Password");
        cy.contains("Sign In")
          .should("be.visible")
          .should("exist")
          .should("have.attr", "type", "submit")
          .click()
          .wait(1000);

        cy.verifyErrorMasage(0, "Please enter your email address.");
        cy.verifyErrorMasage(1, "Please enter your password.");
      });
    });

    it("Verify that Forgot password functionality working as expected", () => {
      cy.get("div.drip-c-dhzjXW.drip-c-dhzjXW-iXlube-css button")
        .should("have.text", "Forgot Password?")
        .should("have.css", "color", "rgb(111, 111, 111)")
        .click();
      cy.get("input:first")
        .should("be.visible")
        .should("exist")
        .should("have.attr", "placeholder", "Email")
        .type("test@example.com");
      cy.get('button[data-loading="false"].drip-c-hLGRvg')
        .should("have.text", "Submit")
        .should("be.visible")
        .should("exist")
        .should("have.attr", "type", "submit")
        .click()
        .wait(3000);
      // For now check only that captcha is open. To test iframe on future should be additionaly istalled cypress-iframe plugin
      cy.get(
        'div[style="background-color: rgb(255, 255, 255); border: 1px solid rgb(215, 215, 215); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px; border-radius: 4px; left: 300px; top: 30px; z-index: 2147483647; position: absolute; transition: opacity 0.15s ease-out 0s; opacity: 1; visibility: visible; display: block;"]'
      )
        .should("be.visible")
        .should("exist");
    });

    it("Verify that the logout is successful, and the user is redirected to the authorization page", () => {
      cy.loginEmail();
      cy.logout();
      cy.url().should("include", "/auth/sign-in");
      cy.get(".drip-c-bjHFcE").should("be.visible");
    });
  });
});
