<template>
  <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    onLoad() {
      this.$emit('onLoad')
    }
  }
};
</script>
