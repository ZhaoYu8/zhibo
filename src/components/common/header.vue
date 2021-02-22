<template>
  <header class="header">
    <div class="flex">
      <slot></slot>
    </div>
    <ul class="header-money">
      <li class="flex" @click="type = true">
        <van-icon name="gem" class="gem" />
        <span>{{ $store.state.user.point }}</span>
        <div class="header-money-button">充值</div>
      </li>
      <li class="flex">
        <van-icon name="gold-coin" class="gold" />
        <span>{{ $store.state.user.coin }}</span>
      </li>
    </ul>
    <recharge v-model="type" :show="type" />
  </header>
</template>
<script>
import recharge from "./recharge";
export default {
  components: { recharge },
  naem: "header",
  data() {
    return {
      type: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  props: {},
  computed: {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header {
  position: relative;
  height: 40px;
  margin-bottom: 10px;
  @extend .flex;
  z-index: 20;
  &-image {
    width: 36px;
    height: 36px;
  }
  .gem {
    color: #d97599;
    font-size: 16px;
    margin-right: 5px;
  }
  .gold {
    @extend .gem;
    color: #fff377;
  }
  &-money {
    @extend .flex;
    li {
      background-color: rgba(0, 0, 0, 0.4);
      padding: 0 10px;
      margin-left: 10px;
      border-radius: 20px;
      overflow: hidden;
      height: 26px;
      font-size: 12px;
      padding-left: 10px;
      color: #fff;
    }
    &-button {
      font-size: 10px;
      background-color: #fb605c;
      border: 1px solid #e0493d;
      border-radius: 20px;
      padding: 5px 10px;
      white-space: nowrap;
      margin-left: 5px;
      margin-right: -10px;
    }
  }
}
</style>
