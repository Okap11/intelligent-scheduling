import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
