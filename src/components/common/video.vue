<template>
  <div class="video" @click="voice" :style="{ top: type ? '0' : '-100%' }">
    <transition name="fade">
      <video v-show="toggle" :id="streamId" class="video-main" style="object-fit: cover;" :style="{ top: type ? '0' : '-100%' }" muted autoplay playsinline width="100%" height="100%"></video>
    </transition>
  </div>
</template>

<script>
export default {
  name: "video",
  components: {},
  data() {
    return {
      streamId: "onceVideo",
      peerConnection: "",
      content: "",
      type: false,
      toggle: true,
      first: false
    };
  },
  props: {
    webrtc: {
      type: String,
      default: "webrtc://live.yiyuanmaidian.com/game/2"
    }
  },
  watch: {
    $route: {
      handler(val) {
        let video = document.getElementById(this.streamId);
        if (["doll", "pushLevelDetail"].includes(val.name)) {
          this.pullStream();
          this.type = true;
          this.$nextTick(() => {
            video.muted = false;
          });
        } else {
          this.type = false;
          video.muted = true;
        }
      }
    }
  },
  methods: {
    voice() {
      let video = document.getElementById(this.streamId);
      video.muted = false;
    },
    play() {
      let video = document.getElementById(this.streamId);
      video
        .play()
        .then(() => {
          console.log("成功");
        })
        .catch(() => {
          console.log("失败");
        });
    },
    pullStream() {
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

          let res = await axios.post(
            "https://webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream",
            {
              streamurl: "webrtc://5664.liveplay.myqcloud.com/live/5664_harchar1",
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
    this.$bus.$on("toggle", (a) => {
      this.toggle = false;
      setTimeout(() => {
        this.toggle = true;
      }, 300);
    });
    document.body.addEventListener(
      "click",
      () => {
        if (!this.first) {
          this.play();
          this.first = true;
        }
        if (!this.type) return;
        let video = document.getElementById(this.streamId);
        video.muted = false;
      },
      true
    );
  }
};
</script>
<style lang="scss" scoped>
.video {
  position: absolute;
  height: 100%;
  width: 100%;
  &-play {
    width: 100%;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
  &-main {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: rotateY(180deg);
}
</style>
