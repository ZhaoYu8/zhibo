import Icon from "./common/Icon.vue";
import Header from "./common/header.vue";
import recharge from "./common/recharge.vue";
import rechargeCard from "./common/rechargeCard.vue";


const obj = {
  install: function(Vue) {
    Vue.component("Icon", Icon);
    Vue.component("Header", Header);
    Vue.component("Recharge", recharge);
    Vue.component("RechargeCard", rechargeCard);
  }
};
export default obj;
