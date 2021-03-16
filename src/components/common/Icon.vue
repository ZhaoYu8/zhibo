<template>
  <svg aria-hidden="true" class="icon" :style="{ fontSize: fontSize + 'px' }">
    <use :xlink:href="'#my-icon-' + icon" />
  </svg>
</template>
<script>
export default {
  naem: "icon",
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
      default: ""
    },
    fontSize: {
      type: String,
      default: "24"
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
