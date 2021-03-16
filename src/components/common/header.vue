<template>
  <header class="header">
    <div class="flex">
      <slot></slot>
    </div>
    <ul class="header-money">
      <li class="flex" @click="type = true">
        <Icon icon="zuanshi" class="gem" fontSize="26"></Icon>
        <span>{{ user.coin }}</span>
      </li>
      <li class="flex">
        <Icon icon="jinbi" class="gem" fontSize="26"></Icon>
        <span>{{ user.point }}</span>
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
      return this.$store.state.user || {};
    }
  },
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
  position: fixed;
  height: 40px;
  padding:0 10px 0 10px;
  width: 100%;
  top: 0;
  left: 0;
  @extend .flex;
  z-index: 20;
  background-color: #fff;
  &-image {
    width: 36px;
    height: 36px;
  }
  &-name {
    color: $pro-text-color;
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
  }
  &-money {
    @extend .flex;
    li {
      background-color: #eeeeee;
      padding: 0 30px;
      border-radius: 20px;
      line-height: 22px;
      font-size: 14px;
      color: #404040;
      position: relative;
      font-weight: bold;
      margin-right: 10px;
      .gem {
        position: absolute;
        left: -10px;
      }
    }
    li:first-child {
      margin-right: 20px;
      &::after {
        @extend .flex;
        justify-content: center;
        content: "+";
        background-color: #fb605c;
        border: 1px solid #e0493d;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        color: #fff;
        font-size: 24px;
        position: absolute;
        right: 0;
        font-weight: 100;
      }
    }
  }
}
</style>
