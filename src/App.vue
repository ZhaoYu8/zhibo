<template>
  <div id="app">
    <Video></Video>
    <keep-alive>
      <router-view class="router" style="margin-bottom: 50px" />
    </keep-alive>
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
  computed: {
    user() {
      return this.$store.state.user.user || {};
    }
  },
  methods: {
    async init() {
      await this.queryUserInfo();
      this.queryUser();
    },
    // 查询用户信息
    async queryUserInfo() {
      let data = await this.$post("user/info", {}, true);
      this.$store.dispatch("user/updateUser", data.data);
    },
    // // 查询用户积分
    // async queryUserPoint() {
    //   let point = await this.$get(`userPoint/info?userId=${this.user.userId}`, {}, true);
    //   this.$store.dispatch("user/updatePoint", point.data.point);
    // },
    // // 查询用户游戏币
    // async queryUserCoin() {
    //   let coin = await this.$get(`userCoin/info?userId=${this.user.userId}`, {}, true);
    //   this.$store.dispatch("user/updateCoin", coin.data.num);
    // },
    // 查询用户游戏币和积分
    async queryUser() {
      let { data } = await this.$get(`user/gameInfo?userId=${this.user.userId}`, {}, true);
      this.$store.dispatch("user/updatePoint", data.userPoint.point);
      this.$store.dispatch("user/updateCoin", data.userCoin.num);
    },

    GetQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
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
  mounted() {
    window.addEventListener(
      "popstate",
      () => {
        if (localStorage.getItem("pay")) {
          this.init();
        }
        localStorage.setItem("pay", false);
      },
      false
    );
    this.init();
    this.$bus.$on("globalInit", () => {
      this.queryUserInfo();
      this.queryUser();
    });
    localStorage.setItem("token", this.GetQueryString("token"));
    console.log(this.GetQueryString("token"));
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .router {
    flex: 1;
    height: inherit;
  }
}
</style>
