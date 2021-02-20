import Contact from "@/classes/contactClass.js";
const contact = new Contact(
  1,
  "Tom",
  "Lee",
  "27272727",
  "test@email.com",
  "www.test.com"
);
describe("Contact class", () => {
  it("Checking assigning name at contact class", () => {
    expect(contact.name).toBe("Tom");
  });
  it("Checking assigning last name at contact class", () => {
    expect(contact.lastName).toBe("Lee");
  });
  it("Checking assigning phone at contact class", () => {
    expect(contact.phone).toBe("27272727");
  });
  it("Checking assigning email at contact class", () => {
    expect(contact.email).toBe("test@email.com");
  });
  it("Checking assigning website at contact class", () => {
    expect(contact.website).toBe("www.test.com");
  });
  it("Checking get full name method from contact class", () => {
    expect(contact.fullName).toBe("Tom Lee");
  });
});
