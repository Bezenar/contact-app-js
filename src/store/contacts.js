/**
 * Import JS class.
 */
import Contact from "../classes/contactClass";

export default {
  state: {
    contacts: []
  },
  mutations: {
    // eslint-disable-next-line no-unused-vars
    /**
     * @param {Object} state.
     * @param {Array} contactsFromLocalStorage: object array with contacts.
     * @description
     * Set contacts from local storage to store state.
     */
    SET_CONTACTS_TO_STATE(state, contactsFromLocalStorage) {
      state.contacts = contactsFromLocalStorage;
    },
    /**
     * @param {Object} state.
     * @param {Number} index: Contact index.
     * @description
     * Mutation to delete contact by id, from store.
     */
    DELETE_CONTACT(state, index) {
      state.contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    /**
     * @param {Object} state
     * @param {Object} contact : new contact, created with Contact class.
     * @description
     * Mutation to add new contact, and reset localStorage.
     */
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    /**
     * @param {Object} state.
     * @description
     * Mutaton to clear store state.
     */
    CLEAR_CONTACT_LIST(state) {
      state.contacts = [];
    }
  },
  actions: {
    /**
     * @description
     * Action to get all contacts from local storage, and set it to store state.
     */
    geContactsFromLocalStorage({ commit }) {
      // Checking local storage data.
      if (localStorage.getItem("contacts")) {
        /**
         * @description
         * Local storage data parsing.
         * And creating new array with contacts, using JS class Contact
         */
        const users = JSON.parse(localStorage.getItem("contacts")).reduce(
          (acc, contact) => {
            const id = acc.length ? acc[acc.length - 1].id + 1 : 0;
            acc.push(
              new Contact(
                id,
                contact.name,
                contact.lastName,
                contact.phone,
                contact.email,
                contact.website,
                contact.category
              )
            );
            return acc;
          },
          []
        );
        // Call mutation.
        return commit("SET_CONTACTS_TO_STATE", users);
      }
    },
    /**
     * @param {Number} id: Contact index.
     * @description
     * Action to delete contact from store state and clear local storage.
     */
    deleteContact({ commit, state }, id) {
      // Find contact by id.
      const contact = state.contacts.find(el => el.id === id);
      // Find index for deleting contact in contacts array
      const index = state.contacts.indexOf(contact);
      // Clear local storage.
      localStorage.removeItem("contacts");
      // Call mutation.
      commit("DELETE_CONTACT", index);
    },
    /**
     * @param {*} contact : new contact, created with Contact class.
     * @description
     * Action to call mutation for add contact to store state, and reset local storage.
     */
    addContact({ commit }, contact) {
      // Clear local storage.
      localStorage.removeItem("contacts");
      // Call mutation.
      commit("ADD_CONTACT", contact);
    },
    /**
     * @description
     * Action to call mutation for clear store state, and reset local storage.
     */
    clearContactList({ commit }) {
      localStorage.removeItem("contacts");
      commit("CLEAR_CONTACT_LIST");
    }
  },
  getters: {
    /**
     * @param {Object} state.
     * @returns -> all contacts from store.
     */
    getAllContacts: state => state.contacts,
    /**
     * @param {Object} state.
     * @return -> contacts, in category work contacts.
     */
    getWorkContacts: state =>
      state.contacts.filter(contact => contact.category === "Work"),
    /**
     * @param {Object} state.
     * @return -> contacts, in category family contacts.
     */
    getFamilyContacts: state =>
      state.contacts.filter(contact => contact.category === "Family"),
    /**
     * @param {Object} state.
     * @return -> contacts, in category friends contacts.
     */
    getFriendsContacts: state =>
      state.contacts.filter(contact => contact.category === "Friends")
  }
};
