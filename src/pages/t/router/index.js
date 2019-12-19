import Vue from 'vue/dist/vue.esm.js';
import Router from 'vue-router'
import Test from '../components/Test'
import Home from '../components/home'
Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'Test',
        component: Test
      },
      {
        path: '/home',
        name: 'Home',
        component: Home
      }
    ]
  })
  