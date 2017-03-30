import Vue from 'vue';
import VueRouter from 'vue-router';
import common from './common.vue';
import index from './pages/index.vue';
import work from './pages/work.vue';
import article from './pages/article.vue';
import gallary from './pages/gallary.vue';
import about from './pages/about.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: common,
      children: [
        {
          path: '/',
          name: 'INDEX',
          component: index
        },
        {
          path: '/work',
          name: 'WORK',
          component: work
        },
        {
          path: '/article',
          name: 'ARTICLE',
          component: article
        },
        {
          path: '/gallary',
          name: 'GALLARY',
          component: gallary
        },
        {
          path: '/about',
          name: 'ABOUT',
          component: about
        }
      ]
    }
  ]
});

new Vue({
  el: '#app',
  router
});
