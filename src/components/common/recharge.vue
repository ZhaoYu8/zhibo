<template>
  <van-popup v-model="show" round @close="close" :closeable="true" :safe-area-inset-bottom="true" class="recharge">
    <div class="box">内容</div>
  </van-popup>
</template>
<script>
export default {
  naem: "recharge",
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    close() {
      this.$emit("input", this.show);
    }
  }
};
</script>
<style scoped lang="scss">
.recharge {
  width: 90%;
  height: 80%;
}
</style>
