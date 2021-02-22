<template>
  <div class="home">
    <Header>
      <van-image round class="header-image" :src="userData.avatar" fit="cover" /> <span class="ml-10 f-b f-22">{{ userData.nickname }}</span></Header
    >
    <div class="box-swipe">
      <van-swipe class="swipe" :autoplay="8000" indicator-color="#FB605C">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image class="swipe-image" fit="cover" :src="image"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
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
    <van-tabs v-model="active" swipeable color="#fbe752">
      <van-tab :title="item.label" v-for="item in list" :key="item.coinType">
        <van-row class="machine" gutter="10">
          <van-col :span="12" v-for="row in item.arr" :key="row.id" @click="boxClick(item, row)">
            <div class="machine-box">
              <van-image class="machine-box-image" :src="require('../../assets/cat.jpeg')" fit="cover" />
              <div class="machine-box-money">
                <van-icon name="gold-coin" class="money" />
                <span>200</span>
              </div>
            </div>
            <div class="machine-bottom">
              <div class="machine-bottom-tab">{{ row.statusId ? "游戏中" : "空闲中" }}</div>
              <div>一只猫</div>
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
  components: {},
  data() {
    return {
      active: 0,
      userData: {},
      list: [
        {
          arr: [],
          label: "推推机",
          coinType: 1,
          url: "pushLevelDetail"
        },
        {
          arr: [],
          label: "娃娃机",
          coinType: 2,
          url: "doll"
        }
        // {
        //   arr: [],
        //   label: "欢乐球",
        //   coinType: 3,
        //   url: "doll"
        // }
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
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    async init() {
      // 查询用户信息
      let data = await this.$post("user/info", {}, true);
      this.userData = data.data;
      this.$store.dispatch("user/updateUser", this.userData);
      // 查询机器状态
      let res = await this.$get("coin/list");
      res = res.data.result;
      // isOnline 是否在线 coinType 0 1 2
      res.map((r, i) => {
        if (this.list[r.coinType]) this.list[r.coinType].arr.push(r);
      });

      // this.list.map((r, i) => {
      //   let o = res.data.result.filter((n) => n.coinId === r.coinId)[0];
      //   this.$set(this.list[i], "statusId", o.statusId);
      // });

      // 积分
      let point = await this.$get(`userPoint/info?userId=${this.user.userId}`, {}, true);
      this.$store.dispatch("user/updatePoint", point.data.point);
      // 游戏币
      let coin = await this.$get(`userCoin/info?userId=${this.user.userId}`, {}, true);
      this.$store.dispatch("user/updateCoit", coin.data.num);
    },
    boxClick(item, row) {
      clearInterval(this.interval);
      this.$router.push({
        path: item.url,
        query: { coinId: row.coinId, userId: parseInt(Math.random() * 1000000), webrtc: row.videoUrl }
      });
    }
  },
  mounted() {
    this.init();
    // this.interval = setInterval(() => {
    //   this.init();
    // }, 3000);
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
  height: 100%;
  padding: 10px;
  background-color: $pro-color;
  font-size: 12px;
  .box-swipe {
    padding: 10px 10px 20px;
    margin-bottom: 10px;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    .swipe {
      position: initial;
      font-size: 20px;
      height: 170px;
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
  .machine {
    background-color: #fff;
    @extend .flex;
    padding: 10px;
    flex-wrap: wrap;
    border-top: 2px solid $pro-color;
    &-box {
      border: 3px solid $pro-color;
      border-radius: 5px;
      padding: 10px 10px 0;
      position: relative;
      &-image {
        height: 100px;
      }
      &-money {
        margin-top: 10px;
        margin-bottom: 5px;
        font-size: 14px;
        @extend .flex;
        background-color: #fff8c5;
        color: #9d7024;
        border-radius: 20px;
        border: 1px solid #9d7024;
        padding: 2px 5px 2px 0;
        display: inline-flex;
        width: 50px;
        .money {
          @extend .gem;
          color: #ffb100;
          font-size: 14px;
          transform: scale(1.6);
        }
      }
    }
    &-bottom {
      display: flex;
      margin-top: 10px;
      align-items: center;
      &-tab {
        margin-right: 10px;
        color: #fff;
        background-color: #4bcb65;
        padding: 5px;
        border-radius: 20px;
      }
    }
  }
}
</style>
