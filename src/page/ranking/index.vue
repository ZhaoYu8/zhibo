<template>
  <div class="ranking">
    <Header>
      <i class="my-icon my-icon-arrow-double-left"></i>
      <van-image round class="header-image" :src="user.avatar" fit="cover" /> <span class="header-name">{{ user.nickname }}</span>
    </Header>
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
</template>

<script>
export default {
  data() {
    return {
      interval: null,
      current: 1,
      list: [],
      machineList: []
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
    }
  },
  activated() {
    this.current = this.$route.query.type - 0 + 1;
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
.ranking {
  margin-top: 40px;
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
}
</style>
