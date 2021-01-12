import App from './App.vue';
import router from './router';
import http from './api/index';
import index from './components/index'
import './common/css/common.scss';
import 'amfe-flexible';
import { vueBaberrage } from 'vue-baberrage';
Vue.use(vueBaberrage);
Vue.use(index);
Vue.config.productionTip = false;
Object.assign(Vue.prototype, {
  $post: http.post,
  $get: http.get,
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
