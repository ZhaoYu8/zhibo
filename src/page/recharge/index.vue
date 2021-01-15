<template>
  <div class="recharge">
    <Header> <span class="f-b">充值</span></Header>
    <van-tabs v-model="active" animated swipeable background="transparent" color="#1989fa" title-active-color="#1989fa">
      <van-tab v-for="item in arr" :title="item.label" :key="item.label">
        <div class="recharge-box">
          <div v-for="r in item.data" :key="r.moeny" class="recharge-box-coins" :class="{ 'recharge-box-active': r.type === 2 }">
            <div class="active" v-if="r.type === 2"><van-icon name="point-gift-o" class="icon" />活动</div>
            <div class="num">{{ r.num }}币</div>
            <div class="bestowNum" v-if="r.bestowNum">送{{ r.bestowNum }}熊猫币</div>
            <div class="money">￥ {{ r.money }}.00</div>
          </div>
        </div>
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
  &-box {
    margin: 20px 10px;
    &-coins {
      float: left;
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100px;
      margin-right: 5%;
      margin-bottom: 20px;
      border-radius: 8px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      .num {
        font-size: 16px;
        margin-top: 30px;
        font-weight: bold;
      }
      .bestowNum {
        font-weight: bold;
        margin-top: 10px;
        font-size: 12px;
      }
      .money {
        background-color: $pro-box-color;
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        color: #fff;
        font-size: 12px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active {
        @extend .money;
        top: 0;
        bottom: inherit;
        background-image: linear-gradient(to right, #ff8917, #ff1717);
        color: #fff;
        .icon {
          display: flex;
          align-items: center;
          font-size: 20px;
          position: absolute;
          left: 0;
        }
      }
    }
    &-active {
      .num {
        color: #ff8917;
      }
      .money {
        background-color: #ff1717;
      }
    }
    .recharge-box-coins:nth-child(3n + 0) {
      margin-right: 0;
    }
  }
}
</style>
