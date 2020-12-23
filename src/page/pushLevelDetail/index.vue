<template>
  <div class="video">
    <div class="video-content">
      <div class="video-wrap">
        <video id="video" muted></video>
      </div>
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
          disabled: status.statusId && status.pushUserId !== userId
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
import AliRTS from "aliyun-rts-sdk";
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
      }, 300)
    };
  },
  beforeDestroy() {
    clearInterval(this.interVal);
    clearInterval(this.setPrize);
  },
  mounted() {
    this.init();
    this.queryStatus();
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  methods: {
    // 初始化
    init() {
      let videoID = document.getElementById("video");
      videoID.style.height = document.body.clientWidth + "px";
      videoID.style.width = document.body.clientWidth * 3 + "px";
      this.userId = this.$route.query.userId;
      let aliRts = new AliRTS({
        height: 700,
        autoplay: true,
        isLive: true,
        rePlay: false, // 播放器自动循环播放。
        controlBarVisibility: "hover", // 控制面板的实现
        playsinline: true, // H5是否内置播放，有的Android浏览器不起作用。
        useH5Prism: true, // 指定使用h5浏览器
        preload: true // 播放器自动加载
      });
      aliRts.isSupport({ isReceiveVideo: true }).then(() => {
        aliRts.startLiveStream("artc://artc.yiyuanmaidian.com/game/1", videoID);
      });
      aliRts.on("onError", (err) => {
        console.log(err);
        this.$toast("提示文案" + err.errorCode);
        aliRts.stopLiveStream();
        setTimeout(() => {
          aliRts.startLiveStream(
            "artc://artc.yiyuanmaidian.com/game/1",
            videoID
          );
        }, 1000);
      });
      // var player = new Aliplayer(
      //   {
      //     id: "video",
      //     source: "artc://artc.yiyuanmaidian.com/game/1",
      //     width: "100%",
      //     height: "100%",
      //     rePlay: false, // 播放器自动循环播放。
      //     controlBarVisibility: "hover", // 控制面板的实现
      //     autoplay: true, // 自动播放
      //     isLive: true, // 是否是直播
      //     playsinline: true, // H5是否内置播放，有的Android浏览器不起作用。
      //     useH5Prism: true, // 指定使用h5浏览器
      //     preload: true, // 播放器自动加载
      //   },
      //   function(player) {
      //     console.log(player);
      //   }
      // );
    },
    // 查询当前机器状态
    async queryStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: parseInt(this.$route.query.coinId)
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
        userId: this.userId
      });
      if (!res.data.success) return;
      this.getThrottle();
      ++this.num;
    },
    // 查询中奖信息
    async QueryPrize() {
      let res = await this.$get("coin/QueryPrize", {
        userId: this.userId,
        coinId: parseInt(this.$route.query.coinId)
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
        type: MESSAGE_TYPE.NORMAL
      });
      this.returnNumber = this.returnNumber + result.returnNumber;
      if (result.prizeType) {
        this.setPrize = setInterval(() => {
          this.QueryPrize();
        }, 3000);
        return;
      }
      if (!this.status.statusId) {
        clearInterval(this.setPrize);
      }
    },
    // 雨刷
    async wiper() {
      if (this.status.statusId && this.status.pushUserId !== this.userId) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      let res = await this.$get("coin/wiper", {
        coinId: parseInt(this.$route.query.coinId),
        userId: this.userId
      });
      if (!res.data.success) return;
    }
  }
};
</script>

<style lang="scss" scope>
.video {
  overflow: hidden;
  height: 100%;
  z-index: 11;
  background-color: #ffeb94;
  display: flex;
  flex-direction: column;
  .video-content {
    height: 75%;
    position: relative;
    .baberrage {
      height: 90%;
      top: 5%;
      z-index: -1;
    }
    .video-wrap {
      height: 100%;
      position: relative;
      overflow: hidden;
      #video {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%) rotateZ(90deg);
      }
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
</style>
