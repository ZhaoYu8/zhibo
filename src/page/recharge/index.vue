<template>
  <div class="recharge">
    <Header> <span class="f-b">充值</span></Header>
    <van-tabs v-model="active" animated swipeable background="transparent" color="#1989fa" title-active-color="#1989fa">
      <van-tab v-for="item in arr" :title="item.label" :key="item.label">
        <rechargeCard :item="item.data" class="box"></rechargeCard>
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
          label: "熊猫币",
          data: [
            { type: 2, money: 202, num: 6088, bestowNum: 0 },
            { type: 2, money: 2020, num: 70888, bestowNum: 0 },
            { type: 1, money: 6, num: 60, bestowNum: 0 },
            { type: 1, money: 28, num: 280, bestowNum: 100 },
            { type: 1, money: 98, num: 980, bestowNum: 980 },
            { type: 1, money: 288, num: 2880, bestowNum: 3280 },
            { type: 1, money: 888, num: 8880, bestowNum: 12880 },
            { type: 1, money: 1888, num: 18880, bestowNum: 300000 }
          ]
        },
        { label: "砖石" }
      ]
    };
  }
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
