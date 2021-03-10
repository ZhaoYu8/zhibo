<template>
  <div class="video" :style="{ top: type ? '0' : '-100%' }">
    <div id="remote-video-wrap"></div>
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
      webrtc: "webrtc://live.yiyuanmaidian.com/game/411"
    };
  },
  props: {},
  watch: {
    $route: {
      handler(val) {
        if (["doll", "pushLevelDetail"].includes(val.name)) {
          this.type = true;
        } else {
          this.type = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    onAddStream(e) {
      console.log(`onAddStream, streamId:${e.streamId}`, e.stream);
      var streamId = e.streamId;
      var video = document.getElementById(streamId);
      if (!video) {
        video = this.createVideoElement(streamId);
      }

      video.srcObject = e.stream;
      //video.muted = true
      video.autoplay = true;
      video.playsinline = true;
      var playPromise = video.play();
      setInterval(() => {
        video.play();
      }, 2000);
      if (playPromise) {
        playPromise
          .then(() => {
            console.log(`play ok!`);
          })
          .catch(() => {
            console.log(`play failed!`);
          });
      }
    },
    createVideoElement(id) {
      var videoDiv = document.createElement("div");
      videoDiv.innerHTML = `<video id="${id}" autoplay unmuted playsinline controls class="video-main"></video>`; //width="480" height="320"
      document.querySelector("#remote-video-wrap").appendChild(videoDiv);
      return document.getElementById(id);
    },
    async pullStream() {
      var video = document.getElementById(this.streamId);
      if (!video) {
        video = this.createVideoElement(this.streamId);
      }

      var config = {
        iceServers: [],
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        tcpCandidatePolicy: "disable",
        IceTransportsType: "nohost",
        sdpSemantics: "unified-plan"
      };

      var optional = {
        optional: [
          {
            DtlsSrtpKeyAgreement: true
          }
        ]
      };

      var offerSdpOption = {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        voiceActivityDetection: false
      };

      this.peerConnection = new RTCPeerConnection(config, optional);
      this.peerConnection.ontrack = (e) => {
        var track = e.track;
        if (!this.peerConnection.stream) {
          this.peerConnection.streamId = this.streamId;
          this.peerConnection.stream = new MediaStream();
          this.peerConnection.stream.addTrack(track);

          this.onAddStream(this.peerConnection);
        } else {
          this.peerConnection.stream.addTrack(track);
        }
      };

      this.peerConnection
        .createOffer(offerSdpOption)
        .then(async (offer) => {
          var stringSdp = offer.sdp.toString();
          var arrSdp = stringSdp.split("\r\n");
          var stringSdpModify = "";

          for (var i = 0; i < arrSdp.length - 1; i++) {
            if (arrSdp[i].lastIndexOf("a=fmtp:111") != -1) {
              stringSdpModify += arrSdp[i] + ";stereo=1" + "\r\n";
            } else {
              stringSdpModify += arrSdp[i] + "\r\n";
            }
          }
          offer.sdp = stringSdpModify;

          this.peerConnection.setLocalDescription(offer);

          let data = await axios.post(
            "https://webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream",
            {
              streamurl: this.webrtc,
              sessionid: "sessionId_Test",
              clientinfo: "clientinfo_test",
              localsdp: offer
            },
            true
          );
          data = data.data;
          var errCode = data.errcode;
          var errMsg = data.errmsg;
          if (errCode != 0) {
            console.log(`pull stream failed!errCode:${errCode}, errmsg:${errMsg}`);
            return;
          }

          var remoteSdp = data.remotesdp;
          console.log(999);
          this.peerConnection.setRemoteDescription(
            new RTCSessionDescription(remoteSdp),
            function() {
              console.log("setRemoteSdp succ!");
            },
            function(e) {
              console.log("setRemoteSdp failed, exception = " + e.message);
            }
          );
        })
        .catch(function(reason) {
          console.log("create offer failed : reason = " + reason);
        });
    }
  },
  mounted() {
    this.$bus.$on("toggleVideo", (val) => {
      this.webrtc = val;
      this.pullStream();
    });
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
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: rotateY(180deg);
}
</style>
<style lang="scss">
.video-main {
  position: fixed;
  height: 60%;
  width: 100%;
  z-index: 1;
}
</style>
