import Home from "../page/index/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Home
  },
  {
    path: "/index", // 首页
    name: "index",
    component: () => import(/* webpackChunkName: "index" */ "../page/index/index.vue")
  },
  {
    path: "/ranking", // 排行
    name: "ranking",
    component: () => import(/* webpackChunkName: "ranking" */ "../page/ranking/index.vue")
  },
  {
    path: "/recharge", // 充值
    name: "recharge",
    component: () => import(/* webpackChunkName: "recharge" */ "../page/recharge/index.vue")
  },
  {
    path: "/me", // 我的
    name: "me",
    component: () => import(/* webpackChunkName: "me" */ "../page/me/index.vue")
  },
  {
    path: "/pushLevelDetail", // 推币机
    name: "pushLevelDetail",
    component: () => import(/* webpackChunkName: "pushLevelDetail" */ "../page/pushLevelDetail/index.vue")
  },
  {
    path: "/doll", // 娃娃机
    name: "doll",
    component: () => import(/* webpackChunkName: "doll" */ "../page/doll/index.vue")
  },
  {
    path: "/pay", // 支付页
    name: "pay",
    component: () => import(/* webpackChunkName: "pay" */ "../page/pay/index.vue")
  }
];

const router = new VueRouter({
  mode: "",
  base: process.env.BASE_URL,
  routes
});

export default router;
