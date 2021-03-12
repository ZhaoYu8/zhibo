<template>
  <div class="game">
    <game :list="ointmentList" />
    <div class="game-flip" @click="toggleVideo"><van-icon name="photograph" /></div>
    <div class="ready" v-show="readyType">
      ready Go
    </div>
    <div class="game-prize">
      <van-row gutter="20" :class="gameType" v-show="existence">
        <van-col span="12">
          <div class="prize">当前游戏币：{{ user.coin }}</div>
        </van-col>
        <van-col span="12">
          <div class="prize">当前积分：{{ user.point }}</div>
        </van-col>
      </van-row>
    </div>
    <div class="game-box">
      <transition name="el-fade-in-linear">
        <!-- 只有状态不是1的时候 并且 预约队列里面没有我 -->
        <div class="dis-flex flex-x-center mb-20" v-if="gameType" @click="booking">
          <svgs :type="4"></svgs>
        </div>
        <div v-else-if="status.statusId !== 1" class="game-box-booking">
          <svgs :type="5"></svgs>
          <div class="game-box-booking-tag">排队中({{ bookingNumber }})</div>
        </div>

        <div v-show="status.statusId === 1 && playType">
          <div class="game-begin">
            <img src="../../assets/1.png" alt="" class="photo" />
            <img src="../../assets/2.png" alt="" class="big-photo" @click="begin" />
            <img src="../../assets/3.png" alt="" class="photo" @click="rechargeShow = true" />
          </div>
        </div>
      </transition>
    </div>

    <!-- 按钮组 -->
    <div v-if="status.statusId === 1 && !playType" class="control">
      <div class="control-buttons">
        <div class="circle" :class="'circle' + item" v-for="item in 4" :key="item">
          <van-icon name="play" class="triangle" :class="'triangle' + item" @click="direction(item)" />
        </div>
      </div>
      <div class="play">
        <div class="play-time"><van-count-down :time="time" format="ss" @finish="playType = true" />S</div>
        <div class="play-button" @click="play">GO</div>
      </div>
    </div>
    <recharge v-model="rechargeShow" :show="rechargeShow"></recharge>
  </div>
</template>

<script>
import game from "@/mixin/game";
export default {
  mixins: [game],
  data() {
    return {
      time: 30 * 1000,
      playType: true, // 控制显示游戏
      rechargeShow: false, // 控制显示充值页面
      camera: true, // 控制调整摄像头
      audio: "",
      readyType: false
    };
  },
  activated() {
    let num = this.options.webrtc.lastIndexOf("/") + 1;
    this.webrtc = this.options.webrtc.substring(0, num) + (Number(this.options.webrtc.substring(num)) + 1);
    this.$bus.$emit("toggleVideo", this.webrtc);
  },
  methods: {
    async begin() {
      if (this.status.statusId !== 1) {
        this.$toast("机器在使用中！");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中"
      });
      let res = await this.$get("coin/push", {
        coinId: this.coinId,
        userId: this.user.userId
      });
      this.$toast.clear();
      if (!res.data.success) {
        this.$notify({
          type: "warning",
          message: res.data.msg,
          duration: 1500
        });
        return;
      }
      this.$bus.$emit("updateInfo");
      if (!this.audio) this.audio = new Audio(require("../../assets/1.mp3")); //这里的路径写上mp3文件在项目中的绝对路径
      this.audio.play(); //播放
      this.playType = false;
      this.readyType = true;
      setTimeout(() => {
        this.readyType = false;
      }, 2000);
    },
    // 调整方向  // 9：前； 10:左； 11： 右； 12： 后； 13： 下
    direction(item) {
      this.$get("coin/Move", {
        coinId: this.coinId,
        moveType: [0, 9, 10, 11, 12][item]
      });
    },
    play() {
      this.$get("coin/Move", {
        coinId: this.coinId,
        moveType: 13
      });
      setTimeout(() => {
        this.playType = !this.playType;
        this.$bus.$emit("updateInfo");
      }, 7000);
    },
    // 调整摄像头
    toggleVideo() {
      this.camera = !this.camera;
      let num = this.webrtc.lastIndexOf("/") + 1;
      this.webrtc = this.webrtc.substring(0, num) + (Number(this.webrtc.substring(num)) + (this.camera ? 1 : -1));
      this.$bus.$emit("toggle", this.webrtc);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../common/css/game.scss";
.ready {
  color: #fff;
  font-size: 30px;
  animation: myfirst 2s;
  animation-timing-function: value;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
@keyframes myfirst {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    font-size: 50px;
    color: #ffd01e;
  }
  100% {
    opacity: 0;
  }
}
.game {
  &-prize {
    position: absolute;
    bottom: 160px;
    width: 100%;
    z-index: 2;
    padding: 10px;
  }
  &-flip {
    position: absolute;
    bottom: 200px;
    right: 0;
    z-index: 2;
    background-color: #0b4367;
    padding: 8px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 25px;
    margin-right: 10px;
  }
  &-begin {
    position: absolute;
    z-index: 2;
    bottom: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    .photo {
      flex: 1;
      margin: 0 10px;
    }
    .big-photo {
      height: 80px;
      flex: 2;
    }
  }
  .control {
    position: absolute;
    bottom: 20px;
    z-index: 2;
    display: flex;
    width: 100%;
    height: 140px;
    align-items: center;
    justify-content: flex-end;
    &-buttons {
      position: relative;
      flex: 1;
      height: 100%;
      .circle {
        position: absolute;
        width: 50px;
        height: 50px;
        margin: auto;
        border: 3px solid #fff;
        border-radius: 15px;
        background-color: #ffd01e;
        .triangle {
          color: #fff;
          font-size: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
        }
        .triangle2 {
          transform: translate(-50%, -50%) rotate(180deg);
        }
        .triangle3 {
          transform: translate(-50%, -50%);
        }
        .triangle4 {
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }
    .circle1 {
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      &:active {
        transition: all 0.3s;
        transform: translateX(-50%) translate3d(0, -3px, 0);
      }
    }
    .circle2 {
      left: 50px;
      transform: translateY(-50%);
      top: 50%;
      &:active {
        transition: all 0.3s;
        transform: translateY(-50%) translate3d(-3px, 0, 0);
      }
    }
    .circle3 {
      right: 50px;
      transform: translateY(-50%);
      top: 50%;
      &:active {
        transition: all 0.3s;
        transform: translateY(-50%) translate3d(3px, 0, 0);
      }
    }
    .circle4 {
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      &:active {
        transition: all 0.3s;
        transform: translateX(-50%) translate3d(0, 3px, 0);
      }
    }
    .play {
      z-index: 2;
      color: #fff;
      font-size: 28px;
      margin: 0 30px;
      &-time {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        margin-bottom: 10px;
        .van-count-down {
          font-size: inherit;
          color: #fff;
          text-shadow: 0 2px #af7070;
        }
      }
      &-button {
        background-color: #39ff76;
        height: 60px;
        width: 60px;
        border: 3px solid #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          transition: all 0.3s;
          transform: translate3d(0, 3px, 0);
        }
      }
    }
  }
}
</style>
