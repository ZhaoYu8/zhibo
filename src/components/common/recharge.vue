<template>
  <van-popup v-model="show" round @close="close" :closeable="true" :safe-area-inset-bottom="true" class="recharge">
    <div class="button">
      <van-button round type="info" :class="{ active: activeKey === 0 }" size="small" @click="activeKey = 0">充值</van-button>
    </div>
    <div class="recharge-box">
      <div class="card">
        <rechargeCard :item="arr" col="47.5%" num="2"></rechargeCard>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  naem: "recharge",
  data() {
    return {
      activeKey: 0,
      arr: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  computed: {
    user() {
      let recharge = this.$store.state.user.user.recharge;
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
        this.arr = this.user.map((r, i) => {
          // 5元只有一次
          if (i === 0) {
            return onceMoney[i];
          }
          return onceMoney[r === 0 ? i : i + 5];
        });
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("input", this.show);
    }
  }
};
</script>
<style scoped lang="scss">
$b-c: #ccc;
.recharge {
  width: 90%;
  display: flex;
  flex-direction: column;
  .button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    & > * {
      height: 30px;
      line-height: 30px;
      padding: 15px 30px;
      margin: 0 10px;
      color: #000;
      font-weight: bold;
      background-color: #fff;
      border-color: $pro-color;
      font-size: 16px;
    }
    .active {
      background-color: $pro-color;
    }
  }
  &-box {
    margin: 20px 0;
    display: flex;
    overflow: hidden;
    &-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &-tab {
        height: 100px;
        border-top: 1px solid;
        width: 60px;
        writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
        background-color: $b-c;
      }
    }
    .card {
      border-radius: 10px;
      margin: 0 10px;
      overflow-y: auto;
      border: 2px solid #ccc;
      background-color: $pro-color;
    }
  }
}
</style>
