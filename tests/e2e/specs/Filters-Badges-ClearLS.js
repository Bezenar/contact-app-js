describe("Checking filters", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    // Clear local storage.
    // cy.clearLocalStorage("contacts");
    // Creating contact cards.
    cy.createCard("Work", "Work", "work@email.com", "11111");
    cy.createCard(
      "Friend",
      "Friend",
      "friend@email.com",
      "22222",
      "www.friend.com",
      "Friends"
    );
    cy.createCard(
      "Family",
      "Family",
      "family@email.com",
      "33333",
      "",
      "Family"
    );
  });

  it("Badges", () => {
    // Checking category badge.
    cy.checkBadges(0).contains("Work");
    cy.checkBadges(0).should("have.class", "btn-secondary");
    // Checking category badge.
    cy.checkBadges(1).contains("Friends");
    cy.checkBadges(1).should("have.class", "btn-warning");
    // Checking category badge.
    cy.checkBadges(2).contains("Family");
    cy.checkBadges(2).should("have.class", "btn-info");
  });

  it("Check Work filter", () => {
    // Click on filter button.
    cy.get("[data-filter=Work]").click();

    // Checking that in container grid all elements have work badges.
    cy.checkFilterResult("Work");
  });

  it("Check Family filter", () => {
    // Click on filter button.
    cy.get("[data-filter=Family]").click();

    // Checking that in container grid all elements have work badges.
    cy.checkFilterResult("Family");
  });

  it("Check Friends filter", () => {
    // Click on filter button.
    cy.get("[data-filter=Friends]").click();

    // Checking that in container grid all elements have work badges.
    cy.checkFilterResult("Friends");
  });

  it("Check All filter", () => {
    // Click on filter button.
    cy.get("[data-filter=All]").click();

    // Checking that in container grid is all contact cards.
    cy.get(".contact-card")
      .its("length")
      .should("be.equal", 3);
  });

  it("Check clear button", () => {
    // Check that contact card is rendered.
    cy.get(".contact-card").then(data => {
      [...data].forEach(el => {
        cy.wrap(el).should("be.visible");
      });
    });

    // Click on clear button.
    cy.get(".btn-clear").click();

    // Check that contact cards is deleted.
    cy.get(".contact-card").should("not.be.visible");
  });
});
