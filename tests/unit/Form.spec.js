import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Form from "@/components/Form.vue";
import { isEmail } from "validator";
import Contact from "@/classes/contactClass.js";

const localVue = createLocalVue();
localVue.use(Vuex);
const CONTACTS = [
  new Contact(
    "1",
    "Oliver",
    "Twist",
    "22222222",
    "test@email.com",
    "www.test.com",
    "Work"
  ),
  new Contact(
    "2",
    "Tony",
    "Stark",
    "22222222",
    "test@email.com",
    "www.test.com",
    "Family"
  )
];
const store = new Vuex.Store({
  state: {
    contacts: CONTACTS
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
    }
  },
  actions: {
    addContact({ commit }, contact) {
      commit("ADD_CONTACT", contact);
    }
  },
  getters: {
    getAllContacts: state => state.contacts
  }
});

describe("Form", () => {
  it("Checking computed property data", () => {
    const wrapper = mount(Form, {
      computed: {
        contacts: () => CONTACTS
      }
    });
    expect(wrapper.vm.contacts).toEqual(CONTACTS);
  });

  it("Checking name v-model directive", async () => {
    const wrapper = mount(Form);
    expect(wrapper.vm.$data.name.value).toBe("");

    await wrapper.find(".submit-btn").trigger("click");
    expect(wrapper.find("[for=name]").classes()).toContain("bg-danger");
    expect(wrapper.vm.name.error).toBeTruthy();

    await wrapper.find("#name").trigger("focus");
    expect(wrapper.find("[for=name]").classes("bg-danger")).toBeFalsy();
    expect(wrapper.vm.name.error).toBeFalsy();

    await wrapper.find("#name").setValue("name");
    expect(wrapper.find("#name").element.value).toBe("name");
    expect(wrapper.vm.$data.name.value).toBe("name");
  });

  it("Checking last name v-model directive", async () => {
    const wrapper = mount(Form);
    expect(wrapper.vm.$data.lastName.value).toBe("");

    await wrapper.find(".submit-btn").trigger("click");
    expect(wrapper.find("[for=lastName]").classes()).toContain("bg-danger");
    expect(wrapper.vm.lastName.error).toBeTruthy();

    await wrapper.find("#lastName").trigger("focus");
    expect(wrapper.find("[for=lastName]").classes("bg-danger")).toBeFalsy();
    expect(wrapper.vm.lastName.error).toBeFalsy();

    await wrapper.find("#lastName").setValue("last name");
    expect(wrapper.find("#lastName").element.value).toBe("last name");
    expect(wrapper.vm.$data.lastName.value).toBe("last name");
  });

  it("Checking phone v-model directive", async () => {
    const wrapper = mount(Form);
    expect(wrapper.vm.$data.phone.value).toBe("");

    await wrapper.find(".submit-btn").trigger("click");
    expect(wrapper.find("[for=phone]").classes()).toContain("bg-danger");
    expect(wrapper.vm.phone.error).toBeTruthy();

    await wrapper.find("#phone").trigger("focus");
    expect(wrapper.find("[for=phone]").classes("bg-danger")).toBeFalsy();
    expect(wrapper.vm.phone.error).toBeFalsy();

    await wrapper.find("#phone").setValue("phone");
    expect(wrapper.find("#phone").element.value).toBe("phone");
    expect(wrapper.vm.$data.phone.value).toBe("phone");
  });

  it("Checking email v-model directive", async () => {
    const wrapper = mount(Form);
    expect(wrapper.vm.$data.email.value).toBe("");

    await wrapper.find(".submit-btn").trigger("click");
    expect(wrapper.find("[for=email]").classes()).toContain("bg-danger");
    expect(wrapper.vm.email.error).toBeTruthy();

    await wrapper.find("#email").trigger("focus");
    expect(wrapper.find("[for=email]").classes("bg-danger")).toBeFalsy();
    expect(wrapper.vm.email.error).toBeFalsy();

    await wrapper.find("#email").setValue("email");
    expect(wrapper.find("#email").element.value).toBe("email");
    expect(wrapper.vm.$data.email.value).toBe("email");
  });

  it("Checking website v-model directive", async () => {
    const wrapper = mount(Form);
    expect(wrapper.vm.$data.website.value).toBe("");

    wrapper.find("#website").setValue("someValue");
    await wrapper.find(".submit-btn").trigger("click");
    expect(wrapper.find("[for=website]").classes()).toContain("bg-danger");
    expect(wrapper.vm.website.error).toBeTruthy();

    await wrapper.find("#website").trigger("focus");
    wrapper.find("#website").setValue("");
    expect(wrapper.find("[for=website]").classes("bg-danger")).toBeFalsy();
    expect(wrapper.vm.website.error).toBeFalsy();

    await wrapper.find("#website").setValue("website");
    expect(wrapper.find("#website").element.value).toBe("website");
    expect(wrapper.vm.$data.website.value).toBe("website");
  });

  it("Checking reset form method", async () => {
    const wrapper = mount(Form);
    await wrapper.find("#name").setValue("name");
    await wrapper.find("#lastName").setValue("last name");
    await wrapper.find("#phone").setValue("phone");
    await wrapper.find("#email").setValue("email");
    await wrapper.find("#website").setValue("website");

    await wrapper.find(".btn-reset").trigger("click");

    expect(wrapper.vm.$data.name.value).toBe("");
    expect(wrapper.vm.$data.lastName.value).toBe("");
    expect(wrapper.vm.$data.phone.value).toBe("");
    expect(wrapper.vm.$data.email.value).toBe("");
    expect(wrapper.vm.$data.website.value).toBe("");
  });

  it("Cheking input validation by regex", async () => {
    const wrapper = mount(Form);
    const regex = new RegExp("^[A-Za-z0-9]+$");
    await wrapper.find("#name").setValue("name");
    expect(wrapper.vm.inputValidationByRegex(wrapper.vm.name, regex)).toBe(
      true
    );
  });

  it("Cheking input validation by validator js", async () => {
    const wrapper = mount(Form);
    await wrapper.find("#email").setValue("test@email.com");
    expect(
      wrapper.vm.inputValidationByValidator(isEmail, wrapper.vm.email)
    ).toBe(true);
  });

  it("Cheking add contact method", async () => {
    const wrapper = mount(Form, {
      store,
      localVue
    });
    await wrapper.find("#name").setValue("Tom");
    await wrapper.find("#lastName").setValue("Lee");
    await wrapper.find("#phone").setValue("22222222");
    await wrapper.find("#email").setValue("test@email.com");
    await wrapper.find("#website").setValue("www.test.com");

    wrapper.vm.addContact();

    const newContact = new Contact(
      3,
      "Tom",
      "Lee",
      "22222222",
      "test@email.com",
      "www.test.com",
      "Friends"
    );
    const contactArray = [...CONTACTS, newContact];
    expect(store.state.contacts.length).toBe(3);
    store.state.contacts.forEach((contact, index) => {
      expect(contact).toEqual(contactArray[index]);
    });

    wrapper.vm.createId = jest.fn();
    wrapper.vm.addContact();
    expect(wrapper.vm.createId).toHaveBeenCalled();
  });

  it("Checking that main function is called when submit event is initialized", async () => {
    const wrapper = mount(Form);
    wrapper.setMethods({
      onSubmit: jest.fn(() => wrapper.vm.addContact())
    });

    await wrapper.find("#name").setValue("Tom");
    await wrapper.find("#lastName").setValue("Lee");
    await wrapper.find("#phone").setValue("22222222");
    await wrapper.find("#email").setValue("test@email.com");
    await wrapper.find("#website").setValue("www.test.com");

    await wrapper.find(".submit-btn").trigger("click");

    expect(wrapper.vm.onSubmit).toHaveBeenCalled();
  });
  it("Checking that add contact function is called after submit initialization", async () => {
    const wrapper = mount(Form);
    wrapper.setMethods({ addContact: jest.fn() });
    await wrapper.find("#name").setValue("Tom");
    await wrapper.find("#lastName").setValue("Lee");
    await wrapper.find("#phone").setValue("22222222");
    await wrapper.find("#email").setValue("test@email.com");
    await wrapper.find("#website").setValue("www.test.com");

    await wrapper.find(".submit-btn").trigger("click");

    expect(wrapper.vm.addContact).toHaveBeenCalled();
  });
  it(`Checking that reset form function is called after submit initialization 
  and clear all input fields`, async () => {
    const wrapper = mount(Form);
    wrapper.setMethods({ addContact: jest.fn() });

    await wrapper.find("#name").setValue("Tom");
    await wrapper.find("#lastName").setValue("Lee");
    await wrapper.find("#phone").setValue("22222222");
    await wrapper.find("#email").setValue("test@email.com");
    await wrapper.find("#website").setValue("www.test.com");

    await wrapper.find(".submit-btn").trigger("click");

    expect(wrapper.find("#name").element.value).toBe("");
    expect(wrapper.find("#lastName").element.value).toBe("");
    expect(wrapper.find("#phone").element.value).toBe("");
    expect(wrapper.find("#email").element.value).toBe("");
    expect(wrapper.find("#website").element.value).toBe("");
  });
});
