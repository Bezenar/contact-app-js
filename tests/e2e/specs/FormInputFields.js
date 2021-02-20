describe("Testing form input fields UI. And validation", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    // Clear local storage.
    if (localStorage.getItem("contacts")) {
      cy.clearLocalStorage("contacts");
    }
    //Setting website value, for adding error class on submit.
    //?? Website value is not required field
    cy.get("#website").type("website");
    cy.get("#website").should("have.value", "website");
    // Submiting form for adding error classes
    cy.get(".submit-btn").click();
  });

  it("Checking name input field", () => {
    // Checking error class on label.
    cy.get("[for=name]").should("have.class", "bg-danger");

    // Focus on element and checking that error class has been removed.
    cy.get("#name").focus();
    cy.get("[for=name]").should("not.have.class", "bg-danger");

    // Setting a value and checking that it is assigned.
    cy.get("#name").type("UserName");
    cy.get("#name").should("have.value", "UserName");
  });

  it("Checking last name input field", () => {
    // Checking error class on label.
    cy.get("[for=lastName]").should("have.class", "bg-danger");

    // Focus on element and checking that error class has been removed.
    cy.get("#lastName").focus();
    cy.get("[for=lastName]").should("not.have.class", "bg-danger");

    // Setting a value and checking that it is assigned.
    cy.get("#lastName").type("LastName");
    cy.get("#lastName").should("have.value", "LastName");
  });

  it("Checking email input field", () => {
    // Checking error class on label.
    cy.get("[for=email]").should("have.class", "bg-danger");

    // Focus on element and checking that error class is removed.
    cy.get("#email").focus();
    cy.get("[for=email]").should("not.have.class", "bg-danger");

    // Setting incorrect value and checking that it is assigned.
    cy.get("#email").type("email");
    cy.get("#email").should("have.value", "email");

    /**
     * Submiting form for checking that validation with regex is work.
     * And error class is stayed at place.
     */
    cy.get(".submit-btn").click();
    cy.get("[for=email]").should("have.class", "bg-danger");

    // Focus on element and checking that error class has been removed.
    cy.get("#email").focus();
    cy.get("[for=email]").should("not.have.class", "bg-danger");

    // Clear email value.
    cy.get("#email").clear();

    //Set correct calue and checking that it is assigned.
    cy.get("#email").type("test@test.com");
    cy.get("#email").should("have.value", "test@test.com");
  });

  it("Checking phone input field", () => {
    // Checking error class on label.
    cy.get("[for=phone]").should("have.class", "bg-danger");

    // Focus on element and checking that error class is removed.
    cy.get("#phone").focus();
    cy.get("[for=phone]").should("not.have.class", "bg-danger");

    // Setting incorrect value with letters and check that it is assigned.
    cy.get("#phone").type("some numbers");
    cy.get("#phone").should("have.value", "some numbers");

    /**
     * Submit form for checking that validation with regex is work.
     * And error class stayed at place.
     */
    cy.get(".submit-btn").click();
    cy.get("[for=phone]").should("have.class", "bg-danger");

    // Focus on element and checking that error class is removed.
    cy.get("#phone").focus();
    cy.get("[for=phone]").should("not.have.class", "bg-danger");

    // Clear phone value fields.
    cy.get("#phone").clear();

    // Setting incorrect value with numbers and checking that it is assigned.
    cy.get("#phone").type("27");
    cy.get("#phone").should("have.value", "27");

    /**
     * Submit form for checking that validation with regex is work.
     * And error class is assigned.
     */
    cy.get(".submit-btn").click();
    cy.get("[for=phone]").should("have.class", "bg-danger");

    // Focus on element and checking that error class is removed.
    cy.get("#phone").focus();
    cy.get("[for=phone]").should("not.have.class", "bg-danger");

    // Setting correct value with numbers and checking that it is assigned.
    cy.get("#phone").type("1231");
    cy.get("#phone").should("have.value", "271231");
  });

  it("Checking website input field", () => {
    // Checking error class on label.
    cy.get("[for=website]").should("have.class", "bg-danger");

    // Focus on element and checking that error class has been removed.
    cy.get("#website").focus();
    cy.get("[for=website]").should("not.have.class", "bg-danger");

    //Clear webiste value.
    cy.get("#website").clear();

    //Clear webiste value.
    cy.get("#website").clear();

    /**
     * Setting correct value.
     * And checking that it is assigned.
     */
    cy.get("#website").type("www.site.com");
    cy.get("#website").should("have.value", "www.site.com");
  });

  it("Checking select options", () => {
    // Setting option Friends and checking that is selected.
    cy.get("#category").select("Friends");
    cy.get("#category").should("have.value", "Friends");

    // Setting option Family and checking that is selected.
    cy.get("#category").select("Family");
    cy.get("#category").should("have.value", "Family");

    // Setting option Work and checking that is selected.
    cy.get("#category").select("Work");
    cy.get("#category").should("have.value", "Work");

    //Submit form.
    cy.get(".submit-btn").click();
  });
});
