<template>
  <div class="home">
    <div id="video"></div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'pushLevel',
  components: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async init() {
      let res = await this.$get('coin/list');
      this.list = res.data.result;
    },
  },
  mounted() {
    // var player = new EZUIKit.EZUIKitPlayer({
    //   autoplay: true,
    //   id: 'video',
    //   accessToken: 'at.2wiruvkh42o5dk3s8swbwu8p0kna67ks-4qpqvczwnt-1ypgqeu-jpeklhlcd',
    //   url: 'ezopen://open.ys7.com/E89972059/1.hd.live',
    //   template: 'security', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
    //   // 视频上方头部控件
    //   // header: [], // 如果templete参数不为simple,该字段将被覆盖
    //   // plugin: [], // 加载插件，talk-对讲
    //   // 视频下方底部控件
    //   // footer: [], // 如果template参数不为simple,该字段将被覆盖
    //   audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
    //   // openSoundCallBack: data => console.log("开启声音回调", data),
    //   // closeSoundCallBack: data => console.log("关闭声音回调", data),
    //   // startSaveCallBack: data => console.log("开始录像回调", data),
    //   // stopSaveCallBack: data => console.log("录像回调", data),
    //   // capturePictureCallBack: data => console.log("截图成功回调", data),
    //   // fullScreenCallBack: data => console.log("全屏回调", data),
    //   // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
    //   height: (document.getElementById('video').offsetWidth / 4) * 3,
    // });
    new EZUIKit.EZUIPlayer({
      id: 'video',
      autoplay: true,
      url: 'ezopen://open.ys7.com/E89972059/1.live',
      iType: 2,
      accessToken: 'at.2wiruvkh42o5dk3s8swbwu8p0kna67ks-4qpqvczwnt-1ypgqeu-jpeklhlcd',
      decoderPath: './assets/ezuikit_v3.4',
      height: (document.getElementById('video').offsetWidth / 4) * 3,
      controls: ['play', 'hd'],
    });
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #ffe17580;
  height: 100%;
  .video {
    height: 100%;
    width: 100%;
  }
}
</style>
<style lang="scss">
#EZUIKitPlayer-video {
  .panel-bottom {
    display: none;
  }
}
</style>
