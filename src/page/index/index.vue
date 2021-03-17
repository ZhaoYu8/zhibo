<template>
  <div class="home">
    <Header @dblclick="hanlderDblclick">
      <van-image round class="header-image" :src="user.avatar" fit="cover" /> <span class="header-name">{{ user.nickname }}</span>
    </Header>
    <div class="home-box">
      <transition name="van-slide-down">
        <div v-if="type">
          <div class="box-swipe">
            <van-swipe class="swipe" :autoplay="8000" indicator-color="#777777">
              <van-swipe-item v-for="(image, index) in images" :key="index">
                <van-image class="swipe-image" fit="cover" :src="image"></van-image>
              </van-swipe-item>
            </van-swipe>
          </div>
          <van-row class="grid">
            <van-col span="6" v-for="(item, index) in swipeList" :key="item.name" class="flex-center flex-dir-column">
              <van-image fit="cover" class="grid-img" :src="require(`../../assets/index${index + 1}.png`)"></van-image>
              <div class="mt-10 f-b">{{ item.name }}</div>
            </van-col>
          </van-row>
          <van-row class="mt-10 toy" gutter="10">
            <van-col span="12" class="toy-col" @click="hanlderChange(0)">
              <div class="toy-video">
                <video
                  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2e3f30de-b94b-4470-92e1-80b77869669b/3709a726-9bb5-486b-8986-9230051e32d9.mp4"
                  muted
                  autoplay
                  playsinline
                  loop
                  ref="video1"
                ></video>
              </div>
              <div class="toy-text">
                推币机
              </div>
            </van-col>
            <van-col span="12" class="toy-col" @click="hanlderChange(1)">
              <div class="toy-video">
                <video
                  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2e3f30de-b94b-4470-92e1-80b77869669b/1e8bd423-d5df-4479-84ef-1ffd27f97c8d.mp4"
                  ref="video2"
                  muted
                  autoplay
                  playsinline
                  loop
                ></video>
              </div>
              <div class="toy-text">
                娃娃机
              </div>
            </van-col>
          </van-row>
        </div>
      </transition>
      <transition name="van-slide-up">
        <div v-if="!type">
          <div @click="type = !type">
            <Icon icon="fanhui" fontSize="30" />
          </div>
          <van-grid class="machine" :border="false" :column-num="2">
            <van-grid-item v-for="(row, index) in machineList" :key="row.id">
              <div class="machine-box" @click="play(row)">
                <img class="machine-box-image" :src="require(`../../assets/${current === 1 ? 'tuibi' : 'wawa'}.jpg`)" />
                <div class="machine-box-header">
                  <div>
                    {{ current === 1 ? "1" : "5" }}
                    <Icon icon="jinbi" fontSize="15" />
                  </div>
                  <div class="machine-box-header-type" :class="{ 'machine-box-header-type-host': row.pushUserId !== '-1' }">
                    <div>{{ row.pushUserId === "-1" ? "空闲中" : "热玩中" }}</div>
                  </div>
                </div>
                <div class="machine-box-text">{{ current === 1 ? "推币机" : "娃娃机" }} {{ index + 1 }}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </transition>
    </div>
    <div class="prize">
      <div class="prize-show">奖品展示</div>
      <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
        <van-row :gutter="10">
          <van-col :span="6" v-for="item in list" :key="item" class="product" @click="hanlderProduct(item)">
            <van-image class="product-image" fit="cover" :src="item.list_pic_url"></van-image>
            <div class="product-name">{{ item.name }}</div>
            <div class="product-price">￥ {{ item.retail_price }}</div>
          </van-col>
        </van-row>
      </van-list>
    </div>

    <!-- -->
  </div>
</template>

