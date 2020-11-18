import Home from '../page/pushLevel/index.vue';

const routes = [
  {
    path: '/',
    name: 'pushLevel',
    component: Home,
  },
  {
    path: '/pushLevel',
    name: 'pushLevel',
    component: () => import(/* webpackChunkName: "index" */ '../page/pushLevel/index.vue'),
  },,
  {
    path: '/pushLevelDetail',
    name: 'pushLevelDetail',
    component: () => import(/* webpackChunkName: "pushLevelDetail" */ '../page/pushLevelDetail/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
