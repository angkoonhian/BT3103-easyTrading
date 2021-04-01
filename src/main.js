import Vue from "vue";
import App from "./App.vue";
import Routes from "./routes.js";
import VueRouter from "vue-router";
import Beufy from "buefy";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "buefy/dist/buefy.css";
import firebase from "firebase";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import VueChatScroll from "vue-chat-scroll";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Beufy);
Vue.use(VueChatScroll);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

export const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthtenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthtenticated) {
    next("/login");
  } else {
    next();
  }
});

let app;

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (user == null) {
    localStorage.setItem("login", false);
  } else {
    localStorage.setItem("login", true);
  }
  if (!app) {
    app = new Vue({
      render: (h) => h(App),
      router,
      vuetify: new Vuetify(),
      icons: {
        iconfont: "mdiSvg",
      },
    }).$mount("#app");
  }
});
