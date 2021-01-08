<template>
  <div class="doll">
    <div class="doll-headed">
      <van-icon name="stop-circle-o" class="icon" @click="test"/>
      <van-icon name="chat-o" class="icon" />
    </div>
    <Video class="doll-video"></Video>
  </div>
</template>

<script>
import Video from "../../components/common/video";
import { MESSAGE_TYPE } from "vue-baberrage";
import { throttle } from "../../common/js/global";
export default {
  data() {
    return {
      status: {},
      userId: 0,
      getThrottle: throttle(() => {
        this.QueryPrize();
      }, 3000),
      pushCurrency: throttle(() => {
        this.push();
      }, 300)
    };
  },
  components: { Video },
  beforeDestroy() {
    clearInterval(this.interVal);
  },
  mounted() {
    this.userId = Number(this.$route.query.userId);
    this.queryStatus();
    this.interVal = setInterval(() => {
      this.queryStatus();
    }, 3000);
  },
  methods: {
    test() {
      alert(123)
    },
    // 查询当前机器状态
    async queryStatus() {
      let res = await this.$get("coin/queryStatus", {
        coinId: parseInt(this.$route.query.coinId)
      });
      this.status = res.data.result;
      this.status.pushUserId = Number(this.status.pushUserId);
    }
  }
};
</script>

<style lang="scss" scope>
.doll {
  position: relative;
  height: 100%;
  &-headed {
    z-index: 2;
    position: absolute;
    box-sizing: border-box;
    padding: 0 20px;
    top: 4%;
    width: 100%;
    display: flex;
    color: #fff;
    justify-content: space-between;
  }
  &-video {
    width: 100%;
    z-index: 1;
    background-color: #ccc;
  }
}
</style>
