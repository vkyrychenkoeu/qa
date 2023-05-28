// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "verifyLinkAtIndex",
  (index, expectedText, expectedHref) => {
    cy.get("a")
      .eq(index)
      .should("have.text", expectedText)
      .then(($a) => {
        const message = $a.text();
        expect($a, message).to.have.attr("href").contain(expectedHref);
      });
  }
);

Cypress.Commands.add("verifyErrorMasage", (index, expectedText) => {
  cy.get("p")
    .eq(index)
    .should("have.text", expectedText)
    .then(($a) => {
      const message = $a.text();
      expect($a, message).to.have.text(expectedText);
    });
});

Cypress.Commands.add("loginEmail", () => {
  cy.get(".drip-c-bQzyIt-ikOCZdl-css").within(() => {
    cy.url().should("include", "Email");
    /////////////
    //There should be a test account for the login on the prod. For now, a dummy solution by using a regular account.
    /////////////
    const email = "kyrychenko.vladyslav1998@gmail.com";
    cy.get("input:first")
      .should("be.visible")
      .should("exist")
      .should("have.attr", "placeholder", "Email")
      //Email for test account on prod
      .type(email);
    cy.get("input:last")
      .should("be.visible")
      .should("exist")
      .should("have.attr", "placeholder", "Password")
      //password for test account on prod
      .type("cDEbLzbudj");
    cy.contains("Sign In")
      .should("be.visible")
      .should("exist")
      .should("have.attr", "type", "submit")
      .click()
      .wait(1000);
  });
});

Cypress.Commands.add("logout", () => {
  cy.visit("https://app.fleek.co/");
  cy.get(".jss79 > .MuiButtonBase-root")
    .should("have.attr", "type", "button")
    .should("be.visible")
    .click();
  const email = "kyrychenko.vladyslav1998@gmail.com";
  cy.get("h6").should("be.visible").should("have.text", email);
  cy.contains("Sign Out")
    .should("be.visible")
    .should("exist")
    .should("have.text", "Sign Out")
    .click();
});

Cypress.Commands.add("userSettings", () => {
  cy.visit("https://app.fleek.co/");
  cy.get(".jss79 > .MuiButtonBase-root")
    .should("have.attr", "type", "button")
    .should("be.visible")
    .click();
  const email = "kyrychenko.vladyslav1998@gmail.com";
  cy.get("h6").should("be.visible").should("have.text", email);
  cy.get(".drip-c-bQzyIt-ihsCtFf-css > :nth-child(1)")
    .should("exist")
    .should("have.text", "Settings")
    .click();
  cy.url().should("include", "settings/general");
});

Cypress.Commands.add('generateRandomUsername', () => {
    const prefix = 'user_';
    const randomSuffix = Math.floor(Math.random() * 1000);
    const newUsername = prefix + randomSuffix;
    return newUsername;
  });
