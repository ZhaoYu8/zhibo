<template>
  <div class="ranking">
    <Header>
      <van-image round class="header-image" :src="user.avatar" fit="cover" /> <span class="header-name">{{ user.nickname }}</span>
    </Header>
    <div class="hone-content">
      <van-tabs v-model="active" animated swipeable type="card" class="ranking-tabs" color="#F7F1E5" background="#434141" title-active-color="#D2CD9F">
        <van-tab v-for="index in 3" :title="arr[index - 1]" :key="index">
          <div>
            <canvas id="san"></canvas>
          </div>
        </van-tab>
      </van-tabs>
      <div class="machine">
        <div v-for="(row, index) in machineList" :key="row.id" class="machine-box" @click="play(row)">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      interval: null,
      current: 1,
      list: [],
      machineList: [],
      arr: ["日积分", "周积分", "月积分"]
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user || {};
    }
  },
  methods: {
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
    },
    play(row) {
      clearInterval(this.interval);
      let arr = ["pushLevelDetail", "doll"];
      this.$router.push({
        path: arr[this.current - 1],
        query: { coinId: row.coinId, webrtc: row.videoUrl }
      });
    },
    canvasInit() {
      var bg = document.getElementById("san");
      var ctx = bg.getContext("2d");
      //填充三角形（等边）
      ctx.beginPath();
      var height = 200 * Math.sin(Math.PI / 3); //计算等边三角形的高
      ctx.moveTo(100, 0); //从A（100,0）开始
      ctx.lineTo(0, height); //从A(100,0)开始，画到B (0,173)结束
      ctx.lineTo(200, height); //B(0,173)-C(200,173)
      ctx.closePath(); //闭合路径
      ctx.lineWidth = 2; //线的边框为10像素
      ctx.strokeStyle = "#fff";
      ctx.fill(); //闭合形状并且以填充方式绘制出来
    }
  },
  activated() {
    this.current = this.$route.query.type - 0 + 1;
    this.init();
    this.interval = setInterval(() => {
      this.init();
    }, 3000);
  },
  mounted() {
    this.$nextTick(() => {
      this.canvasInit();
    });
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ranking {
  margin-top: 50px;
  .machine {
    display: flex;
    flex-wrap: wrap;
    &-box {
      padding: 10px;
      width: 50%;
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
    &-box:nth-of-type(odd) {
      padding-right: 5px;
    }
    &-box:nth-of-type(even) {
      padding-left: 5px;
    }
    ::v-deep .van-grid-item__content {
      padding-bottom: 0px;
    }
  }
  &-tabs {
    .san {
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      height: 130px;
      width: 130px;
      margin: 0 auto;
      transform: rotate(45deg);
      margin-top: 50px;
    }
    ::v-deep .van-tabs__wrap {
      height: 40px;
      margin-top: 10px;
      background-color: #434141;
      .van-tabs__nav {
        margin: 0;
        border: 0;
        height: 100%;
        .van-tab {
          font-size: 16px;
          color: #f7f1e5;
          border: 0;
          transition: background 0.3s;
        }
        .van-tab--active {
          background: linear-gradient(0deg, #d2cd9f, #484438);
        }
      }
    }
  }
}
</style>
