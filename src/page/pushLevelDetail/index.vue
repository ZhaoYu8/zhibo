<template>
  <div class="video">
    <div class="video-content">
      <div id="video-content"></div>
      <vue-baberrage
        class="baberrage"
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :loop="barrageLoop"
      >
      </vue-baberrage>
    </div>
    <div class="video-box">
      <div class="video-box-currency">
        <div class="prize">已投币数： {{ num }}</div>
        <div class="prize">已获得游戏币： {{ returnNumber }}</div>
      </div>
      <div
        class="video-box-buttons"
        :class="{
          disabled: status.statusId && status.pushUserId !== userId,
        }"
      >
        <div class="button" @click="pushCurrency">投币</div>
        <div class="button wiper" @click="wiper">雨刷</div>
      </div>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from "vue-baberrage";
import { throttle } from "../../common/js/global";
import EZUIKit from "ezuikit-js";
export default {
  data() {
    return {
      status: {},
      msg: "Hello vue-baberrage",
      barrageIsShow: true,
      barrageLoop: false,
      barrageList: [],
      userId: 999001,
      num: 0,
      returnNumber: 0,
      getThrottle: throttle(() => {
        this.QueryPrize();
      }, 3000),
      pushCurrency: throttle(() => {
        this.push();
      }, 300),
    };
  },
  beforeDestroy() {
    clearInterval(this.interVal);
    clearInterval(this.setPrize);
  },
  mounted() {
    this.init();
    document.body.addEventListener("touchstart", () => {});
    this.queryStatus();
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  methods: {
    // 初始化
    init() {
      this.userId = this.$route.query.userId;
      this.decoder = new EZUIKit.EZUIKitPlayer({
        id: "video-content",
        autoplay: true,
        audio: 1,
        url: "ezopen://open.ys7.com/E98153477/1.hd.live",
        accessToken:
          "at.c20xo1g19vtfbdhk437o84d59k8cn7j0-9ny89865ub-04ziud0-8ltqvflix",
        width: (document.getElementById("video-content").offsetHeight / 3) * 4,
        controls: ["voice"],
      });
    },
    // 查询当前机器状态
    async queryStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: parseInt(this.$route.query.coinId),
      });
      this.status = res.data.result;
    },
    // 投币
    async push() {
      if (this.status.statusId && this.status.pushUserId !== this.userId) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      let res = await this.$get("coin/push", {
        coinId: parseInt(this.$route.query.coinId),
        userId: this.userId,
      });
      if (!res.data.success) return;
      this.getThrottle();
      ++this.num;
    },
    // 查询中奖信息
    async QueryPrize() {
      let res = await this.$get("coin/QueryPrize", {
        userId: this.userId,
        coinId: parseInt(this.$route.query.coinId),
      });
      if (!res.data.success) return;
      let result = res.data.result;
      if (!result.returnNumber) return;
      this.barrageList.push({
        id: Math.round(9999999999999 * Math.random()),
        avatar: require("../../assets/logo.png"),
        msg: result.prizeType
          ? `恭喜中${result.prizeTypeName}：${result.prizeTypeName}`
          : "恭喜退币：" + result.returnNumber,
        time: 5,
        type: MESSAGE_TYPE.NORMAL,
      });
      this.returnNumber = this.returnNumber + result.returnNumber;
      if (result.prizeType) {
        this.setPrize = setInterval(() => {
          this.QueryPrize();
        }, 3000);
        return;
      }
      if (!this.status.statusId) clearInterval(this.setPrize);
    },
    // 雨刷
    async wiper() {
      if (this.status.statusId && this.status.pushUserId !== this.userId) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      let res = await this.$get("coin/wiper", {
        coinId: parseInt(this.$route.query.coinId),
        userId: this.userId,
      });
      if (!res.data.success) return;
    },
  },
};
</script>

<style lang="scss" scope>
.video {
  height: 100%;
  z-index: 11;
  background-color: #ffeb94;
  display: flex;
  flex-direction: column;
  .video-content {
    height: 75%;
    position: relative;
    #video-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      #EZUIKitPlayer-video-content {
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
      }
    }
    .baberrage {
      height: 80%;
      top: 10%;
    }
  }
  &-box {
    flex-grow: 1;
    display: inline-flex;
    flex-direction: column;
    &-currency {
      flex-grow: 1;
      display: flex;
      align-items: center;
      margin-left: 5%;
      .prize {
        font-size: 12px;
        color: #000000;
        background-color: #ff9d75;
        padding: 5px 20px;
        border-radius: 13px;
        margin-right: 10px;
      }
    }
    &-buttons {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-grow: 1;
      margin: 0 5%;
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45%;
        padding: 18px 0;
        font-size: 18px;
        border-radius: 8px;
        outline: none;
        background-color: #ff628f;
        color: #fff;
        transition: all 0.2s;
        box-shadow: 0 6px 0 #00000030;
        &:active {
          box-shadow: 0 3px 0 #00000030;
          transform: translate3d(0, 3px, 0);
        }
      }
      .wiper {
        background-color: #45bca9;
      }
    }
    .disabled {
      .button {
        background-color: #d2c1c1fa;
        box-shadow: 0 0 0;
        &:active {
          box-shadow: 0 0 0;
          transform: none;
        }
      }
    }
  }
}
.baberrage-stage {
  z-index: 1;
}
</style>
