
import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue';
import router from './router'
import { Tabbar, TabItem } from 'mint-ui';
// import axios from 'axios'
import $http from '../../utils/http';
import '../../utils/oss';

// import $route from '../../mixins/route'
Vue.prototype.$http = $http

import 'mint-ui/lib/style.css';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
import $toast from '../../components/toast';
Vue.use($toast);
// import $confirm from '../../components/confirm';
// Vue.use($confirm);

window.vm = new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  }
})

