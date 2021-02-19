<template>
  <div class="doll">
    <div class="doll-headed">
      <van-icon name="revoke" class="icon" @click="goBack" size="36" />
      <van-icon name="chat-o" class="icon" size="36" />
    </div>
    <div class="doll-on-line"></div>
    <Video class="doll-video" :webrtc="webrtc" v-if="webrtc"></Video>
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
      <div class="doll-paly">
        <img src="../../assets/1.png" alt="" class="photo" />
        <img src="../../assets/2.png" alt="" class="big-photo" @click="paly" />
        <img src="../../assets/3.png" alt="" class="photo" @click="recharge" />
      </div>
    </div>
    <div v-show="!playType" class="control">
      <div class="circle circle1">
        <van-icon name="play" class="play play1" />
      </div>
      <div class="circle circle2">
        <van-icon name="play" class="play play2" />
      </div>
      <div class="circle circle3">
        <van-icon name="play" class="play play3" />
      </div>
      <div class="circle circle4">
        <van-icon name="play" class="play play4" />
      </div>
    </div>
    <recharge v-model="rechargeShow" :show="rechargeShow"></recharge>
  </div>
</template>

<script>
import Video from "../../components/common/video";
export default {
  data() {
    return {
      playType: true,
      webrtc: "",
      rechargeShow: false,
      status: {},
      userId: 0,
      getThrottle: this.$global.throttle(() => {
        this.QueryPrize();
      }, 3000),
      pushCurrency: this.$global.throttle(() => {
        this.push();
      }, 300)
    };
  },
  components: { Video },
  beforeDestroy() {
    clearInterval(this.interVal);
  },
  mounted() {
    this.userId = Number(this.$route.query.userId);
    this.webrtc = this.$route.query.webrtc;
    this.queryStatus();
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 查询当前机器状态
    async queryStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: parseInt(this.$route.query.coinId)
      });
      this.status = res.data.result;
      this.status.pushUserId = Number(this.status.pushUserId);
    },
    recharge() {
      this.rechargeShow = true;
    },
    paly() {
      this.playType = false;
    }
  }
};
</script>

<style lang="scss" scope>
.doll {
  position: relative;
  height: 100%;
  font-size: 18px;
  &-headed {
    z-index: 2;
    position: absolute;
    box-sizing: border-box;
    padding: 0 20px;
    top: 4%;
    width: 100%;
    display: flex;
    color: #fff;
    justify-content: space-between;
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
  &-paly {
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
    position: absolute;
    bottom: 20px;
    z-index: 1;
    .circle {
      position: absolute;
      width: 50px;
      height: 50px;
      margin: auto;
      border: 3px solid #fff;
      border-radius: 15px;
      background-color: #ffd01e;
      .play {
        color: #fff;
        font-size: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(-90deg);
      }
      .play2 {
        transform: translate(-50%, -50%) rotate(180deg);
      }
      .play3 {
        transform: translate(-50%, -50%);
      }
      .play4 {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
    .circle1 {
      left: 80px;
      bottom: 80px;
    }
    .circle2 {
      left: 30px;
      bottom: 40px;
    }
    .circle3 {
      left: 130px;
      bottom: 40px;
    }
    .circle4 {
      left: 80px;
      bottom: 0;
    }
    // .circle3 {
    //   left: 50px;
    // }
    // .circle4 {
    //   left: 50px;
    // }
    // .circle2 {
    //   border-bottom-color: #ffd01e;
    //   transform: translate(0, 90px) rotate(180deg);
    // }
    // .circle3 {
    //   border-left-color: #ffd01e;
    //   transform: translate(90px, 0);
    // }
    // .circle4 {
    //   border-right-color: #ffd01e;
    //   transform: translate(-90px, 0);
    // }
  }
}
</style>
