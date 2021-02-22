<template>
  <div class="recharge-card">
    <a :href="href + `&money=` + r.money" v-for="(r, i) in item" :key="r.moeny" @click="change(r)">
      <div class="recharge-card-coins" :style="{ width: col, 'margin-right': ((i + 1) % num) === 0 ? 0 : '5%' }" :class="{ 'recharge-card-active': r.type === 2 }">
        <div class="active" v-if="r.type === 2"><van-icon name="point-gift-o" class="icon" />首充</div>
        <div class="num">{{ r.num }}币</div>
        <div class="bestowNum" v-if="r.bestowNum">送{{ r.bestowNum }}币</div>
        <div class="money">￥ {{ r.money }}.00</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      default: []
    },
    col: {
      type: String,
      default: "30%"
    },
    num: {
      type: Number | String,
      default: 3
    }
  },
  data() {
    return {
      href: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc54755f1f5042a10&redirect_uri=https%3a%2f%2fplay.yiyuanmaidian.com%2f%23%2fpay&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirec`
    };
  },
  methods: {
    change(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.recharge-card {
  margin: 20px 10px 0;
  overflow: hidden;
  &-coins {
    float: left;
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
}
</style>
