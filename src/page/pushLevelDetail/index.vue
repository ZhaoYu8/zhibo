<template>
  <div class="video">
    <div class="video-content">
      <div class="video-headed">
        <icon />
        <div class="video-headed-current">
          <div class="video-headed-current-text">已获得xxx积分</div>
          <div class="video-headed-current-box">
            <van-image class="video-headed-current-box-image" :src="require('../../assets/cat.jpeg')" fit="cover" />
            <div class="tag">游戏中</div>
          </div>
        </div>
      </div>
      <vue-baberrage class="baberrage" :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop"> </vue-baberrage>

      <div class="video-box">
        <div class="video-box-currency">
          <div class="prize">已投币数： {{ num }}</div>
          <div class="prize">已获得游戏币： {{ returnNumber }}</div>
        </div>
        <div
          class="video-box-buttons"
          :class="{
            disabled: status.statusId !== 1
          }"
        >
          <div class="button" @click="pushCurrency">投币</div>
          <div class="button wiper" @click="wiper">雨刷</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from "vue-baberrage";
export default {
  components: {
    icon: () => import("./components/icon")
  },
  data() {
    return {
      status: {},
      msg: "Hello vue-baberrage",
      barrageIsShow: true,
      barrageLoop: false,
      barrageList: [],
      num: 0,
      coinId: 0,
      returnNumber: 0,
      getThrottle: this.$global.throttle(() => {
        this.QueryPrize();
      }, 3000),
      pushCurrency: this.$global.throttle(() => {
        this.push();
      }, 300)
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user || {};
    }
  },
  beforeDestroy() {
    clearInterval(this.interVal);
    clearInterval(this.setPrize);
  },
  async mounted() {
    let options = this.$route.query;
    this.coinId = parseInt(options.coinId);
    await this.queryStatus();
    this.$bus.$emit("toggleVideo", options.webrtc);
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  methods: {
    // 查询当前机器状态
    async queryStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: this.coinId
      });
      let { data } = await this.$get("coin/AppointmentList", {
        coinId: this.coinId
      });
      console.log(data);
      this.status = res.data.result;
    },
    // 投币
    async push() {
      if (this.status.statusId !== 1) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      let res = await this.$get("coin/push", {
        coinId: this.coinId,
        userId: this.user.userId
      });
      if (!res.data.success) return;
      this.getThrottle();
      ++this.num;
    },
    // 查询中奖信息
    async QueryPrize() {
      let res = await this.$get("coin/QueryPrize", {
        userId: this.user.userId,
        coinId: this.coinId
      });
      if (!res.data.success) return;
      let result = res.data.result;
      if (!result.returnNumber) {
        this.barrageList.push({
          id: Math.round(9999999999999 * Math.random()),
          avatar: require("../../assets/logo.png"),
          msg: result.prizeType ? `恭喜中${result.prizeTypeName}：${result.prizeTypeName}` : "恭喜退币：" + result.returnNumber,
          time: 5,
          type: MESSAGE_TYPE.NORMAL
        });
        this.returnNumber = this.returnNumber + result.returnNumber;
      }
      if (result.prizeType) {
        this.setPrize = setInterval(() => {
          this.QueryPrize();
        }, 3000);
        return;
      }
      if (this.status.statusId !== 1) {
        clearInterval(this.setPrize);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    // 雨刷
    async wiper() {
      if (this.status.statusId !== 1) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      let res = await this.$get("coin/wiper", {
        coinId: this.coinId,
        userId: this.user.userId
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
  background-color: #ffeb94;
  display: flex;
  flex-direction: column;
  .video-content {
    height: 100%;
    position: relative;
    .baberrage {
      height: 90%;
      top: 5%;
      z-index: -1;
    }
    .video-headed {
      z-index: 2;
      position: absolute;
      height: 55px;
      line-height: 55px;
      top: 0;
      width: 100%;
      background-color: rgba($color: #000000, $alpha: 0.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      &-current {
        display: flex;
        color: #fff;
        align-items: center;
        &-text {
          line-height: initial;
          padding: 0 10px;
          background-color: #f7d402;
          border-radius: 10px;
          color: #491414;
          font-size: 14px;
          margin-right: -10px;
        }
        &-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          &-image {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #fff;
          }
          .tag {
            color: #491414;
            font-size: 7px;
            height: 13px;
            line-height: 13px;
            background-color: #f7d402;
            border-radius: 6px;
            line-height: initial;
            padding: 0 5px;
            margin-top: -5px;
            z-index: 2;
          }
        }
      }
    }
    .video-box {
      z-index: 2;
      width: 100%;
      height: 20%;
      display: inline-flex;
      flex-direction: column;
      position: absolute;
      bottom: 0;
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
}
</style>
