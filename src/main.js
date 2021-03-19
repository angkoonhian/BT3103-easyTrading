  
import Vue from 'vue'
import App from './App.vue'
import Routes from './routes.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes:Routes,
  mode:'history'
});

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')