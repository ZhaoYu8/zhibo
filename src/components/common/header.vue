<template>
  <header class="header" @click="hanlderDblclick">
    <div class="flex">
      <slot></slot>
    </div>
    <ul class="header-money">
      <li class="flex" @click="type = true">
        <img src="../../assets/icon/coin.png" alt="" srcset="" class="gem" />
        <span>{{ user.coin }}</span>
        <img src="../../assets/icon/add.png" alt="" srcset="" class="gem-add" />
      </li>
      <li class="flex">
        <img src="../../assets/icon/cardroll.png" alt="" srcset="" class="gem" />
        <span>{{ user.point }}</span>
      </li>
    </ul>
    <recharge v-model="type" :show="type" />
  </header>
</template>
<script>
import recharge from "./recharge";
let clicked = 1;
let clickedTime = {
  timeA: "",
  timeB: ""
};
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
  methods: {
    top() {
      let num = document.getElementsByClassName("hone-content")[0];
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
    hanlderDblclick() {
      if (clicked === 1) {
        clickedTime.timeA = new Date();
        clicked++;
        return;
      }
      clickedTime.timeB = new Date();
      // 大于300毫秒 表示不是双击事件 重新赋值
      if (Math.abs(clickedTime.timeA - clickedTime.timeB) > 300) {
        clickedTime.timeA = new Date();
        return;
      }
      this.$emit("dblclick");
      this.top();
      clicked = 1;
    }
  }
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
  height: 50px;
  padding: 0 10px 0 10px;
  width: 100%;
  top: 0;
  left: 0;
  @extend .flex;
  z-index: 20;
  background-color: $pro-color;
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
      background: linear-gradient(180deg, rgb(0, 172, 180, 0.23), rgb(0, 0, 0, 0.23));
      padding: 0 30px;
      border-radius: 20px;
      line-height: 22px;
      font-size: 14px;
      color: #11d5e4;
      position: relative;
      font-weight: bold;
      .gem {
        position: absolute;
        left: -10px;
        top: -9px;
      }
      .gem-add {
        @extend .flex;
        position: absolute;
        right: 0;
        width: 25px;
      }
    }
    li:first-child {
      margin-right: 20px;
    }
  }
}
</style>
