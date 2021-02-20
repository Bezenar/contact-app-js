<template>
  <div id="contact-grid" class="contact-grid">
    <div
      style="max-width: 50%;"
      class="card pt-2 pb-2 mb-2 mr-auto ml-auto p-0"
    >
      <div class="d-flex justify-content-center">
        <button
          class="btn mr-2"
          v-for="(button, index) in buttons"
          :data-filter="button.value"
          :key="`button-${index}`"
          :class="button.active ? `btn-primary` : ` btn-outline-primary`"
          @click="changeFilter(button.value)"
        >
          {{ button.value }}
        </button>
      </div>
    </div>
    <div style="max-width: 60%;" class="card mr-auto ml-auto">
      <div class="row pt-2 pl-2 pr-2 justify-content-center">
        <ContactCard
          v-for="contact in contacts"
          :key="contact.id"
          :id="contact.id"
          :fullname="contact.fullName"
          :phone="contact.phone"
          :email="contact.email"
          :website="contact.website"
          :category="contact.category"
        />
      </div>
    </div>
  </div>
</template>

<script>
// * Vue Components
import ContactCard from "./ContactCard";
// * Map from vuex
import { mapGetters } from "vuex";

export default {
  name: "ContactsGrid",
  data: () => ({
    buttons: [
      {
        value: "All",
        active: true
      },
      {
        value: "Family",
        active: false
      },
      {
        value: "Friends",
        active: false
      },
      {
        value: "Work",
        active: false
      }
    ],
    filter: "All"
  }),
  components: {
    ContactCard
  },
  computed: {
    ...mapGetters([
      "getAllContacts",
      "getWorkContacts",
      "getFamilyContacts",
      "getFriendsContacts"
    ]),
    /**
     * Computed property for changing filter.
     */
    contacts() {
      if (this.filter === "All") {
        return this.getAllContacts;
      } else if (this.filter === "Work") {
        return this.getWorkContacts;
      } else if (this.filter === "Family") {
        return this.getFamilyContacts;
      } else {
        return this.getFriendsContacts;
      }
    }
  },
  methods: {
    /**
     * Function to change filter.
     */
    changeFilter(val) {
      this.filter = val;
      this.buttons.forEach(btn => (btn.active = false));
      this.buttons.find(btn => btn.value === val).active = true;
    }
  }
};
</script>
