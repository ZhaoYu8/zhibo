import App from './App.vue';
import router from './router';
import http from './api/index';
import './common/css/common.scss';
Vue.config.productionTip = false;
Object.assign(Vue.prototype, {
  $post: http.post,
  $get: http.get,
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
