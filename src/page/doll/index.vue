<template>
  <div class="doll">
    <div class="doll-headed">
      <van-icon name="revoke" class="icon" @click="goBack" size="36" />
      <van-icon name="chat-o" class="icon" size="36" />
    </div>
    <div class="doll-flip" @click="toggleVideo"><van-icon name="photograph" /></div>
    <div v-show="playType">
      <div class="doll-footer">
        <van-icon name="bullhorn-o" color="#ffe000" size="20" />
        <ul class="doll-footer-info">
          <li>
            本次：
            <div class="doll-footer-info-num">20</div>
          </li>
          <li>
            砖石余额：
            <div class="doll-footer-info-num">20</div>
          </li>
          <li>
            积分：
            <div class="doll-footer-info-num">20</div>
          </li>
        </ul>
      </div>
      <div class="doll-play">
        <img src="../../assets/1.png" alt="" class="photo" />
        <img src="../../assets/2.png" alt="" class="big-photo" @click="play" />
        <img src="../../assets/3.png" alt="" class="photo" @click="recharge" />
      </div>
    </div>
    <!-- 按钮组 -->
    <div v-if="!playType" class="control">
      <div class="control-buttons">
        <div class="circle" :class="'circle' + item" v-for="item in 4" :key="item">
          <van-icon name="play" class="triangle" :class="'triangle' + item" @click="direction(item)" />
        </div>
      </div>
      <div class="play">
        <div class="play-time"><van-count-down :time="time" format="ss" />S</div>
        <div class="play-button">GO</div>
      </div>
    </div>
    <recharge v-model="rechargeShow" :show="rechargeShow"></recharge>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 30 * 1000,
      playType: true,
      rechargeShow: false,
      status: {},
      coinId: 0,
      getThrottle: this.$global.throttle(() => {
        this.QueryPrize();
      }, 3000),
      pushCurrency: this.$global.throttle(() => {
        this.push();
      }, 300),
      current: false
    };
  },
  beforeDestroy() {
    clearInterval(this.interVal);
  },
  async mounted() {
    let options = this.$route.query;
    this.coinId = parseInt(options.coinId);
    this.webrtc = options.webrtc;
    await this.queryStatus();
    this.$bus.$emit("toggleVideo", this.webrtc);
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  computed: {
    user() {
      return this.$store.state.user.user || {};
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 查询当前机器状态
    async queryStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: this.coinId
      });
      this.status = res.data.result;
      this.status.pushUserId = Number(this.status.pushUserId);
    },
    recharge() {
      this.rechargeShow = true;
    },
    async play() {
      let res = await this.$get("coin/push", {
        coinId: this.coinId,
        userId: this.user.userId
      });
      this.playType = false;
    },
    // 调整方向
    direction(item) {
      console.log(item);
    },
    // 调整摄像头
    toggleVideo() {
      this.current = !this.current;
      let num = this.webrtc.lastIndexOf("/") + 1;
      console.log(this.webrtc.substring(num));
      this.webrtc = this.webrtc.substring(0, num) + (Number(this.webrtc.substring(num)) + (this.current ? 1 : -1));
      this.$bus.$emit("toggle", this.webrtc);
    }
  }
};
</script>

<style lang="scss" scope>
.doll {
  position: relative;
  height: 100%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-headed {
    z-index: 2;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    display: flex;
    color: #fff;
    justify-content: space-between;
    margin-top: 20px;
  }
  &-flip {
    position: absolute;
    top: 40%;
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
  &-video {
    width: 100%;
    z-index: 1;
    background-color: #c8c9cc;
  }
  &-footer {
    width: 96%;
    position: absolute;
    z-index: 2;
    bottom: 120px;
    background-color: #000;
    background-color: rgba(0, 0, 0, 0.25);
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 50px;
    display: flex;
    align-items: center;
    &-info {
      flex: 1;
      margin-left: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      line-height: 18px;
      li {
        display: inline-flex;
      }
      &-num {
        color: #ffd01e;
      }
    }
  }
  &-play {
    position: absolute;
    z-index: 1;
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
    bottom: 20px;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 140px;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
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
    }
    .circle2 {
      left: 50px;
      transform: translateY(-50%);
      top: 50%;
    }
    .circle3 {
      right: 50px;
      transform: translateY(-50%);
      top: 50%;
    }
    .circle4 {
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
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
      }
    }
  }
}
</style>
