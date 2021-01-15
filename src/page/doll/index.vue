<template>
  <div class="doll">
    <div class="doll-headed">
      <van-icon name="revoke" class="icon" @click="goBack" size="36" />
      <van-icon name="chat-o" class="icon" size="36" />
    </div>
    <div class="doll-on-line"></div>
    <Video class="doll-video" :webrtc="webrtc" v-if="webrtc"></Video>
    <div class="doll-footer">
      <van-icon name="bullhorn-o" color="#ffe000" size="20" />
      <ul class="doll-footer-info">
        <li>
          本次:
          <div class="doll-footer-info-num">20</div>
        </li>
        <li>
          砖石余额:
          <div class="doll-footer-info-num">20</div>
        </li>
        <li>
          积分:
          <div class="doll-footer-info-num">20</div>
        </li>
      </ul>
    </div>
    <div class="doll-paly">
      <img src="../../assets/1.png" alt="" class="photo" />
      <img src="../../assets/2.png" alt="" class="big-photo" />
      <img src="../../assets/3.png" alt="" class="photo" @click="recharge" />
    </div>
    <recharge v-model="rechargeShow" :show="rechargeShow"></recharge>
  </div>
</template>

<script>
import Video from "../../components/common/video";
import { MESSAGE_TYPE } from "vue-baberrage";
import { throttle } from "../../common/js/global";
export default {
  data() {
    return {
      webrtc: "",
      rechargeShow: false,
      status: {},
      userId: 0,
      getThrottle: throttle(() => {
        this.QueryPrize();
      }, 3000),
      pushCurrency: throttle(() => {
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
      justify-content: space-around;
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
}
</style>
