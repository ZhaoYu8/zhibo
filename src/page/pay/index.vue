<template>
  <div>
    支付中...
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ""
    };
  },
  methods: {
    GetQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    async pay() {
      let res = await this.$get("coin/Prepay", {
        code: this.code
      });
      let row = JSON.parse(res.data.result);
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

<style></style>
