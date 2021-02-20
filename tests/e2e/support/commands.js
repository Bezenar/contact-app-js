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
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add("setValue", (selector, value) => {
  cy.get(selector).type(value);
});
Cypress.Commands.add("checkValue", (selector, value) => {
  cy.get(selector).should("have.value", value);
});
Cypress.Commands.add(
  "createCard",
  (name, lastName, email, phone, website = "", category = "Work") => {
    cy.get("#name").type(name);
    cy.get("#name").should("have.value", name);

    cy.get("#lastName").type(lastName);
    cy.get("#lastName").should("have.value", lastName);

    cy.get("#email").type(email);
    cy.get("#email").should("have.value", email);

    cy.get("#phone").type(phone);
    cy.get("#phone").should("have.value", phone);
    if (website.length) {
      cy.get("#website").type(website);
      cy.get("#website").should("have.value", website);
    }
    if (category !== "Work") {
      cy.get("#category").select(category);
      cy.get("#category").should("have.value", category);
    }

    cy.get(".submit-btn").click();
  }
);
Cypress.Commands.add("clickFilter", filter => {
  cy.get(`[data-filter=${filter}]`).click();
});
Cypress.Commands.add("checkBadges", index => {
  cy.get(".contact-grid .contact-card")
    .eq(index)
    .find(".category-container");
});
Cypress.Commands.add("checkFilterResult", filter => {
  cy.get(".contact-card")
    .find(".category-container")
    .then(data => {
      [...data].forEach(el => {
        cy.wrap(el).contains(filter);
      });
    });
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
