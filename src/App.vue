<template>
  <div id="app">
    <router-view class="router" />
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item :to="'/' + item.url" v-for="item in arr" :icon="item.icon" :key="item.name">{{ item.name }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [
        { name: "首页", icon: "home-o", url: "index" },
        { name: "排行", icon: "fire-o", url: "ranking" },
        { name: "充值", icon: "balance-pay", url: "recharge" },
        { name: "我的", icon: "user-circle-o", url: "me" }
      ],
      active: 0
    };
  },
  methods: {
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
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .router {
    margin-bottom: 50px;
    flex: 1;
    height: inherit;
  }
}
</style>
