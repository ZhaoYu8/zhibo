<template>
  <div class="video" :style="{ top: type ? '0' : '-100%' }">
    <transition name="fade">
      <div class="video-content">
        <video
          v-show="toggle"
          id="onceVideo"
          class="video-main"
          style="object-fit: cover;"
          src="../../assets/2.mp4"
          :style="{ top: type ? '0' : '-100%' }"
          muted
          autoplay
          playsinline
          width="100%"
          height="100%"
        ></video>
      </div>
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
      first: false,
      webrtc: ""
    };
  },
  props: {},
  watch: {
    $route: {
      handler(val) {
        let video = document.getElementById(this.streamId);
        if (!video) return;
        if (["doll", "pushLevelDetail"].includes(val.name)) {
          this.type = true;
        } else {
          this.first = this.type = false;
          video.muted = true;
        }
      },
      immediate: true
    }
  },
  methods: {
    play() {
      let video = document.getElementById(this.streamId);
      video
        .play()
        .then(() => {
          console.log("成功");
        })
        .catch(() => {
          this.first = false;
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
      if (!this.webrtc) return;
      this.peerCallback();
    },
    peerCallback() {
      let peerConnection = this.peerConnection;
      this.peerConnection.ontrack = (e) => {
        console.log("peerConnection.ontrack, kind:" + e.track.kind + ",track.id:" + e.track.id);
        let track = e.track;
        if (!peerConnection.stream) {
          peerConnection.streamId = this.streamId;
          peerConnection.stream = new MediaStream();
          peerConnection.stream.addTrack(track);
          this.onAddStream(peerConnection);
        } else {
          console.log(2);
          peerConnection.stream.addTrack(track);
          console.log("track.lenght:" + peerConnection.stream.getTracks().length);
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
              streamurl: this.webrtc,
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
      video.autoplay = true;
      video.playsinline = true;
      setTimeout(() => {
        this.play();
      });
    }
  },
  mounted() {
    this.$bus.$on("toggle", (val) => {
      this.webrtc = val;
      this.pullStream();
      this.toggle = false;
      setTimeout(() => {
        this.toggle = true;
      }, 500);
    });
    this.$bus.$on("toggleVideo", (val) => {
      this.webrtc = val;
      this.pullStream();
    });
    document.body.addEventListener(
      "click",
      () => {
        if (this.first) return;
        this.play();
        this.first = true;
        if (!["doll", "pushLevelDetail"].includes(this.$route.name)) return;
        setTimeout(() => {
          let video = document.getElementById(this.streamId);
          video.muted = false;
        }, 1000);
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
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: rotateY(180deg);
}
</style>
