<template>
  <div class="recharge-card">
    <div v-for="(r, i) in item" :key="r.moeny" @click="handleRecharge(r, i)">
      <div class="recharge-card-coins" :style="{ width: col, 'margin-right': (i + 1) % num === 0 ? 0 : '5%' }" :class="{ 'recharge-card-active': r.type === 2 }">
        <div class="active" v-if="r.type === 2"><van-icon name="point-gift-o" class="icon" />首充</div>
        <div class="num">{{ r.num }}币</div>
        <div class="bestowNum" v-if="r.bestowNum">送{{ r.bestowNum }}币</div>
        <div class="money">￥ {{ r.money }}.00</div>
      </div>
    </div>
  </div>
</template>

<script>
function ready() {
  console.log(1, window.__wxjs_environment === "miniprogram"); // true
}
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
      href: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc54755f1f5042a10&redirect_uri=https%3a%2f%2fplay.yiyuanmaidian.com%2f%23%2fpay&response_type=code&scope=snsapi_base`,
      token: ""
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
      document.addEventListener("WeixinJSBridgeReady", ready, false);
    } else {
      ready();
    }
  },
  computed: {
    user() {
      return this.$store.state.user || {};
    }
  },
  methods: {
    handleRecharge(val) {
      wx.miniProgram.navigateTo({
        url: `/pages/ucenter/recharge/recharge?userId=${this.user.user.userId}&actualPrice=${val.money}`, //指定跳转至小程序页面的路径
        success: function() {
          console.log("success"); //页面跳转成功的回调函数
        }
      });
      setTimeout(() => {
        this.$emit("click");
      }, 1000);
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
    justify-content: center;
    .num {
      font-size: 16px;
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
