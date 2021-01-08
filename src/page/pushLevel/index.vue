<template>
  <div class="home">
    <van-button @click="pullStream">开始</van-button>
    <video id="999aaa" autoplay unmuted playsinline controls width="100%" height="80%"></video>
    <div v-for="item in list" :key="item" class="box" @click="boxClick(item)">
      <van-image class="image" :src="require('../../assets/cat.jpeg')" fit="cover" />
      <div class="header">
        <div>{{ item.statusId ? "游戏中" : "空闲中" }}</div>
        <div v-show="item.statusId">1人排队</div>
      </div>
      <div class="detail">
        <span>当前奖池: {{ item.statusId }}</span>
        <div>
          <span v-show="item.statusId">12人围观</span>
          <van-button class="button" hairline>围观</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pushLevel",
  components: {},
  data() {
    return {
      list: [],
      interval: null,
      streamUrl: "webrtc://live.yiyuanmaidian.com/game/2",
      streamId: "999aaa",
      peerConnection: ""
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
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
      let peerConnection = this.peerConnection;
      peerConnection.ontrack = (e) => {
        let track = e.track;
        if (!peerConnection.stream) {
          peerConnection.streamId = this.streamId;
          peerConnection.stream = new MediaStream();
          peerConnection.stream.addTrack(track);
          let video = document.getElementById(this.streamId);
          video.srcObject = peerConnection.stream;
          video.play();
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
    async init() {
      let res = await this.$get("coin/list");
      if (!this.list.length) {
        this.list = res.data.result.filter((r) => r.isOnline);
        return;
      }
      this.list.map((r, i) => {
        let o = res.data.result.filter((n) => n.coinId === r.coinId)[0];
        this.$set(this.list[i], "statusId", o.statusId);
      });
    },
    boxClick(item) {
      clearInterval(this.interval);
      this.$router.push({
        path: "pushLevelDetail",
        query: { coinId: item.coinId, userId: parseInt(Math.random() * 1000000) }
      });
    }
  },
  mounted() {
    this.init();
    this.interval = setInterval(() => {
      this.init();
    }, 3000);
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .box {
    height: 180px;
    background-color: #fffbeb;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    .image {
      height: 135px;
    }
    .header {
      position: absolute;
      right: 0;
      top: 10%;
      padding: 4px 10px;
      background-color: #ff9d75;
      color: #fff;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      padding: 0 10px;
      font-size: 12px;
      color: #aa7b1e;
      .button {
        color: #aa7b1e;
        background-color: #ffeea2;
        border: 1px solid #f1d660;
        border-radius: 14px;
        overflow: hidden;
        width: 57px;
        height: 27px;
        padding: 0;
        margin-left: 10px;
      }
    }
  }
}
</style>
