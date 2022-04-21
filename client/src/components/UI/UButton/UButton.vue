<template>
  <button ref="btn" :class="{
    'ui-button--rounded': rounded,
    'ui-button--hover': hover,
    'ui-button--disabled': disabled,
  }" class="ui-button" @click="$emit('click', $event)">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'UButton',

  props: {
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    hover: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: [Number, String],
      required: false,
      default: '100%',
    },
    height: {
      type: [Number, String],
      required: false,
      default: '100%',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  mounted() {
    this.$refs.btn.style.setProperty('--width', typeof this.width === 'string' ? this.width : `${this.width}px`);
    this.$refs.btn.style.setProperty('--height', typeof this.height === 'string' ? this.height : `${this.height}px`);
  },
};
</script>

<style lang="scss" src="./style.scss">

</style>
