<template>
  <div class="video">
    <div class="video-content">
      <vue-baberrage class="baberrage" :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop"> </vue-baberrage>
      <game :list="ointmentList" />
      <div class="video-box">
        <div class="video-box-currency">
          <div class="prize">已投币数： {{ num }}</div>
          <div class="prize">已获得游戏币： {{ returnNumber }}</div>
        </div>
        <transition name="el-fade-in-linear">
          <!-- 只有状态是1的时候才能投币 -->
          <div class="dis-flex flex-x-around mb-20 m" v-if="status.statusId === 1">
            <div @click="pushCurrency" class="button">
              <svgs :type="2"></svgs>
            </div>
            <div @click="wiper" class="button">
              <svgs :type="3"></svgs>
            </div>
          </div>
          <!-- 只有状态不是1的时候 并且 预约队列里面没有我 -->
          <div class="dis-flex flex-x-center mb-20 button" @click="booking" v-if="gameType">
            <svgs :type="4"></svgs>
          </div>
          <div v-else-if="status.statusId !== 1" class="dis-flex flex-x-center mb-20 flex-dir-column flex-y-center booking">
            <svgs :type="5"></svgs>
            <div class="booking-tag">排队中({{ bookingNumber }})</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from "vue-baberrage";
export default {
  components: {
    game: () => import("@/components/game"),
    svgs: () => import("@/components/svg")
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
      }, 300),
      ointmentList: {
        current: {},
        queue: []
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user || {};
    },
    gameType() {
      return this.status.statusId !== 1 && !this.ointmentList.queue.find((r) => Number(r.userId) === Number(this.user.userId));
    },
    bookingNumber() {
      return this.ointmentList.queue.findIndex((r) => Number(r.userId) === Number(this.user.userId)) + 1;
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
      // 查询 排队列表
      let { data } = await this.$get("coin/AppointmentList", {
        coinId: this.coinId
      });
      this.ointmentList = data.result[this.coinId];
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
      let result = res.data.result;
      if (!result.returnNumber) {
        // this.barrageList.push({
        //   id: Math.round(9999999999999 * Math.random()),
        //   avatar: require("../../assets/logo.png"),
        //   msg: result.prizeType ? `恭喜中${result.prizeTypeName}：${result.prizeTypeName}` : "恭喜退币：" + result.returnNumber,
        //   time: 5,
        //   type: MESSAGE_TYPE.NORMAL
        // });
      }
      console.log(result.returnNumber);
      this.returnNumber = this.returnNumber + result.returnNumber;
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
    // 雨刷
    async wiper() {
      if (this.status.statusId !== 1) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      await this.$get("coin/wiper", {
        coinId: this.coinId,
        userId: this.user.userId
      });
    },
    async booking() {
      await this.$get("/coin/Appointment", {
        coinId: this.coinId
      });
      this.$toast("参加排队成功");
      this.queryStatus();
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
    }
    .button {
      &:active {
        box-shadow: 0 3px 0 #00000030;
        transform: translate3d(0, 3px, 0);
      }
    }
  }
  .booking {
    position: relative;
    &-tag {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 26px;
      color: #03556b;
    }
  }
}
</style>
