
import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue';
import router from './router'
import { Tabbar, TabItem } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
// import $toast from '../../components/toast';
// Vue.use($toast);

window.vm = new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  }
})

