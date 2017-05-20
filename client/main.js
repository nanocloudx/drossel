import Vue from 'vue';
import VueRouter from 'vue-router';
import common from './common.vue';
import index from './pages/index.vue';
import work from './pages/work.vue';
import article from './pages/article.vue';
import about from './pages/about.vue';
import playground from './pages/playground.vue';
import playgroundExample from './pages/playground/example.vue';

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
          path: '/about',
          name: 'ABOUT',
          component: about
        },
        {
          path: '/playground',
          name: 'PLAYGROUND',
          component: playground,
        },
        {
          path: '/playground/example',
          name: 'PLAYGROUND // EXAMPLE',
          component: playgroundExample
        }
      ]
    }
  ]
});

// Google Analytics
window.ga = window.ga || function() {
  (window.ga.q = window.ga.q || []).push(arguments);
};
window.ga.l = Number(new Date);
window.ga('create', 'UA-82809079-1', 'auto');

router.afterEach((to) => {
  window.ga('set', 'page', to.path);
  window.ga('send', 'pageview');
});

new Vue({
  el: '#app',
  router
});
