import Icon from "./common/Icon.vue";
import Header from "./common/header.vue";
import recharge from "./common/recharge.vue";


const obj = {
  install: function(Vue) {
    Vue.component("Icon", Icon);
    Vue.component("Header", Header);
    Vue.component("Recharge", recharge);
  }
};
export default obj;
