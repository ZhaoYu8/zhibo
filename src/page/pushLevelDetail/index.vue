<template>
  <div class="video">
    <!-- playsinline webkit-playsinline webkit ios9 前版本 解决ios中自动全屏的问题 -->
    <video ref="video" data-setup="{}" class="video-js vjs-fluid" webkit-playsinline playsinline></video>
    <button>换台</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: 'http://ivi.bupt.edu.cn/hls/cctv',
      num: 1,
      src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8',
      src1: 'http://hls01open.ys7.com/openlive/a05711d6e3c3478dade4eef420be9750.m3u8',
      src2: 'http://ivi.bupt.edu.cn/hls/cctv10.m3u8',
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.video,
      {
        height: (document.documentElement.clientWidth / 4) * 3,
        width: document.documentElement.clientWidth,
        autoplay: 'muted', // 静音模式自动播放
        controls: true,
        controlBar: {
          liveDisplay: false, // 是否显示直播字体
          fullscreenToggle: false,
        },
        liveui: false, // 是否显示直播字眼，以及进度条
        inactivityTimeout: 1000, // 交互 0 为永远处于交互模式
        notSupportedMessage: '阿西吧为啥放不了',
        fullscreen: {
          options: { navigationUI: 'show' },
        },
        sources: [
          {
            src: this.src1,
            type: 'application/x-mpegURL',
          },
        ],
      },
      () => {}
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {},
};
</script>

<style lang="scss" scope>
.video {
  height: 100%;
  .video-js .vjs-title-bar {
    background: rgba(0, 0, 0, 0.5);
    color: white;

    /*
    By default, do not show the title bar.
  */
    display: none;
    font-size: 2em;
    padding: 0.5em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  /* 
  Only show the title bar after playback has begun (so as not to hide
  the big play button) and only when paused or when the user is 
  interacting with the player.
*/
  .video-js.vjs-paused.vjs-has-started .vjs-title-bar,
  .video-js.vjs-user-active.vjs-has-started .vjs-title-bar {
    display: block;
  }
}
</style>
