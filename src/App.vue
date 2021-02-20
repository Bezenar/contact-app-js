<template>
  <div
    class="wrapper pb-5"
    style="background-color: #80888f; min-width: 100vw; min-height: 100vh;"
  >
    <nav class="navbar navbar-light bg-white">
      <div class="container-md">
        <h2 class="text-center text-info navbar-brand">Contact list</h2>
        <div class="d-flex">
          <span class="text-danger mt-auto mb-auto mr-4">
            Clear local storage
          </span>
          <button
            variant="info"
            class="btn btn-info mr-4 rounded-circle"
            data-type="tooltip"
            v-b-tooltip.hover.bottom
            title="All contacts saved on your browser local storage. If you want to delete saved contacts press clear"
          >
            ?
          </button>
          <button
            class="btn-clear btn btn-outline-danger"
            @click="clearLocalStorage"
          >
            Clear
          </button>
        </div>
      </div>
    </nav>
    <Form />
    <ContactsGrid />
  </div>
</template>

<script>
// * VUE COMPONENTS
import Form from "./components/Form.vue";
import ContactsGrid from "./components/ContactsGrid.vue";

export default {
  name: "App",
  components: {
    ContactsGrid,
    Form
  },
  methods: {
    /**
     * Function to reset local storage.
     */
    clearLocalStorage() {
      localStorage.removeItem("contacts");
      this.$store.dispatch("clearContactList");
    }
  },
  mounted() {
    // Get contacts from store.
    this.$store.dispatch("geContactsFromLocalStorage");
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  min-height: 100vh;
  min-width: 100%;
}
</style>
