<template>
  <div class="box" @click="toggle">
    <div v-html="content" class="video"></div>
    <div v-show="playType" class="box-play">
      <van-icon name="play-circle" @click="play" color="#fff" size="40" />
      <div class="c-fff">若不显示，请触摸播放。</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "video",
  components: {},
  data() {
    return {
      streamUrl: "webrtc://live.yiyuanmaidian.com/game/2",
      streamId: Date.now().toString(36),
      peerConnection: "",
      content: "",
      playType: true
    };
  },
  methods: {
    toggle() {
      let video = document.getElementById(this.streamId);
      video.muted = false;
      if (this.playType) {
        this.play();
      }
    },
    play() {
      let video = document.getElementById(this.streamId);
      video
        .play()
        .then(() => {
          this.playType = false;
          console.log("成功");
        })
        .catch(() => {
          this.playType = true;
          console.log("失败");
        });
    },
    // 创建video组件
    createVideoElement(id) {
      this.content = `<video id="${id}" on-click="toggle" style="object-fit: fill;"  autoplay playsinline width="100%" height="100%"></video>`;
      return document.getElementById(id);
    },
    pullStream() {
      let video = document.getElementById(this.streamId);
      if (!video) {
        video = this.createVideoElement(this.streamId);
      }
      // 初始化
      this.peerConnection = new RTCPeerConnection(
        {
          iceServers: [],
          bundlePolicy: "max-bundle",
          rtcpMuxPolicy: "require",
          tcpCandidatePolicy: "disable",
          IceTransportsType: "nohost",
          sdpSemantics: "unified-plan"
        },
        {
          optional: [
            {
              DtlsSrtpKeyAgreement: true
            }
          ]
        }
      );
      this.peerCallback();
    },
    peerCallback() {
      let peerConnection = this.peerConnection;
      peerConnection.ontrack = (e) => {
        let track = e.track;
        if (!peerConnection.stream) {
          peerConnection.streamId = this.streamId;
          peerConnection.stream = new MediaStream();
          peerConnection.stream.addTrack(track);
          this.onAddStream(peerConnection);
        } else {
          peerConnection.stream.addTrack(track);
        }
      };
      peerConnection
        .createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
          voiceActivityDetection: false
        })
        .then(async (offer) => {
          let arrSdp = offer.sdp.toString().split("\r\n");
          let stringSdpModify = "";
          for (let i = 0; i < arrSdp.length - 1; i++) {
            if (arrSdp[i].lastIndexOf("a=fmtp:111") != -1) {
              stringSdpModify += arrSdp[i] + ";stereo=1" + "\r\n";
            } else {
              stringSdpModify += arrSdp[i] + "\r\n";
            }
          }
          offer.sdp = stringSdpModify;
          peerConnection.setLocalDescription(offer);

          let res = await this.$post(
            "https://webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream",
            {
              streamurl: this.streamUrl,
              sessionid: "sessionId_Test",
              clientinfo: "clientinfo_test",
              localsdp: offer
            },
            true
          );
          let data = res.data;
          if (data.errcode != 0) {
            console.log(`pull stream failed!errCode:${data.errcode}, errmsg:${data.errmsg}`);
            return;
          }
          peerConnection.setRemoteDescription(new RTCSessionDescription(data.remotesdp));
        });
    },
    onAddStream(e) {
      let streamId = e.streamId;
      let video = document.getElementById(streamId);
      if (!video) {
        video = this.createVideoElement(streamId);
      }
      video.srcObject = e.stream;
      video.muted = true;
      video.autoplay = true;
      video.playsinline = true;
      this.$nextTick(() => {
        this.play();
      });
    }
  },
  mounted() {
    this.pullStream();
  }
};
</script>
<style lang="scss" scoped>
.box {
  position: absolute;
  height: 100%;
  &-play {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
}
.video {
  height: 100%;
}
</style>
