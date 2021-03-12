<template>
  <div class="home">
    <Header>
      <van-image round class="header-image" :src="user.avatar" fit="cover" /> <span class="ml-10 f-b f-22">{{ user.nickname }}</span></Header
    >
    <div>
      <van-button type="primary" @click="add">测试加币</van-button>
    </div>
    <!-- <div class="box-swipe">
      <van-swipe class="swipe" :autoplay="8000" indicator-color="#FB605C">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image class="swipe-image" fit="cover" :src="image"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div> -->
    <!-- <van-grid :column-num="5" class="grid">
      <van-grid-item v-for="item in arr" :key="item.name" icon-prefix="my-icon" icon="gengduo" :text="item.name">
        <template #icon>
          <Icon :icon="`#${item.icon}`"></Icon>
        </template>
        <template #text>
          <div class="mt-10 f-b">{{ item.name }}</div>
        </template>
      </van-grid-item>
    </van-grid> -->
    <van-tabs v-model="active" swipeable color="#fbe752" class="box-tabs">
      <van-tab :title="item.label" v-for="item in list" :key="item.coinType">
        <van-row class="machine" gutter="10">
          <van-col :span="24" v-for="row in item.arr" :key="row.id">
            <div class="machine-box">
              <img class="machine-box-image" :src="require('../../assets/default.jpg')" @click="Play(item, row)" />
              <div class="machine-box-header">
                <div class="machine-box-header-type" v-if="row.pushUserId === '-1'">空闲中</div>
                <template v-else>
                  <div v-if="row.current" class="machine-box-header-current">
                    <van-image :src="row.current.avatar" fit="cover" class="big-img"> </van-image>
                    <div class="machine-box-header-current-text">游戏中</div>
                  </div>
                  <div v-if="row.queue && row.queue.length" class="machine-box-header-queue">
                    <van-image :src="n.avatar" v-for="n in row.queue" :key="n.id" fit="cover" class="img"> </van-image>
                    <div class="machine-box-header-queue-text">{{ row.queue && row.queue.length }}人排队中</div>
                  </div>
                </template>
              </div>
              <div class="machine-box-icon" @click="boxClick(item, row)">
                <icon :type="!row.current" />
              </div>
            </div>
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
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
      active: 0,
      list: [
        {
          arr: [],
          label: "推币机",
          coinType: 1,
          url: "pushLevelDetail"
        },
        {
          arr: [],
          label: "娃娃机",
          coinType: 2,
          url: "doll"
        },
        {
          arr: [],
          label: "欢乐球",
          coinType: 3,
          url: "doll"
        }
      ],
      images: ["https://s3.ax1x.com/2021/01/12/sGx2Ss.png", "https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg"],
      interval: null,
      arr: [
        { name: "每日任务", icon: "my-icon-wode1" },
        { name: "会员奖励", icon: "my-icon-gengduo" },
        { name: "在线客服", icon: "my-icon-gouwu" },
        { name: "游戏说明", icon: "my-icon-fenlei" },
        { name: "我的礼品", icon: "my-icon-shouye" }
      ]
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
    add() {
      this.$post(`userCoin/setVal?userId=${this.user.userId}&num=1000`, {}, true);
      this.$bus.$emit("globalInit");
    },
    async init() {
      // 查询机器状态
      let res = await this.$get("coin/list");
      let { data } = await this.$get("coin/AppointmentList");
      res = res.data.result;
      this.list.map((r) => {
        r.arr = [];
      });
      // isOnline 是否在线 coinType 0 1 2
      res.map((r, i) => {
        // if (!r.isOnline) return;
        if (this.list[r.coinType - 1]) {
          if (data.result[r.coinId]) {
            r = { ...r, ...data.result[r.coinId] };
          }
          this.list[r.coinType - 1].arr.push(r);
        }
      });

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
    Play(item, row) {
      clearInterval(this.interval);
      this.$router.push({
        path: item.url,
        query: { coinId: row.coinId, webrtc: row.videoUrl }
      });
    }
  },
  activated() {
    this.init();
    this.interval = setInterval(() => {
      this.init();
    }, 3000);
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.gem {
  color: #d97599;
  font-size: 16px;
  margin-right: 5px;
}
.home {
  height: calc(100% - 50px) !important;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: $pro-color;
  font-size: 12px;
  overflow-y: hidden;
  .box-swipe {
    padding: 10px 10px 20px;
    margin-bottom: 10px;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    .swipe {
      position: initial;
      font-size: 20px;
      height: 130px;
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
          background-color: #fbe752;
          opacity: 1;
        }
      }
    }
  }
  .grid {
    margin-bottom: 10px;
  }
  .box-tabs {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    ::v-deep .van-tabs__nav {
      padding-bottom: 12px;
    }
    ::v-deep .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }
  .machine {
    background-color: #fff;
    @extend .flex;
    flex-wrap: wrap;
    &-box {
      border-radius: 5px;
      margin: 10px 10px 0 10px;
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
        top: 0;
        padding: 10px 20px;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.5);
        z-index: 2;
        display: flex;
        align-items: center;
        &-type {
          background-color: #02f795;
          display: inline-block;
          padding: 3px 6px;
          border-radius: 6px;
          color: #491414;
          font-size: 10px;
        }
        .img {
          border-radius: 50%;
          height: 25px;
          width: 25px;
          overflow: hidden;
          margin-right: 10px;
          border: 2px solid #fff;
        }
        .big-img {
          @extend .img;
          height: 36px;
          width: 36px;
          margin-right: 0;
        }
        &-current {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          &-text {
            display: inline-block;
            padding: 2px 4px;
            background-color: #f7d402;
            border-radius: 6px;
            color: #491414;
            font-size: 8px;
            height: 12px;
            line-height: 12px;
            margin-top: -4px;
            z-index: 999;
          }
        }
        &-queue {
          flex: 1;
          margin-left: 15px;
          position: relative;
          &-text {
            position: absolute;
            bottom: -15px;
            left: 0;
            display: inline-block;
            padding: 2px 4px;
            background-color: #02c5f7;
            border-radius: 6px;
            color: #491414;
            font-size: 8px;
            height: 12px;
            line-height: 12px;
          }
        }
      }
      &-icon {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  }
}
</style>
