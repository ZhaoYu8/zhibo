<template>
  <div class="pay">
    <div class="pay-title">
      <div class="loading-indicator">支付订单创建成功<span></span></div>
    </div>
    <van-button @click="refresh" size="mini" type="primary">刷新支付</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      href:
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc54755f1f5042a10&redirect_uri=https%3a%2f%2fplay.yiyuanmaidian.com%2f%23%2fpay&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirec"
    };
  },
  methods: {
    refresh() {
      window.location.href = this.href;
    },
    GetQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    async pay() {
      let res = await this.$get(
        "h5Pay/prepay",
        {
          code: this.code,
          actualPrice: 6
        },
        true
      );
      let row = res.data;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: row.appId, //公众号名称,由商户传入
          timeStamp: row.timeStamp, //时间戳,自1970年以来的秒数
          nonceStr: row.nonceStr, //随机串
          package: row.package,
          signType: row.signType, //微信签名方式：
          paySign: row.paySign //微信签名
        },
        function(data) {
          if (data.err_msg == "get_brand_wcpay_request:ok") {
            console.log("支付成功");
            //支付成功后跳转的页面
          } else if (data.err_msg == "get_brand_wcpay_request:cancel") {
            console.log("支付取消");
          } else if (data.err_msg == "get_brand_wcpay_request:fail") {
            console.log("支付失败");
            WeixinJSBridge.call("closeWindow");
          } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
        }
      );
    }
  },
  mounted() {
    this.code = this.GetQueryString("code");
    this.$nextTick(() => {
      this.pay();
    });
  }
};
</script>

<style lang="scss" scoped>
.pay {
  font-size: 20px;
  padding: 10px;
}
.loading-indicator {
  font-size: 16px;
  color: #09f;
  span {
    display: inline-block;
    overflow: hidden;
    height: 1em;
    line-height: 1;
    vertical-align: -0.25em;
    &::after {
      display: block;
      white-space: pre-wrap;
      content: "...\A..\A.";
      animation: loading 3s infinite step-start both;
    }
  }
}
@keyframes loading {
  33% {
    transform: translate3d(0, -2em, 0);
  }
  66% {
    transform: translate3d(0, -1em, 0);
  }
}
</style>
