<template>
  <svg aria-hidden="true" class="icon">
    <use :xlink:href="icon" />
  </svg>
</template>
<script>
export default {
  naem: 'icon',
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style scoped lang="scss">
</style>
