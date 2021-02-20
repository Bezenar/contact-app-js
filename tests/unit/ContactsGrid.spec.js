import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ContactsGrid from "@/components/ContactsGrid.vue";

const localVue = createLocalVue();
const CONTACTS = [
  {
    name: "contact 1",
    category: "Work"
  },
  {
    name: "contact 2",
    category: "Friends"
  },
  {
    name: "contact 3",
    category: "Family"
  }
];
const resetFilters = async () => {
  await wrapper.find("[data-filter=All").trigger("click");
  expect(wrapper.vm.filter).toBe("All");
};
localVue.use(Vuex);
const store = new Vuex.Store({
  state: {
    contacts: CONTACTS
  },
  getters: {
    getAllContacts: ({ contacts }) => contacts,
    getWorkContacts: ({ contacts }) =>
      contacts.filter(contact => contact.category === "Work"),
    getFamilyContacts: ({ contacts }) =>
      contacts.filter(contact => contact.category === "Family"),
    getFriendsContacts: ({ contacts }) =>
      contacts.filter(contact => contact.category === "Friends")
  }
});
const wrapper = mount(ContactsGrid, {
  store,
  localVue
});
describe("ContactsGrid", () => {
  it("Checking computed property data", () => {
    expect(wrapper.vm.contacts).toEqual(CONTACTS);
  });
  it("Checking elements render count from computed properties", () => {
    expect(wrapper.findAll(".contact-card").length).toBe(
      store.state.contacts.length
    );
  });
  it("Check filters", async () => {
    expect(wrapper.vm.filter).toBe("All");
    expect(
      wrapper.vm.buttons.find(btn => btn.value === "All").active
    ).toBeTruthy();
    expect(wrapper.findAll(".contact-card").length).toBe(3);

    await wrapper.find("[data-filter=Family").trigger("click");
    expect(wrapper.findAll(".contact-card").length).toBe(1);
    expect(
      wrapper.vm.buttons.find(btn => btn.value === "Family").active
    ).toBeTruthy();

    await resetFilters();

    await wrapper.find("[data-filter=Friends").trigger("click");
    expect(wrapper.findAll(".contact-card").length).toBe(1);
    expect(
      wrapper.vm.buttons.find(btn => btn.value === "Friends").active
    ).toBeTruthy();

    await resetFilters();

    await wrapper.find("[data-filter=Work").trigger("click");
    expect(wrapper.findAll(".contact-card").length).toBe(1);
    expect(
      wrapper.vm.buttons.find(btn => btn.value === "Work").active
    ).toBeTruthy();
  });
});
