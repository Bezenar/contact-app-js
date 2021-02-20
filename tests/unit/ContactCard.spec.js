import { mount, createLocalVue } from "@vue/test-utils";
import ContactCard from "@/components/ContactCard.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const computedData = ["info slot 1", "info slot 2"];

describe("Contact Card", () => {
  it("Check computed data", () => {
    const wrapper = mount(ContactCard, {
      propsData: {
        id: 1,
        fullname: "Tom Lee",
        phone: "27272727",
        email: "test@mail.com",
        website: "www.test.com"
      }
    });
    expect(wrapper.vm.lines).toEqual([
      "Tom Lee",
      "27272727",
      "test@mail.com",
      "www.test.com"
    ]);
  });
  it("Checking elements render text from computed properties", () => {
    const wrapper = mount(ContactCard, {
      computed: {
        lines: () => computedData
      }
    });
    for (let i = 0; i < wrapper.findAll(".contact-line").length; i++) {
      expect(
        wrapper
          .findAll(".contact-line")
          .at(i)
          .text()
      ).toBe(computedData[i]);
    }
  });
  it("Checking elements render count from  computed properties", () => {
    const wrapper = mount(ContactCard, {
      computed: {
        lines: () => computedData
      }
    });
    expect(wrapper.findAll(".contact-line").length).toBe(computedData.length);
  });
  it("Checking delete contact method arguments", async () => {
    const store = new Vuex.Store();
    store.dispatch = jest.fn();
    const wrapper = mount(ContactCard, {
      store,
      localVue,
      propsData: { id: 1 }
    });
    await wrapper.find(".delete-btn").trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith("deleteContact", 1);
  });
});
