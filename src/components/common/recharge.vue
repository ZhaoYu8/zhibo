<template>
  <van-popup v-model="show" round @close="close" :closeable="true" :safe-area-inset-bottom="true" class="recharge">
    <div class="button">
      <van-button round type="info" :class="{ active: activeKey === 0 }" size="small" @click="activeKey = 0">充值</van-button>
    </div>
    <div class="recharge-box">
      <div class="card">
        <rechargeCard :item="arr" col="47%"></rechargeCard>
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
      arr: [
        { type: 2, money: 202, num: 6088, bestowNum: 0 },
        { type: 2, money: 2020, num: 70888, bestowNum: 0 },
        { type: 1, money: 6, num: 60, bestowNum: 0 },
        { type: 1, money: 28, num: 280, bestowNum: 100 },
        { type: 1, money: 98, num: 980, bestowNum: 980 },
        { type: 1, money: 288, num: 2880, bestowNum: 3280 },
        { type: 1, money: 888, num: 8880, bestowNum: 12880 },
        { type: 1, money: 1888, num: 18880, bestowNum: 300000 }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  mounted() {
  },
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
  height: 60%;
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
      margin:0 10px;
      overflow-y: auto;
      border: 2px solid #ccc;
      background-color: $pro-color;
    }
  }
}
</style>
