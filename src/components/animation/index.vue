<template>
  <div>
    <div class="num" v-show="type">
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valSetInterval: "",
      type: false
    };
  },
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  watch: {
    time: {
      handler(val) {
        if (val < 7) {
          clearInterval(this.valSetInterval);
          if (this.time <= 0) {
            this.type = false;
            return;
          }
          if (this.time <= 5) {
            this.type = true;
          }
          this.valSetInterval = setInterval(() => {
            if (this.time <= 5) {
              this.type = true;
            }
            if (this.time <= 0) {
              this.type = false;
              clearInterval(this.valSetInterval);
              return;
            }
            this.time = --this.time;
          }, 1000);
        } else {
          this.type = false;
        }
      },
      immediate: true
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.num {
  position: absolute;
  top: 30%;
  left: 50%;
  padding: 20px;
  background-image: linear-gradient(#f9fdff, #d9eaf8);
  box-shadow: 0px 0px 28px -8px #eaf7fb;
  color: #8da6b8;
  font-family: Arial;
  font-size: 60px;
  font-weight: 700;
  overflow: hidden;
  z-index: 3;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  -webkit-box-reflect: below 2px linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  animation: mymove 1s;
  animation-iteration-count: 5;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    height: 2px;
    background-color: #fff;
    z-index: 2;
    width: 50px;
    transform: translate(-50%, -50%);
    animation: test 1s;
    animation-iteration-count: 5;
  }
}
@keyframes mymove {
  from {
    transform: translate(-50%, -50%) scale(0.5, 0.5);
  }
  to {
    transform: translate(-50%, -50%) scale(1, 1);
  }
}
@keyframes test {
  from {
    width: 0;
  }
  to {
    width: 50px;
  }
}
</style>
