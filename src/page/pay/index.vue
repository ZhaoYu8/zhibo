<template>
  <div class="pay">
    <div class="pay-title" v-show="wcpayType === 1">
      <div class="loading-indicator">支付订单创建成功,请支付<span></span></div>
    </div>
    <div v-show="wcpayType !== 1">
      <div class="loading-indicator loading-error">支付失败</div>
    </div>
    <div v-if="payCount">
      <div class="loading-indicator loading-error">第{{ payCount }}次查询支付结果<span></span></div>
    </div>
    <van-button @click="refresh" type="primary" v-if="wcpayType !== 1">再次支付</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      money: "",
      wcpayType: 1,
      payCount: 0,
      prepayData: {}, // 请求到的参数合集
      href: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc54755f1f5042a10&redirect_uri=https%3a%2f%2fplay.yiyuanmaidian.com%2f%23%2fpay&response_type=code&scope=snsapi_base&state="
    };
  },
  methods: {
    refresh() {
      window.location.replace(this.href + this.money);
    },
    GetQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    payIsSuccess() {
      return new Promise((resolve) => {
        if (this.payCount % 5) {
          resolve(true);
        }
        this.$dialog
          .confirm({
            title: "提醒",
            cancelButtonText: "继续",
            confirmButtonText: "返回",
            message: `检测到已经连续${this.payCount}次查询结果都没有支付成功！你可以先返回！联系客服！`
          })
          .then(() => {
            resolve(false);
          })
          .catch(() => {
            resolve(true);
          });
      });
    },
    async payQuery() {
      let res = await this.$post(`h5Pay/query?out_trade_no=${this.prepayData.out_trade_no}`, {}, true);
      if (res.data.errno === 0) {
        localStorage.setItem("pay", true);
        this.$dialog
          .alert({
            title: "成功",
            message: "支付成功,点击返回！",
            confirmButtonColor: "#07c160"
          })
          .then(() => {
            this.$router.go(-1);
          });
        return;
      }
      this.payCount = this.payCount + 1;
      let type = await this.payIsSuccess();
      if (type) {
        this.$toast(`第${this.payCount}次查询支付...`);
        setTimeout(() => {
          this.payQuery();
        }, 2000);
        return;
      }
      this.$router.go(-1);
    },
    async pay() {
      let res = await this.$get(
        "h5Pay/prepay",
        {
          code: this.code,
          actualPrice: this.money
        },
        true
      );
      let row = res.data;
      this.prepayData = row;
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
        (data) => {
          if (data.err_msg == "get_brand_wcpay_request:ok") {
            this.payQuery();
            this.wcpayType = 1;
            //支付成功后跳转的页面
          } else if (data.err_msg == "get_brand_wcpay_request:cancel") {
            this.wcpayType = 2;
            this.$toast("支付取消");
          } else if (data.err_msg == "get_brand_wcpay_request:fail") {
            this.payQuery();
            this.wcpayType = 3;
            this.$toast("支付失败");
            WeixinJSBridge.call("closeWindow");
          } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
        }
      );
    }
  },
  mounted() {
    this.code = this.GetQueryString("code");
    this.money = this.GetQueryString("state");
    this.$nextTick(() => {
      this.pay();
    });
  }
};
</script>

<style lang="scss" scoped>
.pay {
  font-size: 20px;
}
.loading-indicator {
  font-size: 16px;
  color: $pro-text-color;
  padding: 20px 10px;
  background-color: #f7f8fa;
  box-shadow: 0 2px #f7f8fa;
  margin-bottom: 20px;
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
.loading-error {
  background-color: #ff1717;
  color: #fff;
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