<script>
export default {
  name: "index",
  components: {
    icon: () => import("./components/icon")
  },
  data() {
    return {
      type: true,
      machineList: [],
      images: ["https://s3.ax1x.com/2021/01/12/sGx2Ss.png", "https://s3.ax1x.com/2021/01/12/sGx2Ss.png", "https://s3.ax1x.com/2021/01/12/sGx2Ss.png"],
      interval: null,
      swipeList: [{ name: "游戏说明" }, { name: "新人奖励" }, { name: "兑换奖品" }, { name: "在线客服" }],
      current: 1,
      list: [],
      loading: false,
      finished: false,
      listQuery: {
        page: 1,
        size: 10
      }
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  deactivated() {
    clearInterval(this.interval);
  },
  computed: {
    user() {
      return this.$store.state.user.user || {};
    }
  },
  methods: {
    hanlderDblclick() {
      let num = document.getElementsByClassName("home")[0];
      setTimeout(function animation() {
        if (num.scrollTop > 0) {
          setTimeout(() => {
            // 步进速度
            num.scrollTop = num.scrollTop - 30;
            // 返回顶部
            if (num.scrollTop > 0) {
              num.scrollTop = num.scrollTop - 30;
            }
            animation();
          }, 1);
        }
      }, 1);
    },
    async onLoad() {
      this.listQuery.page = this.listQuery.page + 1;
      await this.listQueryFn();
      this.loading = false;
      this.finished = this.list.length % 10;
    },
    hanlderChange(index) {
      clearInterval(this.interval);
      this.type = !this.type;
      this.current = index + 1;
      this.init();
      this.interval = setInterval(() => {
        this.init();
      }, 3000);
    },
    async init() {
      // 查询机器状态
      let res = await this.$get("coin/list");
      let { data } = await this.$get("coin/AppointmentList");
      res = res.data.result;
      // isOnline 是否在线 coinType 0 1 2
      this.machineList = res
        .map((r, i) => {
          // if (!r.isOnline) return;
          if (Number(r.coinType) === Number(this.current)) {
            return { ...r, ...data.result[r.coinId] };
          }
        })
        .filter((r) => r);
      // this.list.map((r, i) => {
      //   let o = res.data.result.filter((n) => n.coinId === r.coinId)[0];
      //   this.$set(this.list[i], "statusId", o.statusId);
      // });
    },
    boxClick(item, row) {
      clearInterval(this.interval);
      if (row.current) {
        this.$get("/coin/Appointment", {
          coinId: row.coinId
        });
      }
      this.$router.push({
        path: item.url,
        query: { coinId: row.coinId, webrtc: row.videoUrl }
      });
    },
    play(row) {
      clearInterval(this.interval);
      let arr = ["pushLevelDetail", "doll"];
      this.type = !this.type;
      this.$router.push({
        path: arr[this.current - 1],
        query: { coinId: row.coinId, webrtc: row.videoUrl }
      });
    },
    async listQueryFn() {
      let { data } = await this.$post(`goods/showProduct?page=${this.listQuery.page}&size=${this.listQuery.size}`, {}, true);
      this.list.push(...data.data);
    },
    hanlderProduct(row) {
      wx.miniProgram.navigateTo({
        url: `/pages/goods/goods?id=${row.id}`, //指定跳转至小程序页面的路径
        success: function() {
          console.log("success"); //页面跳转成功的回调函数
        }
      });
    }
  },
  mounted() {
    this.listQueryFn();
  },
  activated() {
    // 让首页二个视频播放 视频已经压缩过了。
    // 监听浏览器返回
    window.addEventListener(
      "popstate",
      () => {
        if (this.$refs.video1) {
          this.$refs.video1.play();
          this.$refs.video2.play();
        }
      },
      false
    );
    // 监听 点击事件
    document.addEventListener("click", () => {
      if (this.$refs.video1) {
        this.$refs.video1.play();
        this.$refs.video2.play();
      }
    });
    // 监听微信 jsapi 的事件
    document.addEventListener(
      "WeixinJSBridgeReady",
      () => {
        this.$refs.video1.play();
        this.$refs.video2.play();
      },
      false
    );
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 12px;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  transform: all 0.5s;
  &-box {
    margin-top: 40px;
  }
  .box-swipe {
    margin: 5px 0 10px;
    background-color: #fff;
    position: relative;
    .swipe {
      position: initial;
      font-size: 20px;
      height: 160px;
      &-image {
        width: 100%;
        height: 100%;
      }
      ::v-deep .van-swipe__indicators {
        left: 90%;
        bottom: 6px;
        .van-swipe__indicator {
          height: 8px;
          width: 8px;
          opacity: 1;
        }
      }
    }
  }
  .grid {
    background-color: #f8f8f8;
    padding: 10px 0;
    color: #70591d;
    font-size: 10px;
    font-weight: bold;
    &-img {
      height: 50px;
      width: 50px;
    }
  }
  .toy {
    &-video {
      height: 200px;
      border-radius: 4px;
      position: relative;
      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: 0% 80%;
      }
    }
    &-text {
      color: #fff;
      height: 30px;
      display: inline-flex;
      width: 100%;
      font-size: 12px;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      background-color: #d8d4d4;
      margin-top: -4px;
      z-index: 10;
    }
    &-col {
      &:last-child {
        video {
          object-position: 0% 20%;
        }
      }
    }
  }
  .machine {
    background-color: #fff;
    padding: 0 !important;
    margin: 0 -10px;
    @extend .flex;
    flex-wrap: wrap;
    &-box {
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      &-image {
        height: 168px;
        object-position: 50% 79%;
        object-fit: cover;
        width: 100%;
      }
      &-header {
        position: absolute;
        left: 0;
        bottom: 30px;
        background-color: rgba($color: #000000, $alpha: 0.5);
        z-index: 2;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #fff;
        padding: 5px 10px;
        font-size: 15px;
        &-type {
          background-color: #1eb91e;
          display: inline-block;
          border-radius: 15px;
          color: #fff;
          div {
            font-size: 10px;
            font-weight: bold;
            padding: 3px 8px;
          }
        }
        &-type-host {
          background-color: #f76c02;
        }
      }
      &-text {
        height: 30px;
        line-height: 30px;
        background-color: #eeeeee;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: bold;
        padding: 0 10px;
      }
    }
    ::v-deep .van-grid-item__content {
      padding-bottom: 0px;
    }
  }
  .prize {
    &-show {
      font-size: 20px;
      color: #333333;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
  .product {
    width: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &-image {
      height: 144px;
      width: 144px;
    }
    &-name {
      font-size: 12px;
      color: #333333;
      margin-top: 10px;
      font-weight: bold;
      height: 36px;
      line-height: 1.5;
      overflow: hidden;
      display: inline-flex;
      -webkit-line-clamp: 2;
    }
    &-price {
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #b1504f;
      font-weight: bold;
    }
  }
}
</style>
