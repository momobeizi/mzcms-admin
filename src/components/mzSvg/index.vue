<template>
  <svg class="mz-svg" aria-hidden="true">
    <use :xlink:href="'#' + iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'MzSvg',
  componentName: 'MzSvg',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return 'icon-'+this.name;
    }
  }
};
</script>
<style lang="scss" scoped>
  .mz-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
