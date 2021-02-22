<template>
  <div id="app">
    <Video></Video>
    <router-view class="router" style="margin-bottom: 50px" />
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item :to="'/' + item.url" v-for="item in arr" :icon="item.icon" :key="item.name">{{ item.name }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Video from "./components/common/video";
export default {
  data() {
    return {
      arr: [
        { name: "首页", icon: "home-o", url: "index" },
        // { name: "排行", icon: "fire-o", url: "ranking" },
        { name: "充值", icon: "balance-pay", url: "recharge" }
        // { name: "我的", icon: "user-circle-o", url: "me" }
      ],
      active: 0
    };
  },
  components: { Video },
  methods: {},
  watch: {
    $route: {
      handler: function(val) {
        if (val.name) {
          let i = this.arr.findIndex((r) => r.url === val.name);
          if (i === -1) return;
          this.active = i;
        }
      },
      immediate: true
    }
  },
  async mounted() {
    // 查询用户信息
    let data = await this.$post("user/info", {}, true);
    data = data.data;
    this.$store.dispatch("user/updateUser", data);
    // 积分
    let point = await this.$get(`userPoint/info?userId=${data.userId}`, {}, true);
    this.$store.dispatch("user/updatePoint", point.data.point);
    // 游戏币
    let coin = await this.$get(`userCoin/info?userId=${data.userId}`, {}, true);
    this.$store.dispatch("user/updateCoit", coin.data.num);
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .router {
    flex: 1;
    height: inherit;
  }
}
</style>
