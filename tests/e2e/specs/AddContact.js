describe("Testing that contacts is add/delete and contact card is rendered", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    // Clear local storage.
    cy.clearLocalStorage("contacts");
  });

  it("Checking that contact card with website data is added to contacts grid container", () => {
    // Setting values and checking that it is assigned.
    cy.setValue("#name", "Name");
    cy.checkValue("#name", "Name");
    cy.setValue("#lastName", "lastName");
    cy.checkValue("#lastName", "lastName");
    cy.setValue("#phone", "27272727");
    cy.checkValue("#phone", "27272727");
    cy.setValue("#email", "test@email.com");
    cy.checkValue("#email", "test@email.com");
    cy.setValue("#website", "www.test.com");
    cy.checkValue("#website", "www.test.com");

    // Submit form
    cy.get(".submit-btn").click();

    // Checking length of html collection.
    cy.get(".contact-grid .contact-card")
      .its("length")
      .should("be.equal", 1);

    // Checking that element contains added contact data
    cy.get(".contact-grid .contact-card").contains("Name lastName");
    cy.get(".contact-grid .contact-card").contains("27272727");
    cy.get(".contact-grid .contact-card").contains("test@email.com");
    cy.get(".contact-grid .contact-card").contains("www.test.com");

    //Checking than contact added without website data.
    cy.get(".contact-grid .contact-card")
      .last()
      .find(".contact-list-wrapper .contact-line")
      .its("length")
      .should("be.equal", 4);
  });

  it("Checking that contact added without website data", () => {
    // Setting values and checking that it is assigned.
    cy.setValue("#name", "Name");
    cy.checkValue("#name", "Name");
    cy.setValue("#lastName", "lastName");
    cy.checkValue("#lastName", "lastName");
    cy.setValue("#phone", "27272727");
    cy.checkValue("#phone", "27272727");
    cy.setValue("#email", "test@email.com");
    cy.checkValue("#email", "test@email.com");

    // Submit form
    cy.get(".submit-btn").click();

    // Checking length of html collection.
    cy.get(".contact-grid .contact-card")
      .its("length")
      .should("be.equal", 2);

    // Checking that element contains added contact data
    cy.get(".contact-grid .contact-card").contains("Name lastName");
    cy.get(".contact-grid .contact-card").contains("27272727");
    cy.get(".contact-grid .contact-card").contains("test@email.com");

    //Checking than contact added without website data.
    cy.get(".contact-grid .contact-card")
      .last()
      .find(".contact-list-wrapper .contact-line")
      .its("length")
      .should("be.equal", 3);
  });

  it("Checking that delete button work and delete correct contact card", () => {
    // Verifying that the contact card at index 0 is a contact card with website data.
    cy.get(".contact-grid .contact-card")
      .eq(0)
      .find(".contact-line")
      .its("length")
      .should("be.equal", 4);

    //Deleting contact card with website data.
    cy.get(".contact-grid .contact-card")
      .eq(0)
      .find(".delete-btn")
      .contains("delete")
      .click();

    // Checking that contact card is deleted.
    cy.get(".contact-grid .contact-card")
      .its("length")
      .should("be.equal", 1);

    // verification of the contact card remaining no site data.
    cy.get(".contact-grid .contact-card")
      .find(".contact-line")
      .its("length")
      .should("be.equal", 3);
  });
});
