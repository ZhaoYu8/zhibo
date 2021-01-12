import Home from '../page/index/index.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: Home,
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../page/index/index.vue'),
  },
  {
    path: '/pushLevelDetail',
    name: 'pushLevelDetail',
    component: () => import(/* webpackChunkName: "pushLevelDetail" */ '../page/pushLevelDetail/index.vue'),
  },
  {
    path: '/doll',
    name: 'doll',
    component: () => import(/* webpackChunkName: "doll" */ '../page/doll/index.vue'),
  },
];

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes,
});

export default router;
