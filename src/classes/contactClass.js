export default class Contact {
  constructor(id, name, lastName, phone, email, website, category) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.website = website;
    this.category = category;
  }
  /**
   * @returns -> contact full name (name + last name);
   */
  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
}
