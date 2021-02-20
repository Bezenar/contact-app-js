<template>
  <div id="form" class="mb-2 mt-2">
    <div class="card mb-2 mr-auto ml-auto" style="max-width: 50%;">
      <div class="card-body pt-2 pb-2">
        <form action="#" method="POST" class="mt-2 mb-2">
          <div class="row mb-1 justify-content-center">
            <div class="col-5">
              <label
                for="name"
                class="input-group-text text-light mb-1 d-flex justify-content-center"
                :class="name.error ? `bg-danger` : `bg-info`"
              >
                Name
              </label>
              <input
                @focus="name.error = false"
                type="text"
                class="form-control"
                name="name"
                id="name"
                v-model="name.value"
              />
            </div>
            <div class="col-5">
              <label
                for="lastName"
                class="input-group-text text-light mb-1 d-flex justify-content-center"
                :class="lastName.error ? `bg-danger` : `bg-info`"
              >
                Last name
              </label>
              <input
                @focus="lastName.error = false"
                type="text"
                class="form-control"
                name="lastName"
                id="lastName"
                v-model="lastName.value"
              />
            </div>
          </div>
          <div class="row mb-1 justify-content-center">
            <div class="col-5">
              <label
                for="email"
                class="input-group-text bg-info text-light mb-1 d-flex justify-content-center"
                :class="email.error ? `bg-danger` : `bg-info`"
              >
                Email
              </label>
              <input
                @focus="email.error = false"
                type="email"
                class="form-control"
                name="email"
                id="email"
                v-model="email.value"
              />
            </div>
            <div class="col-5">
              <label
                for="phone"
                class="input-group-text bg-info text-light mb-1 d-flex justify-content-center"
                :class="phone.error ? `bg-danger` : `bg-info`"
              >
                Phone
              </label>
              <input
                @focus="phone.error = false"
                type="text"
                class="form-control"
                name="phone"
                id="phone"
                v-model="phone.value"
              />
            </div>
          </div>
          <div class="row mb-1 justify-content-center">
            <div class="col-5">
              <label
                for="website"
                class="input-group-text bg-info text-light mb-1 d-flex justify-content-center"
                :class="website.error ? `bg-danger` : `bg-info`"
              >
                Website
              </label>
              <input
                @focus="website.error = false"
                type="text"
                class="form-control"
                name="website"
                id="website"
                v-model="website.value"
              />
            </div>
            <div class="col-5">
              <label
                for="category"
                class="input-group-text bg-info text-light mb-1 d-flex justify-content-center"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                class="form-control"
                v-model="category"
              >
                <option class="d-flex justify-content-center" value="Friends"
                  >Friends</option
                >
                <option class="d-flex justify-content-center" value="Work"
                  >Work</option
                >
                <option class="d-flex justify-content-center" value="Family"
                  >Family</option
                >
              </select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col d-flex flex-row-reverse">
              <button
                class="btn-reset btn btn-danger"
                @click.prevent="resetForm"
              >
                Reset form
              </button>
            </div>
            <div class="col">
              <button class="submit-btn btn btn-info" @click.prevent="onSubmit">
                Add contact
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//* Imporе JS class
import Contact from "./../classes/contactClass";
//* Imporе regular expressions
import regex from "./../helpers/regex";
//* Imporе validator js functions.
import { isEmail, isURL } from "validator";

export default {
  name: "Form",
  data() {
    return {
      name: {
        value: "",
        error: false
      },
      lastName: {
        value: "",
        error: false
      },
      email: {
        value: "",
        error: false
      },
      phone: {
        value: "",
        error: false
      },
      website: {
        value: "",
        error: false
      },
      category: "Work"
    };
  },
  computed: {
    /**
     * Contacts list from store.
     */
    contacts() {
      return this.$store.getters.getAllContacts;
    }
  },
  methods: {
    /**
     * Function to create id, based on last element.
     */
    createId(array) {
      return array.length ? Number(array[array.length - 1].id) + 1 : 0;
    },
    addContact() {
      // Creating new contact with class.
      const contact = new Contact(
        this.createId(this.contacts),
        this.name.value,
        this.lastName.value,
        this.phone.value,
        this.email.value,
        this.website.value,
        this.category
      );
      // Call store action.
      this.$store.dispatch("addContact", contact);
    },
    /**
     * Reset all input fields.
     */
    resetForm() {
      this.name.value = "";
      this.lastName.value = "";
      this.phone.value = "";
      this.email.value = "";
      this.website.value = "";
      this.category = "Work";
    },
    /**
     * Function to validate string with regex.
     */
    inputValidationByRegex(fieldObj, regex) {
      if (!regex.test(fieldObj.value)) {
        fieldObj.error = true;
        return false;
      }
      return true;
    },
    /**
     * Function to validate string with validator js methods.
     */
    inputValidationByValidator(method, fieldObj) {
      if (!method(fieldObj.value)) {
        fieldObj.error = true;
        return false;
      }
      return true;
    },
    /**
     * Function to validate form fields.
     */
    formValidation() {
      let result = true;

      /**
       * Checking all fields, with validation functions.
       * If return false, assign to this field with error class.
       */
      if (
        !this.inputValidationByRegex(this.name, regex.name) &&
        this.name.value.length
      )
        this.name.error = true;
      if (
        !this.inputValidationByRegex(this.lastName, regex.lastName) &&
        this.lastName.value.length
      )
        this.lastName.error = true;
      if (!this.inputValidationByValidator(isEmail, this.email))
        this.email.error = true;
      if (!this.inputValidationByRegex(this.phone, regex.phone))
        this.phone.error = true;
      if (this.website.value.length) {
        if (!this.inputValidationByValidator(isURL, this.website))
          this.website.error = true;
      }

      // Checking if one of input fields error is true
      if (
        this.name.error ||
        this.lastName.error ||
        this.phone.error ||
        this.email.error ||
        this.website.error
      )
        result = false;
      return result;
    },
    /**
     * Submit function.
     */
    onSubmit() {
      // Return boolean from validation.
      const validationResult = this.formValidation();
      if (validationResult) {
        // Add contact to local storage.
        this.addContact();
        // Reset from fields.
        this.resetForm();
      }
      return;
    }
  }
};
</script>
