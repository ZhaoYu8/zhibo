<template>
  <div class="recharge">
    <Header> <span class="f-b">充值</span></Header>
    <van-tabs v-model="active" animated swipeable background="transparent" color="#1989fa" title-active-color="#1989fa">
      <van-tab v-for="item in arr" :title="item.label" :key="item.label">
        <rechargeCard :item="item.data" class="box" @click="moneyClose"></rechargeCard>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        {
          label: "游戏币",
          data: []
        }
      ]
    };
  },
  computed: {
    user() {
      let user = this.$store.state.user.user || {};
      let recharge = user.recharge;
      return recharge ? recharge.split("").map((r) => Number(r)) : [];
    }
  },
  watch: {
    user: {
      handler() {
        let onceMoney = [
          { type: 2, money: 5, num: 200, bestowNum: 0 },
          { type: 2, money: 6, num: 120, bestowNum: 0 },
          { type: 2, money: 30, num: 600, bestowNum: 0 },
          { type: 2, money: 50, num: 1000, bestowNum: 0 },
          { type: 2, money: 100, num: 2000, bestowNum: 500 },
          { type: 2, money: 200, num: 4000, bestowNum: 1200 },
          { type: 1, money: 6, num: 30, bestowNum: 5 },
          { type: 1, money: 30, num: 150, bestowNum: 30 },
          { type: 1, money: 50, num: 250, bestowNum: 70 },
          { type: 1, money: 100, num: 500, bestowNum: 200 },
          { type: 1, money: 200, num: 1000, bestowNum: 500 }
        ];
        let arr = [];
        this.user.map((r, i) => {
          // 5元只有一次
          if (i === 0) {
            if (r === 0) arr[i] = onceMoney[i];
            return;
          }
          arr[i] = onceMoney[r === 0 ? i : i + 5];
        });
        if (!arr[0]) arr = arr.slice(1);
        this.arr[0].data = arr;
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    moneyClose() {
      this.$dialog.alert({
        title: "提示",
        message: "更新游戏币",
        theme: "round-button",
        beforeClose: (action, done) => {
          this.$bus.$emit("globalInit");
          done();
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.recharge {
  font-size: 24px;
  padding: 10px;
  background-color: $pro-color;
  .box {
    ::v-deep .recharge-card-coins:nth-child(3n + 0) {
      margin-right: 0;
    }
  }
}
</style>
