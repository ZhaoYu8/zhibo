<template>
  <div class="game">
    <vue-baberrage class="baberrage" :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop"> </vue-baberrage>
    <game :list="ointmentList" />
    <div class="game-box">
      <van-row gutter="20" class="m-10" v-show="existence">
        <van-col span="12">
          <div class="prize">当前游戏币：{{ user.coin }}</div>
        </van-col>
        <van-col span="12">
          <div class="prize">当前积分：{{ user.point }}</div>
        </van-col>
        <van-col span="12">
          <div class="prize">本次投币：{{ num }}</div>
        </van-col>
        <van-col span="12">
          <div class="prize">本次获得游戏币：{{ quitCoin }}</div>
        </van-col>
      </van-row>
      <transition name="el-fade-in-linear">
        <!-- 只有状态是1的时候才能投币 -->
        <div class="dis-flex flex-x-around" v-if="status.statusId === 1">
          <div @click="pushCurrency" class="action">
            <svgs :type="2"></svgs>
          </div>
          <div @click="wiper" class="action">
            <svgs :type="3"></svgs>
          </div>
        </div>
        <!-- 只有状态不是1的时候 并且 预约队列里面没有我 -->
        <div class="dis-flex flex-x-center mb-20" @click="booking" v-if="gameType">
          <svgs :type="4"></svgs>
        </div>
        <div v-else-if="status.statusId !== 1" class="game-box-booking">
          <svgs :type="5"></svgs>
          <div class="game-box-booking-tag">排队中({{ bookingNumber }})</div>
        </div>
      </transition>
    </div>
    <animation v-if="existence" :time="endTime + 1"> </animation>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from "vue-baberrage";
import game from "@/mixin/game";
export default {
  components: {
    animation: () => import("@/components/animation")
  },
  mixins: [game],
  data() {
    return {
      msg: "Hello vue-baberrage",
      barrageIsShow: true,
      barrageLoop: false,
      barrageList: [],
      num: 0,
      quitCoin: 0,
      pushCurrency: this.$global.throttle(() => {
        this.push();
      }, 300)
    };
  },
  activated() {
    this.$bus.$emit("toggleVideo", this.options.webrtc);
  },
  methods: {
    // 查询当前机器状态
    machineStatusCallBack() {
      // 只有当在当前游戏中的用户是自己的时候才请求
      if (this.existence) {
        this.queryPrize();
        this.$bus.$emit("updateInfo");
        return;
      }
      this.quitCoin = this.num = 0;
    },
    // 投币
    async push() {
      if (this.status.statusId !== 1) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      let res = await this.$get("coin/push", {
        coinId: this.coinId,
        userId: this.user.user.userId
      });
      if (!res.data.success) return;
      ++this.num;
    },
    // 查询中奖信息
    async queryPrize() {
      let res = await this.$get("coin/queryPrize", {
        userId: this.user.user.userId,
        coinId: this.coinId
      });
      let result = res.data.result;
      if (!result.quitCoin) {
        // this.barrageList.push({
        //   id: Math.round(9999999999999 * Math.random()),
        //   avatar: require("../../assets/logo.png"),
        //   msg: result.prizeType ? `恭喜中${result.prizeTypeName}：${result.prizeTypeName}` : "恭喜退币：" + result.quitCoin,
        //   time: 5,
        //   type: MESSAGE_TYPE.NORMAL
        // });
      }
      this.quitCoin = this.quitCoin + result.returnNumber;
    },
    // 雨刷
    async wiper() {
      if (this.status.statusId !== 1) {
        this.$notify({ type: "warning", message: "机器在使用中！" });
        return;
      }
      await this.$get("coin/wiper", {
        coinId: this.coinId,
        userId: this.user.user.userId
      });
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../common/css/game.scss";
.game {
  .baberrage {
    height: 90%;
    top: 5%;
    z-index: -1;
  }
}
</style>
