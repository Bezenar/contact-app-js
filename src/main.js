import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/index";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

// const users = [
//   {
//     id: 1,
//     name: "user1",
//     lastName: "last1",
//     phone: "phone1",
//     email: "email1",
//     website: "website1"
//   },
//   {
//     id: 2,
//     name: "user2",
//     lastName: "last2",
//     phone: "phone2",
//     email: "email2",
//     website: "website2"
//   },
//   {
//     id: 3,
//     name: "user3",
//     lastName: "last3",
//     phone: "phone3",
//     email: "email3",
//     website: "website3"
//   }
// ];
// localStorage.setItem("users", JSON.stringify(users));
