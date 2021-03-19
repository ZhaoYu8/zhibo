<template>
  <div class="home">
    <Header>
      <i class="my-icon my-icon-arrow-double-left"></i>
      <van-image round class="header-image" :src="user.avatar" fit="cover" /> <span class="header-name">{{ user.nickname }}</span>
    </Header>
    <div class="home-box">
      <div class="home-box-swipe">
        <van-swipe class="swipe" :autoplay="8000" indicator-color="#777777">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <van-image class="swipe-image" fit="cover" :src="image"></van-image>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="grid dis-flex flex-x-around">
        <div v-for="(item, index) in swipeList" :key="item.name" class="flex-center flex-dir-column">
          <van-image fit="cover" class="grid-img" :src="require(`../../assets/index${index + 1}.png`)"></van-image>
          <div class="mt-10 f-b">{{ item.name }}</div>
        </div>
      </div>
      <van-row class="toy" gutter="10">
        <van-col span="12" class="toy-col" @click="hanlderChange(0)">
          <div class="toy-video">
            <video src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2e3f30de-b94b-4470-92e1-80b77869669b/3709a726-9bb5-486b-8986-9230051e32d9.mp4" muted autoplay playsinline loop ref="video1"></video>
          </div>
        </van-col>
        <van-col span="12" class="toy-col" @click="hanlderChange(1)">
          <div class="toy-video">
            <video src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2e3f30de-b94b-4470-92e1-80b77869669b/1e8bd423-d5df-4479-84ef-1ffd27f97c8d.mp4" ref="video2" muted autoplay playsinline loop></video>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="prize">
      <div class="prize-show">
        <img class="prize-show-img" src="../../assets/icon/backBottom.png" />
        <div class="prize-show-text">奖品展示</div>
      </div>
      <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in list" :key="item" class="product" @click="hanlderProduct(item)">
          <van-image class="product-image" fit="cover" :src="item.list_pic_url"></van-image>
          <div class="product-name">{{ item.name }}</div>
          <div class="product-price">￥ {{ item.retail_price }}</div>
        </div>
      </van-list>
    </div>

    <!-- -->
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      machineList: [],
      images: ["https://s3.ax1x.com/2021/01/12/sGx2Ss.png", "https://s3.ax1x.com/2021/01/12/sGx2Ss.png", "https://s3.ax1x.com/2021/01/12/sGx2Ss.png"],
      interval: null,
      swipeList: [{ name: "游戏说明" }, { name: "新人奖励" }, { name: "兑换奖品" }, { name: "在线客服" }, { name: "购买代币" }],
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
    async onLoad() {
      this.listQuery.page = this.listQuery.page + 1;
      await this.listQueryFn();
      this.loading = false;
      this.finished = this.list.length % 10;
    },
    hanlderChange(index) {
      this.$router.push({
        name: "ranking",
        query: { type: index }
      });
    },
    // 排队
    boxClick(item, row) {
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
    async listQueryFn() {
      let { data } = await this.$post(`goods/showProduct?page=${this.listQuery.page}&size=${this.listQuery.size}`, {}, true);
      this.list.push(...data.list);
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
  margin-top: 40px;
  &-box-swipe {
    margin: 5px 0 10px;
    border-radius: 4px;
    overflow: hidden;
    .swipe {
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
    background-color: $pro-box-color;
    padding: 10px 0;
    color: #efead6;
    font-size: 10px;
    font-weight: bold;
    border-radius: 4px;
    &-img {
      height: 50px;
      width: 50px;
    }
  }
  .toy {
    margin-top: 20px;
    margin-bottom: 40px;
    &-video {
      border-radius: 7px;
      overflow: hidden;
      height: 200px;
      position: relative;
      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: 0% 80%;
      }
      &::after {
        content: "推币机";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px 0;
        color: #fff;
        font-size: 12px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        text-align: center;
      }
    }

    &-col {
      &:last-child {
        .toy-video {
          &::after {
            content: "娃娃机";
          }
        }
        video {
          object-position: 0% 20%;
        }
      }
    }
  }
  .prize {
    &-show {
      font-size: 20px;
      color: #333333;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 40px;
      position: relative;
      height: 60px;
      &-img {
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &-text {
        color: #ccb37b;
        font-size: 22px;
        font-weight: 800;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
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
      width: 144px;
      font-size: 12px;
      color: #beba90;
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
