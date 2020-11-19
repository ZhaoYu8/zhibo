<template>
  <div class="video" @click="fullScreen">
    <div class="video-content">
      <div id="video-content"></div>
      <vue-baberrage class="baberrage" :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop"> </vue-baberrage>
    </div>
    <div class="video-box">
      <div class="video-box-currency">
        <div class="prize">
          已获得游戏币： 2841541
        </div>
      </div>
      <div class="video-box-buttons" :class="{ disabled: !status.success }">
        <div class="button" @click="push">投币</div>
        <div class="button wiper" @click="wiper">雨刷</div>
      </div>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from 'vue-baberrage';
export default {
  data() {
    return {
      status: {},
      msg: 'Hello vue-baberrage',
      barrageIsShow: true,
      barrageLoop: false,
      barrageList: [],
    };
  },
  beforeDestroy() {
    clearInterval(this.interVal);
  },
  mounted() {
    this.init();
    document.body.addEventListener('touchstart', () => {});
    this.queryStatus();
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  methods: {
    init() {
      this.decoder = new EZUIKit.EZUIPlayer({
        id: 'video-content',
        autoplay: true,
        url: 'ezopen://open.ys7.com/E89972059/1.hd.live',
        accessToken: 'at.2wiruvkh42o5dk3s8swbwu8p0kna67ks-4qpqvczwnt-1ypgqeu-jpeklhlcd',
        decoderPath: './assets/ezuikit_v3.4',
        width: (document.getElementById('video-content').offsetHeight / 3) * 4,
        height: document.getElementById('video-content').offsetHeight,
      });
    },
    async queryStatus() {
      let res = await this.$post('coin/queryStatus', {
        coinId: parseInt(this.$route.query.coinId),
      });
      this.status = res.data;
    },
    fullScreen() {
      // 全屏
      return;
      setTimeout(() => {
        let event = document.getElementsByClassName('play-window')[0];
        let height = parseInt(event.style.height || 0);
        if (height && height < document.getElementById('video-content').offsetHeight) {
          event.removeAttribute('style');
        }
      }, 200);
    },
    async push() {
      this.barrageList.push({
        id: Math.round(9999999999999 * Math.random()),
        avatar: require('../../assets/logo.png'),
        msg: '1321',
        time: 5,
        type: MESSAGE_TYPE.NORMAL,
      });
      if (!this.status.success) {
        this.$notify({ type: 'warning', message: '机器在使用中！' });
        return;
      }
      let res = await this.$post('coin/push', {
        coinId: parseInt(this.$route.query.coinId),
        userId: Math.round(9999999999999 * Math.random()),
      });
      if (!res.data.success) return;
    },
    async wiper() {
      if (!this.status.success) {
        this.$notify({ type: 'warning', message: '机器在使用中！' });
        return;
      }
      let res = await this.$post('coin/wiper', {
        coinId: parseInt(this.$route.query.coinId),
        userId: Math.round(9999999999999 * Math.random()),
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
      height: 100%;
    }
    .baberrage {
      height: 100%;
      top: 0;
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
