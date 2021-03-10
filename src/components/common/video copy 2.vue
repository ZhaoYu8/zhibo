<template>
  <div class="video">
    <div id="aaa" style="z-index: 9999;">拉流</div>
    <div id="remote-video-wrap"></div>
  </div>
</template>

<script>
function getStreamId(url) {
  //var url = "webrtc://domain/path/stream_id[?txSecret=xxx&txTime=xxx]";
  var parseStreamid = /^(?:webrtc:\/\/)(?:[0-9.\-A-Za-z_]+)(?:\/)(?:[0-9.\-A-Za-z_]+)(?:\/)([^?#]*)(?:\?*)(?:[^?#]*)/;
  var result = parseStreamid.exec(url);
  if (result) return result[1];
  return null;
}

function createVideoElement(id) {
  var videoDiv = document.createElement("div");
  videoDiv.innerHTML = `<video id="${id}" autoplay unmuted playsinline controls class="video-main"></video>`; //width="480" height="320"
  document.querySelector("#remote-video-wrap").appendChild(videoDiv);

  return document.getElementById(id);
}

function onAddStream(e) {
  console.log(`onAddStream, streamId:${e.streamId}`, e.stream);
  var streamId = e.streamId;
  var video = document.getElementById(streamId);
  if (!video) {
    video = createVideoElement(streamId);
  }

  video.srcObject = e.stream;
  //video.muted = true
  video.autoplay = true;
  video.playsinline = true;
  var playPromise = video.play();
  if (playPromise) {
    playPromise
      .then(() => {
        console.log(`play ok!`);
      })
      .catch(() => {
        console.log(`play failed!`);
      });
  }
}

var streamUrl;
var svrSig;
var peerConnection;

function pullStream() {
  var clientInfo = "clientinfo_test";
  var sessionId = "sessionId_Test";
  streamUrl = "webrtc://live.yiyuanmaidian.com/game/411";
  var streamId = getStreamId(streamUrl);
  var video = document.getElementById(streamId);
  if (!video) {
    video = createVideoElement(streamId);
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

  peerConnection = new RTCPeerConnection(config, optional);
  peerConnection.onicecandidate = function(e) {
    console.log("peerConnection.onicecandidate:", e);
  };
  peerConnection.onaddstream = function(e) {
    console.log("peerConnection.onaddstream");
  };
  peerConnection.onremovestream = function(e) {
    console.log("peerConnection.onremovestream");
  };
  peerConnection.ontrack = function(e) {
    console.log("peerConnection.ontrack, kind:" + e.track.kind + ",track.id:" + e.track.id);

    var track = e.track;
    if (!peerConnection.stream) {
      peerConnection.streamId = streamId;
      peerConnection.stream = new MediaStream();
      peerConnection.stream.addTrack(track);

      onAddStream(peerConnection);
    } else {
      peerConnection.stream.addTrack(track);
      console.log("track.lenght:" + peerConnection.stream.getTracks().length);
    }
  };
  peerConnection.onconnectionstatechange = function(e) {
    console.log("onconnectionstatechange", e);
  };
  peerConnection.oniceconnectionstatechange = function(e) {
    console.log("peerConnection.oniceconnectionstatechange: " + JSON.stringify(e), e);
  };
  peerConnection.onicegatheringstatechange = function(e) {
    console.log("peerConnection.onicegatheringstatechange : " + e.target.iceGatheringState, e);
  };
  peerConnection.onsignalingstatechange = function(e) {
    console.log("peerConnection.onsignalingstatechange : " + peerConnection.signalingState, e);
  };
  peerConnection.onnegotiationneeded = function(e) {
    console.log("peerConnection.onnegotiationneeded", e);
  };

  peerConnection
    .createOffer(offerSdpOption)
    .then(function(offer) {
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
      console.log("peerConnection.split3", offer.sdp);

      peerConnection.setLocalDescription(offer);

      var url = "https://webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream";
      var reqBody = {
        streamurl: streamUrl,
        sessionid: sessionId,
        clientinfo: clientInfo,
        localsdp: offer
      };

      $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(reqBody),
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: pullStreamRes,
        crossDomain: true
      });
      //fly.interceptors.request.use((request) => {
      //   request.headers['Content-Type'] ='application/json';
      //   request.headers['Access-Control-Allow-Origin'] ='*';
      //   request.headers['Access-Control-Allow-Credentials'] ='true';
      //})
      //fly.post(url, JSON.stringify(reqBody)).then(pullStreamRes).catch(function(error){
      //   console.log("fly post err:", error);
      //});

      function pullStreamRes(data) {
        console.log("pullStreamRes:", data);
        //    data = data.data;
        var errCode = data.errcode;
        var errMsg = data.errmsg;
        if (errCode != 0) {
          console.log(`pull stream failed!errCode:${errCode}, errmsg:${errMsg}`);
          return;
        }

        var remoteSdp = data.remotesdp;
        svrSig = data.svrsig;

        console.log(`svrSig:${svrSig}`);

        peerConnection.setRemoteDescription(
          new RTCSessionDescription(remoteSdp),
          function() {
            console.log("setRemoteSdp succ!");
          },
          function(e) {
            console.log("setRemoteSdp failed, exception = " + e.message);
          }
        );
      }
    })
    .catch(function(reason) {
      console.log("create offer failed : reason = " + reason);
    });
}
$(document).ready(function() {
  $("#aaa").click(function() {
    pullStream();
  });
});
export default {
  name: "video",
  components: {},
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {}
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
    height: 60%;
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

<style lang="scss">
.video-main {
  position: fixed;
  height: 60%;
  width: 100%;
  z-index: 1;
}
</style>
