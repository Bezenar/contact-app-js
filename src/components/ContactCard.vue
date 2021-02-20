<template>
  <div class="col-4 contact-card mb-2" :data-category="category">
    <div class="contact-list-wrapper border border-dark rounded text-center">
      <div
        class="category-container btn text-white disabled"
        :class="bgColorForCategoryBadge"
      >
        {{ category }}
      </div>
      <ContactCardLine
        v-for="(line, index) in lines"
        :key="index"
        :string="line"
      />
      <div>
        <button
          class="delete-btn btn btn-outline-danger mb-2"
          @click="deleteContact(id)"
        >
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// * VUE COMPONENTS
import ContactCardLine from "./ContactCardLine";

export default {
  name: "ContactCard",
  props: {
    id: Number,
    fullname: String,
    phone: String,
    email: String,
    website: String,
    category: String
  },
  components: {
    ContactCardLine
  },
  computed: {
    /**
     * Creating new array for v-for directive.
     */
    lines() {
      return Object.keys(this.$props).reduce((acc, prop) => {
        if (prop !== "id" && prop !== "category") {
          if (prop === "website") {
            if (this.$props[prop].length) {
              acc.push(this.$props[prop]);
            }
          } else {
            acc.push(this.$props[prop]);
          }
        }
        return acc;
      }, []);
    },
    /**
     * Category changing background color.
     */
    bgColorForCategoryBadge() {
      return this.$props.category === "Work"
        ? "btn-secondary"
        : this.$props.category === "Family"
        ? "btn-info"
        : "btn-warning";
    }
  },
  methods: {
    /**
     * Function to delete contact.
     */
    deleteContact(id) {
      this.$store.dispatch("deleteContact", id);
    }
  }
};
</script>

<style scoped>
p {
  margin: 0.5rem 0;
}
.contact-list-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
.category-container {
  position: absolute;
  top: 0.2rem;
  left: 0.5rem;
}
</style>
