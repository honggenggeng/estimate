// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import ZyHeader from './module/ZyHead'
import axios from 'axios' // 1、在这里引入axios





Vue.config.productionTip = false
Vue.component('zyHeader',ZyHeader)
Vue.prototype.$axios = axios;   // 2、在vue中使用axios



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
