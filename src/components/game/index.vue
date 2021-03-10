<template>
  <div class="header">
    <div @click="goBack" class="dis-flex flex-y-center">
      <icon />
    </div>

    <transition name="el-fade-in-linear">
      <div class="header-current" v-if="list.current">
        <div class="header-current-text">已获得{{ list.current.points }}积分</div>
        <div class="header-current-box">
          <van-image class="header-current-box-image" :src="list.current.avatar" fit="cover" />
          <div class="tag">游戏中</div>
        </div>
      </div>
      <div class="header-type" v-else>
        <div class="header-type-tag">
          空闲中
        </div>
      </div>
    </transition>
    <div class="header-queue" v-if="list.queue && list.queue.length">
      <div class="header-queue-tag">{{ list.queue.length }}人排队中</div>
      <van-image :src="item.avatar" v-for="item in list.queue" fit="cover" class="img" :key="item.id"> </van-image>
    </div>
    <!-- <template v-if="list.queue && list.queue.length">
        <van-image :src="n.avatar" v-for="n in row.queue" :key="n.id" fit="cover" class="img"> </van-image>
      </template> -->
    <!-- <div class="header-queue-text">{{ row.queue && row.queue.length }}人排队中</div> -->
  </div>
</template>

<script>
export default {
  components: {
    icon: () => import("./components/icon")
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 2;
  position: absolute;
  height: 55px;
  line-height: 55px;
  top: 0;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  &-current {
    display: flex;
    color: #fff;
    align-items: center;
    &-text {
      line-height: initial;
      padding: 0 10px;
      background-color: #f7d402;
      border-radius: 10px;
      color: #491414;
      font-size: 14px;
      margin-right: -10px;
    }
    &-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-image {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #fff;
      }
      .tag {
        color: #491414;
        font-size: 7px;
        height: 13px;
        line-height: 13px;
        background-color: #f7d402;
        border-radius: 6px;
        line-height: initial;
        padding: 0 5px;
        margin-top: -5px;
        z-index: 2;
      }
    }
  }
  &-type {
    display: flex;
    align-items: center;
    &-tag {
      display: inline-block;
      background-color: #02f795;
      padding: 4px 6px;
      border-radius: 6px;
      color: #491414;
      font-size: 10px;
      line-height: initial;
    }
  }
  &-queue {
    position: absolute;
    right: 0;
    top: 60px;
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img {
      width: 36px;
      height: 36px;
      overflow: hidden;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    &-tag {
      display: inline-block;
      background-color: #02c5f7;
      padding: 5px;
      border-radius: 6px;
      color: #491414;
      font-size: 12px;
      line-height: initial;
      transform: scale(0.8, 0.8);
      white-space: nowrap;
    }
  }
}
</style>
