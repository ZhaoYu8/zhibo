(function(e){function t(t){for(var r,i,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)i=s[l],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},i={app:0},o={app:0},a=[];function s(e){return c.p+"static/js/"+({doll:"doll",me:"me",pay:"pay",pushLevelDetail:"pushLevelDetail",ranking:"ranking",recharge:"recharge"}[e]||e)+"."+{doll:"e4fa1f6f",me:"0809f8ff",pay:"66285b98",pushLevelDetail:"06275190",ranking:"afece487",recharge:"2cd1820f","chunk-2d0e1d37":"3a9ec29b","chunk-681dc529":"c395d4e0","chunk-75365f9c":"9d6163c8"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={doll:1,pay:1,pushLevelDetail:1,ranking:1,recharge:1,"chunk-681dc529":1,"chunk-75365f9c":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var r="static/css/"+({doll:"doll",me:"me",pay:"pay",pushLevelDetail:"pushLevelDetail",ranking:"ranking",recharge:"recharge"}[e]||e)+"."+{doll:"5d341880",me:"31d6cfe0",pay:"ef138375",pushLevelDetail:"52a49bae",ranking:"4c2386ed",recharge:"6c3b8fe5","chunk-2d0e1d37":"31d6cfe0","chunk-681dc529":"ded52f04","chunk-75365f9c":"6b03aded"}[e]+".css",o=c.p+r,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var u=a[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete i[e],p.parentNode.removeChild(p),n(a)},p.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){i[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=a);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",d.name="ChunkLoadError",d.type=r,d.request=i,n[1](d)}o[e]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"042c":function(e,t,n){},"0951":function(e,t,n){"use strict";n("6ad3")},"0f9a":function(e,t,n){"use strict";n.r(t);var r={user:{},coin:0,point:0},i={UPDATE_USER:function(e,t){e.user=t},UPDATE_COIN:function(e,t){e.coin=t},UPDATE_POINT:function(e,t){e.point=t}},o={updateUser:function(e,t){var n=e.commit;n("UPDATE_USER",t)},updateCoin:function(e,t){var n=e.commit;n("UPDATE_COIN",t)},updatePoint:function(e,t){var n=e.commit;n("UPDATE_POINT",t)}};t["default"]={namespaced:!0,state:r,mutations:i,actions:o}},1432:function(e,t,n){"use strict";n("3397")},"146b":function(e,t,n){e.exports=n.p+"static/img/index2.914aee92.png"},"1f1b":function(e,t,n){"use strict";n("7d1a")},2508:function(e,t,n){"use strict";n("e0d5")},"26f3":function(e,t,n){e.exports=n.p+"static/img/index4.52542457.png"},"2e6a":function(e,t,n){e.exports=n.p+"static/img/index1.c50fe055.png"},3397:function(e,t,n){},"53b4":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Video"),n("keep-alive",[n("router-view",{staticClass:"router"})],1)],1)},i=[],o=(n("c740"),n("b0c0"),n("4d63"),n("ac1f"),n("25f0"),n("466d"),n("841c"),n("96cf"),n("1da1")),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"video",style:{top:e.type?"0":"-100%"}},[r("transition",{attrs:{name:"fade"}},[r("div",{staticClass:"video-content"},[r("video",{directives:[{name:"show",rawName:"v-show",value:e.toggle,expression:"toggle"}],staticClass:"video-main",staticStyle:{"object-fit":"cover"},style:{top:e.type?"0":"-100%"},attrs:{id:"onceVideo",src:n("5f68"),muted:"",autoplay:"",playsinline:"",width:"100%",height:"100%"},domProps:{muted:!0}})])])],1)},s=[],c=(n("99af"),n("caad"),n("baa5"),n("d3b7"),n("1276"),{name:"video",components:{},data:function(){return{streamId:"onceVideo",peerConnection:"",content:"",type:!1,toggle:!0,first:!1,webrtc:""}},props:{},watch:{$route:{handler:function(e){var t=document.getElementById(this.streamId);t&&(["doll","pushLevelDetail"].includes(e.name)?this.type=!0:(this.first=this.type=!1,t.muted=!0))},immediate:!0}},methods:{play:function(){var e=this,t=document.getElementById(this.streamId);t.play().then((function(){console.log("成功")})).catch((function(){e.first=!1,console.log("失败")}))},pullStream:function(){this.peerConnection=new RTCPeerConnection({iceServers:[],bundlePolicy:"max-bundle",rtcpMuxPolicy:"require",tcpCandidatePolicy:"disable",IceTransportsType:"nohost",sdpSemantics:"unified-plan"},{optional:[{DtlsSrtpKeyAgreement:!0}]}),this.webrtc&&this.peerCallback()},peerCallback:function(){var e=this,t=this.peerConnection;this.peerConnection.ontrack=function(n){console.log("peerConnection.ontrack, kind:"+n.track.kind+",track.id:"+n.track.id);var r=n.track;t.stream?(console.log(2),t.stream.addTrack(r),console.log("track.lenght:"+t.stream.getTracks().length)):(t.streamId=e.streamId,t.stream=new MediaStream,t.stream.addTrack(r),e.onAddStream(t))},t.createOffer({offerToReceiveAudio:!0,offerToReceiveVideo:!0,voiceActivityDetection:!1}).then(function(){var n=Object(o["a"])(regeneratorRuntime.mark((function n(r){var i,o,a,s,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:for(i=r.sdp.toString().split("\r\n"),o="",a=0;a<i.length-1;a++)-1!=i[a].lastIndexOf("a=fmtp:111")?o+=i[a]+";stereo=1\r\n":o+=i[a]+"\r\n";return r.sdp=o,t.setLocalDescription(r),n.next=7,axios.post("https://webrtc.liveplay.myqcloud.com/webrtc/v1/pullstream",{streamurl:e.webrtc,sessionid:"sessionId_Test",clientinfo:"clientinfo_test",localsdp:r},!0);case 7:if(s=n.sent,c=s.data,0==c.errcode){n.next=12;break}return console.log("pull stream failed!errCode:".concat(c.errcode,", errmsg:").concat(c.errmsg)),n.abrupt("return");case 12:t.setRemoteDescription(new RTCSessionDescription(c.remotesdp));case 13:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())},onAddStream:function(e){var t=this,n=e.streamId,r=document.getElementById(n);r.srcObject=e.stream,r.autoplay=!0,r.playsinline=!0,setTimeout((function(){t.play()}))}},mounted:function(){var e=this;this.$bus.$on("toggle",(function(t){e.webrtc=t,e.pullStream(),e.toggle=!1,setTimeout((function(){e.toggle=!0}),500)})),this.$bus.$on("toggleVideo",(function(t){e.webrtc=t,e.pullStream()})),document.body.addEventListener("click",(function(){e.first||(e.play(),e.first=!0,["doll","pushLevelDetail"].includes(e.$route.name)&&setTimeout((function(){var t=document.getElementById(e.streamId);t.muted=!1}),1e3))}),!0)}}),u=c,l=(n("1f1b"),n("2877")),d=Object(l["a"])(u,a,s,!1,null,"38407c98",null),p=d.exports,m={data:function(){return{arr:[{name:"首页",icon:"home-o",url:"index"},{name:"充值",icon:"balance-pay",url:"recharge"}],active:0}},components:{Video:p},computed:{user:function(){return this.$store.state.user.user||{}}},methods:{init:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.queryUserInfo();case 2:e.gameInfo();case 3:case"end":return t.stop()}}),t)})))()},queryUserInfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$post("user/info",{},!0);case 2:n=t.sent,e.$store.dispatch("user/updateUser",n.data);case 4:case"end":return t.stop()}}),t)})))()},gameInfo:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$get("user/gameInfo?userId=".concat(e.user.userId),{},!0);case 2:n=t.sent,r=n.data,e.$store.dispatch("user/updatePoint",r.userPoint.point),e.$store.dispatch("user/updateCoin",r.userCoin.num);case 6:case"end":return t.stop()}}),t)})))()},GetQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null}},watch:{$route:{handler:function(e){if(e.name){var t=this.arr.findIndex((function(t){return t.url===e.name}));if(-1===t)return;this.active=t}},immediate:!0}},mounted:function(){var e=this;this.init(),this.$bus.$on("globalInit",(function(){e.queryUserInfo(),e.gameInfo()})),this.$bus.$on("updateInfo",(function(){e.gameInfo()})),localStorage.setItem("token",this.GetQueryString("token")),console.log(this.GetQueryString("token"))}},f=m,g=(n("1432"),Object(l["a"])(f,r,i,!1,null,"540254c2",null)),h=g.exports,A=n("9cc4"),v=[{path:"/",name:"index",component:A["default"]},{path:"/index",name:"index",component:function(){return Promise.resolve().then(n.bind(null,"9cc4"))},meta:{keepAlive:!0}},{path:"/ranking",name:"ranking",component:function(){return n.e("ranking").then(n.bind(null,"9d95"))}},{path:"/recharge",name:"recharge",component:function(){return n.e("recharge").then(n.bind(null,"4e4a"))}},{path:"/me",name:"me",component:function(){return n.e("me").then(n.bind(null,"2f66"))}},{path:"/pushLevelDetail",name:"pushLevelDetail",component:function(){return n.e("pushLevelDetail").then(n.bind(null,"92d0"))}},{path:"/doll",name:"doll",component:function(){return n.e("doll").then(n.bind(null,"7523"))}},{path:"/pay",name:"pay",component:function(){return n.e("pay").then(n.bind(null,"86c1"))}}],y=new VueRouter({mode:"",base:"",routes:v}),w=y,b=(n("13d5"),n("5319"),n("ddb0"),{sidebar:function(e){return e.app.sidebar}}),k=b;Vue.use(Vuex);var x=n("c653"),C=x.keys().reduce((function(e,t){var n=t.replace(/^\.\/(.*)\.\w+$/,"$1"),r=x(t);return e[n]=r.default,e}),{}),D=new Vuex.Store({modules:C,getters:k}),T=D,j=(n("a15b"),n("2b19"),n("2532"),"/"),Q=axios.create({baseURL:j,timeout:15e3,responseType:"json",validateStatus:function(e){return 200===e}});document.cookie="",Q.interceptors.request.use((function(e){var t=localStorage.getItem("token");return t="null"!=t?t:"5tjg4rt9cuf2tk4ukhtor7co230dmvq1",t&&(e.headers["X-Nideshop-Token"]=t),e}),(function(e){return Promise.reject(e)})),Q.interceptors.response.use((function(e){return 200!==e.status||e.config.url.includes("www.worksp.cn")||e.data.success||"投币失败"!==e.data.msg&&vant.Notify(e.data.msg||"调用失败！"),e}),(function(e){return Promise.reject(e)}));var E,I={post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;return n&&(e="https://www.worksp.cn/platform-framework/api/".concat(e)),Q.post(e,t,{headers:{"Content-Type":"application/json"}})},get:function(e,t,n){var r;n&&(e="https://www.worksp.cn/platform-framework/api/".concat(e));var i=[];if(Object.is(t,void 0))r="";else{for(var o in t)t.hasOwnProperty(o)&&null!==t[o]&&i.push("".concat(o,"=").concat(t[o]));r=0===i.length?"":"?"+i.join("&")}return Q.get("".concat(e).concat(r))}},S=I,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{staticClass:"icon",style:{fontSize:e.fontSize+"px"},attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#my-icon-"+e.icon}})])},M=[],L={naem:"icon",data:function(){return{}},props:{icon:{type:String,default:""},fontSize:{type:String,default:"24"}},computed:{},mounted:function(){}},V=L,B=(n("0951"),Object(l["a"])(V,R,M,!1,null,"219ac8c4",null)),U=B.exports,P=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",{staticClass:"header",on:{click:e.hanlderDblclick}},[r("div",{staticClass:"flex"},[e._t("default")],2),r("ul",{staticClass:"header-money"},[r("li",{staticClass:"flex",on:{click:function(t){e.type=!0}}},[r("img",{staticClass:"gem",attrs:{src:n("8e4c"),alt:"",srcset:""}}),r("span",[e._v(e._s(e.user.coin))]),r("img",{staticClass:"gem-add",attrs:{src:n("9b8d"),alt:"",srcset:""}})]),r("li",{staticClass:"flex"},[r("img",{staticClass:"gem",attrs:{src:n("b970"),alt:"",srcset:""}}),r("span",[e._v(e._s(e.user.point))])])]),r("recharge",{attrs:{show:e.type},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}})],1)},N=[],O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("van-popup",{staticClass:"recharge",attrs:{round:"",closeable:!0,"safe-area-inset-bottom":!0},on:{close:e.close},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[n("div",{staticClass:"button"},[n("van-button",{class:{active:0===e.activeKey},attrs:{round:"",type:"info",size:"small"},on:{click:function(t){e.activeKey=0}}},[e._v("充值")])],1),n("div",{staticClass:"recharge-box"},[n("div",{staticClass:"card"},[n("rechargeCard",{attrs:{item:e.arr,col:"47.5%",num:"2"},on:{click:e.moneyClose}})],1)])])},z=[],q=(n("d81d"),n("fb6a"),n("a9e3"),n("ade3")),H=(E={naem:"recharge",data:function(){return{activeKey:0,arr:[]}},props:{show:{type:Boolean,default:!1}},computed:{}},Object(q["a"])(E,"computed",{user:function(){var e=this.$store.state.user.user||{},t=e.recharge;return t?t.split("").map((function(e){return Number(e)})):[]}}),Object(q["a"])(E,"watch",{user:{handler:function(){var e=[{type:2,money:5,num:200,bestowNum:0},{type:2,money:6,num:120,bestowNum:0},{type:2,money:30,num:600,bestowNum:0},{type:2,money:50,num:1e3,bestowNum:0},{type:2,money:100,num:2e3,bestowNum:500},{type:2,money:200,num:4e3,bestowNum:1200},{type:1,money:6,num:30,bestowNum:5},{type:1,money:30,num:150,bestowNum:30},{type:1,money:50,num:250,bestowNum:70},{type:1,money:100,num:500,bestowNum:200},{type:1,money:200,num:1e3,bestowNum:500}],t=[];this.user.map((function(n,r){0!==r?t[r]=e[0===n?r:r+5]:0===n&&(t[r]=e[r])})),t[0]||(t=t.slice(1)),this.arr=t},immediate:!0,deep:!0}}),Object(q["a"])(E,"mounted",(function(){})),Object(q["a"])(E,"methods",{close:function(){this.$emit("input",this.show)},moneyClose:function(){var e=this;this.$dialog.alert({title:"提示",message:"更新游戏币",theme:"round-button",beforeClose:function(t,n){e.$bus.$emit("globalInit"),n()}}),this.$emit("input",!1)}}),E),X=H,J=(n("5bd3"),Object(l["a"])(X,O,z,!1,null,"714d3e34",null)),Z=J.exports,F=1,G={timeA:"",timeB:""},Y={components:{recharge:Z},naem:"header",data:function(){return{type:!1}},computed:{user:function(){return this.$store.state.user||{}}},methods:{top:function(){var e=document.getElementsByClassName("hone-content")[0];setTimeout((function t(){e.scrollTop>0&&setTimeout((function(){e.scrollTop=e.scrollTop-30,e.scrollTop>0&&(e.scrollTop=e.scrollTop-30),t()}),1)}),1)},hanlderDblclick:function(){if(1===F)return G.timeA=new Date,void F++;G.timeB=new Date,Math.abs(G.timeA-G.timeB)>300?G.timeA=new Date:(this.$emit("dblclick"),this.top(),F=1)}}},K=Y,W=(n("cdde"),Object(l["a"])(K,P,N,!1,null,"d87d90ba",null)),_=W.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"recharge-card"},e._l(e.item,(function(t,r){return n("div",{key:t.moeny,on:{click:function(n){return e.handleRecharge(t,r)}}},[n("div",{staticClass:"recharge-card-coins",class:{"recharge-card-active":2===t.type},style:{width:e.col,"margin-right":(r+1)%e.num===0?0:"5%"}},[2===t.type?n("div",{staticClass:"active"},[n("van-icon",{staticClass:"icon",attrs:{name:"point-gift-o"}}),e._v("首充")],1):e._e(),n("div",{staticClass:"num"},[e._v(e._s(t.num)+"币")]),t.bestowNum?n("div",{staticClass:"bestowNum"},[e._v("送"+e._s(t.bestowNum)+"币")]):e._e(),n("div",{staticClass:"money"},[e._v("￥ "+e._s(t.money)+".00")])])])})),0)},ee=[];function te(){console.log(1,"miniprogram"===window.__wxjs_environment)}var ne={props:{item:{type:Array,default:[]},col:{type:String,default:"30%"},num:{type:Number|String,default:3}},data:function(){return{href:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc54755f1f5042a10&redirect_uri=https%3a%2f%2fplay.yiyuanmaidian.com%2f%23%2fpay&response_type=code&scope=snsapi_base",token:""}},mounted:function(){this.token=localStorage.getItem("token"),window.WeixinJSBridge&&WeixinJSBridge.invoke?te():document.addEventListener("WeixinJSBridgeReady",te,!1)},computed:{user:function(){return this.$store.state.user||{}}},methods:{handleRecharge:function(e){var t=this;wx.miniProgram.navigateTo({url:"/pages/ucenter/recharge/recharge?userId=".concat(this.user.user.userId,"&actualPrice=").concat(e.money),success:function(){console.log("success")}}),setTimeout((function(){t.$emit("click")}),1e3)}}},re=ne,ie=(n("c7e0"),Object(l["a"])(re,$,ee,!1,null,"12ff7738",null)),oe=ie.exports,ae={install:function(e){e.component("Icon",U),e.component("Header",_),e.component("Recharge",Z),e.component("RechargeCard",oe)}},se=ae,ce=(n("042c"),{throttle:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,r=!1;return function(){r||(r=setTimeout((function(){e.apply(t),r=!1}),n))}}}),ue=ce,le=(n("5cfb"),n("1188")),de=n("c32d"),pe=n.n(de);Vue.use(le["vueBaberrage"]),Vue.use(se),Vue.config.productionTip=!1,Object.assign(Vue.prototype,{$post:S.post,$get:S.get,$global:ue,$bus:new Vue,$moment:pe.a}),new Vue({router:w,store:T,render:function(e){return e(h)}}).$mount("#app")},"5bd3":function(e,t,n){"use strict";n("ff23")},"5f68":function(e,t,n){e.exports=n.p+"static/media/2.3cf571d4.mp4"},"6ad3":function(e,t,n){},"7d1a":function(e,t,n){},8749:function(e,t,n){e.exports=n.p+"static/img/index5.bd1ca354.png"},"8e4c":function(e,t){e.exports="data:image/png;base64,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"},"97e9":function(e,t,n){e.exports=n.p+"static/img/backBottom.0ea77260.png"},"9b8d":function(e,t){e.exports="data:image/png;base64,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"},"9cc4":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("Header",[r("van-image",{staticClass:"header-image",attrs:{round:"",src:e.user.avatar,fit:"cover"}}),e._v(" "),r("span",{staticClass:"header-name"},[e._v(e._s(e.user.nickname))])],1),r("div",{staticClass:"hone-content"},[r("div",{staticClass:"home-box"},[r("div",{staticClass:"home-box-swipe"},[r("van-swipe",{staticClass:"swipe",attrs:{autoplay:8e3,"indicator-color":"#777777"}},e._l(e.images,(function(e,t){return r("van-swipe-item",{key:t},[r("van-image",{staticClass:"swipe-image",attrs:{fit:"cover",src:e}})],1)})),1)],1),r("div",{staticClass:"grid dis-flex flex-x-around"},e._l(e.swipeList,(function(t,i){return r("div",{key:t.name,staticClass:"flex-center flex-dir-column"},[r("van-image",{staticClass:"grid-img",attrs:{fit:"cover",src:n("9e7d")("./index"+(i+1)+".png")}}),r("div",{staticClass:"mt-10 f-b"},[e._v(e._s(t.name))])],1)})),0),r("van-row",{staticClass:"toy",attrs:{gutter:"10"}},[r("van-col",{staticClass:"toy-col",attrs:{span:"12"},on:{click:function(t){return e.hanlderChange(0)}}},[r("div",{staticClass:"toy-video"},[r("video",{ref:"video1",attrs:{src:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2e3f30de-b94b-4470-92e1-80b77869669b/3709a726-9bb5-486b-8986-9230051e32d9.mp4",muted:"",autoplay:"",playsinline:"",loop:""},domProps:{muted:!0}})])]),r("van-col",{staticClass:"toy-col",attrs:{span:"12"},on:{click:function(t){return e.hanlderChange(1)}}},[r("div",{staticClass:"toy-video"},[r("video",{ref:"video2",attrs:{src:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2e3f30de-b94b-4470-92e1-80b77869669b/1e8bd423-d5df-4479-84ef-1ffd27f97c8d.mp4",muted:"",autoplay:"",playsinline:"",loop:""},domProps:{muted:!0}})])])],1)],1),r("div",{staticClass:"prize"},[e._m(0),r("van-list",{attrs:{finished:e.finished,"immediate-check":!1,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.list,(function(t){return r("div",{key:t,staticClass:"product",on:{click:function(n){return e.hanlderProduct(t)}}},[r("van-image",{staticClass:"product-image",attrs:{fit:"cover",src:t.list_pic_url}}),r("div",{staticClass:"product-name"},[e._v(e._s(t.name))]),r("div",{staticClass:"product-price"},[e._v("￥ "+e._s(t.retail_price))])],1)})),0)],1)])],1)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"prize-show"},[r("img",{staticClass:"prize-show-img",attrs:{src:n("97e9")}}),r("div",{staticClass:"prize-show-text"},[e._v("奖品展示")])])}],o=(n("99af"),n("2909")),a=(n("96cf"),n("1da1")),s={name:"index",components:{},data:function(){return{machineList:[],images:["https://s3.ax1x.com/2021/01/12/sGx2Ss.png","https://s3.ax1x.com/2021/01/12/sGx2Ss.png","https://s3.ax1x.com/2021/01/12/sGx2Ss.png"],interval:null,swipeList:[{name:"游戏说明"},{name:"新人奖励"},{name:"兑换奖品"},{name:"在线客服"},{name:"购买代币"}],current:1,list:[],loading:!1,finished:!1,listQuery:{page:1,size:10}}},beforeDestroy:function(){clearInterval(this.interval)},deactivated:function(){clearInterval(this.interval)},computed:{user:function(){return this.$store.state.user.user||{}}},methods:{onLoad:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.listQuery.page=e.listQuery.page+1,t.next=3,e.listQueryFn();case 3:e.loading=!1,e.finished=e.list.length%10;case 5:case"end":return t.stop()}}),t)})))()},hanlderChange:function(e){this.$router.push({name:"ranking",query:{type:e}})},boxClick:function(e,t){t.current&&this.$get("/coin/Appointment",{coinId:t.coinId}),this.$router.push({path:e.url,query:{coinId:t.coinId,webrtc:t.videoUrl}})},listQueryFn:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$post("goods/showProduct?page=".concat(e.listQuery.page,"&size=").concat(e.listQuery.size),{},!0);case 2:r=t.sent,i=r.data,(n=e.list).push.apply(n,Object(o["a"])(i.list));case 5:case"end":return t.stop()}}),t)})))()},hanlderProduct:function(e){wx.miniProgram.navigateTo({url:"/pages/goods/goods?id=".concat(e.id),success:function(){console.log("success")}})}},mounted:function(){this.listQueryFn()},activated:function(){var e=this;window.addEventListener("popstate",(function(){e.$refs.video1&&(e.$refs.video1.play(),e.$refs.video2.play())}),!1),document.addEventListener("click",(function(){e.$refs.video1&&(e.$refs.video1.play(),e.$refs.video2.play())})),document.addEventListener("WeixinJSBridgeReady",(function(){e.$refs.video1.play(),e.$refs.video2.play()}),!1)}},c=s,u=(n("2508"),n("2877")),l=Object(u["a"])(c,r,i,!1,null,"6f6ea161",null);t["default"]=l.exports},"9e7d":function(e,t,n){var r={"./index1.png":"2e6a","./index2.png":"146b","./index3.png":"b580","./index4.png":"26f3","./index5.png":"8749"};function i(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=o,e.exports=i,i.id="9e7d"},b580:function(e,t,n){e.exports=n.p+"static/img/index3.cb7c028f.png"},b970:function(e,t){e.exports="data:image/png;base64,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"},c32d:function(e,t){e.exports=moment},c653:function(e,t,n){var r={"./user.js":"0f9a"};function i(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=o,e.exports=i,i.id="c653"},c7e0:function(e,t,n){"use strict";n("53b4")},cdde:function(e,t,n){"use strict";n("d21d")},d21d:function(e,t,n){},e0d5:function(e,t,n){},ff23:function(e,t,n){}});