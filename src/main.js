import { createApp } from 'vue'
import App from './App.vue'
import Routes from'./routes.js';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const myRouter = new VueRouter({
    routes: Routes,
    mode: 'history'
})

new Vue({
    render: h => h(App),
    router:myRouter
}).$mount('#app')

