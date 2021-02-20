import { mount } from "@vue/test-utils";
import ContactCardLine from "@/components/ContactCardLine.vue";

describe("ContactCardLine", () => {
  it("Checking props", () => {
    const wrapper = mount(ContactCardLine, {
      propsData: {
        string: "Contact info"
      }
    });
    expect(wrapper.text()).toBe("Contact info");
  });
});
