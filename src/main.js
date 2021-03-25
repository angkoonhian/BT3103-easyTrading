  
import Vue from 'vue'
import App from './App.vue'
import Routes from './routes.js'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes:Routes,
  mode:'history'
});

new Vue({
  render: h => h(App),
  store,
  router:router
}).$mount('#app')